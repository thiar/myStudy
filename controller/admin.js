var express = require('express');
var router = express.Router();
var http= require('http');
var io = require('socket.io')(http);

var admin_model = require('../model/admin_model');
router.get('/', function(req, res, next) {
  admin_model.showUser(function(result){
  	res.send(result)
})	

});
router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Express' });
});
router.get('/timeline', function(req, res, next) {
  res.render('admin/timeline', { title: 'Timeline Course',isTimeline:true,activeCourse:"12" });
});

module.exports = router;
