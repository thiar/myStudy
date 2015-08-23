var socketio = require('socket.io')
var admin_model = require('../model/admin_model');
var moment = require('moment');
module.exports.listen = function(server,app){
    io = socketio.listen(server)
    io.use(require("express-socket.io-session")(app.settings.session,{autoSave:true}));
    console.log(app.settings.session)
    io.on('connection',function(socket) {
    	console.log('new connection')
    	
    	socket.emit('news',{status:'connection'})
    	socket.emit('newLogin',{status:'connection'})
    	socket.on('sendEvent',function(data){
    		console.log(socket.handshake.session.user)
    	})
    	socket.on('getCourseList',function(data){
    		admin_model.getCourseList(socket.handshake.session.userId,function(rows){
    			socket.emit('getCourseListResponse',rows[0])
    		})
    	})
    	socket.on('addNewCourse',function(data){
    		var start = moment().format("YYYY-MM-DD HH:mm:ss");
    		var end = moment(data.END,"DD/MM/YYYY")
    		admin_model.addCourse(data.NAME,data.DESCRIPTION,data.ALIAS,start,end.format("YYYY-MM-DD HH:mm:ss"),data.COLOR,socket.handshake.session.userId,function(rows){
    			
    		})
    	})
    	socket.on('changeCourse',function(data){
    		socket.handshake.session.activeCourse = data.id;
    		console.log(socket.handshake.session)
    		socket.emit('changeCourseResponse')
    	})
    	socket.on('getTimeline',function(data){
    		console.log(socket.handshake.session)
    		admin_model.getActiveCourse(socket.handshake.session.activeCourse,function(rows){
    			console.log(rows)
    			socket.emit('getTimelineResponse',rows[0][0])
    		})
    	})
    	socket.on('getEvent',function(data){
    		admin_model.getEvent(socket.handshake.session.activeCourse,function(rows){
    			socket.emit('getEventResponse',rows[0])
    		})
    	})
    	socket.on('addEvent',function(data){
    		var date = moment(data.datetime,"DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss");
    		admin_model.addEvent(socket.handshake.session.activeCourse,data.name,data.description,data.type,date,"",function(data){
    			socket.emit('addEventResponse')
    		})
    	})
    	socket.on('updateEvent',function(data){
    		admin_model.updateEventConfig(data.name,data.description,data.config,data.idevent,function(rows){
    			socket.emit('updateEventResponse')
    		})
    	})
    })
    return io
}
/* use io parameter with globalIo*/
module.exports.sendEvent = function(eventName,data,io){
	io.emit(eventName,data);

}