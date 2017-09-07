var mysql = require('mysql');
var config = process.env.NODE_ENV === 'production' ? require('../../../config').build.env : require('../../../config').dev.env;
var db = require('./class');

var connection =  mysql.createConnection({
  host      : config.dbUrl.replace (/"/g, ""),
  user      : config.dbUser.replace (/"/g, ""),
  password  : config.dbPasswd.replace (/"/g, ""),
  database  : config.dbName.replace (/"/g, ""),
  multipleStatements: true
});;

function run(){
  return new Promise(function(resolve, reject) {
    connection.connect(function(err) {
      if (err) throw err;
      resolve(new db(connection)) ;
    })

  });
}
module.exports = run;
