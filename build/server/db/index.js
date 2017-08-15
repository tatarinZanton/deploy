var mysql = require('mysql');
var config = process.env.NODE_ENV === 'production' ? require('../../../config').build.env : require('../../../config').dev.env;
var db = require('./class');

var connection =  mysql.createConnection({
  host      : config.dbUrl,
  user      : config.dbUser,
  password  : config.dbPasswd,
  database  : config.dbName,
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
