var express = require('express');
var router = express.Router();
var http= require('http');
var io = require('../socket/socket.js')

var admin_model = require('../model/admin_model');
router.get('/', function(req, res, next) {
  if(req.session.login)
  {
  	res.redirect('/admin/dashboard');
  }
  else
  {
  	res.redirect('/admin/login');
  }

});
router.get('/dashboard', function(req, res, next) {
  if(req.session.login)
  {
    var pageVar ={
      title: 'dashboard',
      isDashboard:true,
      reqFirst:true,
      login:true,
      activeUser:req.session.user 
    }
  	res.render('admin/dashboard',pageVar);
  	io.sendEvent('newLogin',{user:req.session.user},globalIO)
  }
  else
  {
  	res.redirect('/admin/login');
  }

});
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    // cannot access session here
  })
  res.render('admin/login');  
});
router.get('/login', function(req, res, next) {
  if(req.session.login)
  {
  	res.redirect('/admin/dashboard');
  }
  else
  {
  	res.render('admin/login', { title: 'Login' });
  }
  
});
router.post('/login', function(req, res, next) {
  var user =  req.body.username;
  var pass = req.body.pass;
  admin_model.auth(user,pass,function(rows){
  	if(rows.login)
  	{
  		var sess = req.session;
  		sess.login = true;
  		sess.user = rows[0][0].name
  		sess.userId = user
  		sess.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  		res.redirect('/admin/');


  	}
  	else
  	{
  		res.redirect('/admin/login?login=false');
  	}
  })
  
});
router.get('/timeline', function(req, res, next) {
  if(req.session.login)
  {
    var pageVar = { 
      title: 'Timeline Course',
      login:true,
      isTimeline:true,
      reqFirst:true,
      reqSecond:true,
      isSecond:true,
      activeUser:req.session.user,
      label:req.session.activeAlias 
    }
  	res.render('admin/timeline',pageVar );
  }
  else
  {
  	res.redirect('/admin/login');
  }
  

});

router.post('/addCourse', function(req, res, next) {
  if(req.session.login)
  {
  	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ error: '404 authentication required' }));
  }
  else
  {
  	var user = req.session.user;
  	var name = req.body.name;
  	var description = req.body.description;
  	var alias = req.body.alias;
  	var start = moment().format("YYYY-MM-DD HH:mm:ss");
  	var end = req.body.end;
  	var color = req.body.color
  	admin_model.addCourse(name,description,alias,start,end,color,user,function(rows){
  		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify({ success: "200" }));	
  	})
  	
  }
  
});
module.exports = router;
