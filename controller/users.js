var express = require('express');
var router = express.Router();
var users_model = require('../model/users_model');
/* GET users listing. */
router.get('/home', function(req, res, next) {
  if(req.session.userlogin)
  {
  	var pageVar ={
      title: 'dashboard',
      isHome:true,
      reqFirst:true,
      userlogin:true,
      activeUser:req.session.user,
      isDashboard:true 
    }
  	res.render('users/home',pageVar);
  }
  else
  {
  	res.redirect('/users/login');
  }

});
router.get('/course/timeline', function(req, res, next) {
  if(req.session.userlogin)
  {
    var pageVar = { 
      title: 'Timeline Course',
      userlogin:true,
      isTimeline:true,
      reqFirst:true,
      reqSecond:true,
      isSecond:true,
      activeUser:req.session.user,
      label:req.session.activeAlias 
    }
    res.render('users/timeline',pageVar );
  }
  else
  {
    res.redirect('/users/login');
  }
  

});
router.get('/dashboard', function(req, res, next) {
  if(req.session.userlogin)
  {
    var pageVar ={
      title: 'dashboard',
      isHome:true,
      reqFirst:true,
      userlogin:true,
      activeUser:req.session.user,
      isDashboard:true 
    }
    res.render('users/dashboard',pageVar);
  }
  else
  {
    res.redirect('/users/login');
  }

});
router.get('/', function(req, res, next) {
  if(req.session.userlogin)
  {
  	res.redirect('/users/home');
  }
  else
  {
  	res.redirect('/users/login');
  }
});
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    // cannot access session here
  })
  res.render('users/login');  
});
router.get('/login', function(req, res, next) {
  if(req.session.userlogin)
  {
  	res.redirect('/users/dashboard');
  }
  else
  {
	res.render('users/login',{title:'login page'});
  }
  
});
router.post('/login', function(req, res, next) {
  var user =  req.body.user;
  var pass = req.body.password;
  users_model.auth(user,pass,function(rows){
  	
  	if(rows.login)
  	{
  		console.log('login')
  		var sess = req.session;
  		sess.userlogin = true;
  		sess.user = rows[0][0].name
  		sess.userId = user
  		sess.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  		res.redirect('/users/');
  	}
  	else
  	{
  		res.render('users/login', { title: 'Login',loginfailed: true });
  	}
  });
});


module.exports = router;
