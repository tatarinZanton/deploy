module.exports = {
  getTestingContainerForDeploy:function(socket, db, async,  socketsTls, connection){
    async.series([
      function(callback) {
        db.getTestingContainerForDeploy(callback);
    }],
    function(err, results) {
        socket.emit("testingContainerToDeploy",results[0]);
        connection( JSON.parse(JSON.stringify(results[0]))[0], socket, socketsTls );
    });
  }
}
