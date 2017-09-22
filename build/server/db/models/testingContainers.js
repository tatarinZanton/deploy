module.exports = function(Db){

  Db.prototype.getTestingContainerForDeploy = function(callback){
    var sql = `SELECT * FROM testing_containers WHERE active=1;`;

    this.connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(null, result);
    });
  }

}
