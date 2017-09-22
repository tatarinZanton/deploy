module.exports = function(Db){
  Db.prototype.createDeploy = function(callback, deployBranch, referenceBranch, creationTime){
    creationTime = (creationTime*1/1000).toFixed();
    var sql = `INSERT INTO deploy (name, referenceBranch, creationTime)
              VALUES ('${deployBranch}', '${referenceBranch}', ${creationTime});`;

    this.connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(null, result);
    });
  }

  Db.prototype.getDeployList = function(callback){
    var sql = `SELECT * FROM deploy;`;

    this.connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(null, result);
    });
  }

  Db.prototype.delDeployList = function(callback, id){
    var sql = `DELETE FROM deploy WHERE id = ${id};`;

    this.connection.query(sql, function (err, result) {
      if (err) throw err;
      callback(null, result);
    });
  }

}
