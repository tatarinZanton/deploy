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
}
