var driver = require('../config/database/driver/mysql/mysqldriver.js');

/*always give fn parameter to return your data*/
module.exports.selectDB = function(fn) {
					driver.query("select * from db",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}

module.exports.showUser = function(fn) {
					driver.query("select * from user",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}

module.exports.auth = function(user,pass,fn) {
					driver.query("call auth('"+user+"','"+pass+"')",function(err, rows, fields) {
				  			rows.login = false;
				  			if (err) throw err;
				  			for(i=0;i<rows.length-1;i++)
				  			{
				  				if(rows[i][0].idteacher==user)rows.login = true;
				  				console.log(rows[i][0])
				  			}

				  			fn(rows)
						}
					);
				}

module.exports.addCourse = function(name,description,alias,start,end,color,user,fn) {
					driver.query("call addCourse('"+name+"','"+description+"','"+alias+"','"+start+"','"+end+"','"+color+"','"+user+"');",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.getCourseList = function(userId,fn) {
					driver.query("CALL findTeacherCourse('"+userId+"')",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.getActiveCourse = function(idCourse,fn) {
					driver.query("CALL getActiveCourse('"+idCourse+"')",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.getEvent = function(idCourse,fn) {
					driver.query("CALL getEvent('"+idCourse+"')",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.addEvent = function(idCOurse,name,description,type,time,config,fn) {
					driver.query("CALL addEvent('"+idCOurse+"','"+name+"','"+description+"','"+type+"','"+time+"','"+config+"')",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.updateEventConfig = function(name,description,config,datetime,idEvent,fn) {
					driver.query("call updateEvent('"+name+"','"+description+"','"+config+"','"+datetime+"','"+idEvent+"')",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}