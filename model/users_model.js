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
					driver.query("call authStudent('"+user+"','"+pass+"')",function(err, rows, fields) {
				  			rows.login = false;
				  			if (err) throw err;
				  			for(i=0;i<rows[0].length;i++)
				  			{
				  				if(rows[0][i].nrp==user)rows.login = true;
				  			}

				  			fn(rows)
						}
					);
				}
module.exports.getCourseList = function(userId,fn) {
					driver.query("CALL findUserInCourse('"+userId+"')",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.getUser = function(userId,fn) {
					driver.query("select nrp,name from student where nrp ='"+userId+"'",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.getEventUser = function(idCourse,nrp,fn) {
					driver.query("CALL getEventUser('"+idCourse+"','"+nrp+"')",function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
module.exports.savePresence = function(nrp,idCourse,idevent,responsedata,additionaldata,fn) {
					var query ="CALL savePresence('"+nrp+"','"+idCourse+"','"+idevent+"','"+responsedata+"','"+additionaldata+"')";
					driver.query(query,function(err, rows, fields) {
				  			if (err) throw err;
				  			fn(rows)
						}
					);
				}
