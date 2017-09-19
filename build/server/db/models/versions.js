module.exports = function(Db){
Db.prototype.getVersions = function(callback){

  var sql = "SELECT * FROM versions;";

  this.connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(null, result);
  });
}
}
