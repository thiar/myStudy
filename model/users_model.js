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
				  				console.log(rows[0][i].nrp+" "+user)
				  			}

				  			fn(rows)
						}
					);
				}