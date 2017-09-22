module.exports = {
  prepareDeploy: function (nrc, socket, pathToProg, db, async, deployBranch, referenceBranch){
    console.log(deployBranch, referenceBranch);
    let creationTime = new Date(),
    commands = [
      'git reset --hard',
      'git clean -f -d',
      `git checkout ${referenceBranch}`,
      `git branch -D ${deployBranch}`,
      `git pull origin ${referenceBranch}`,
      `git checkout -b ${deployBranch}`,
      {command: 'node_modules/.bin/gulp deploy',cwd:`${pathToProg}/app-advanced`},
      {command: 'node_modules/.bin/gulp clean-deploy',cwd:`${pathToProg}/app-advanced`},
      'git add --all',
      `git commit -m "Updaiting ${creationTime}"`,
      `git push --force origin ${deployBranch}`
    ],
    options = { cwd: pathToProg,
                onData: function(data){
                  // console.log(config.pathToProg);
                  socket.emit("prepareDeployConsole", data);
                  console.log(data);
                },
                onError: function(err){
                  socket.emit("prepareDeployConsole", err);
                  console.log(err);
                },
                // onDone: function(data){
                //   socket.emit("prepareDeployConsole", data);
                // },

              };

    nrc.run(commands, options).then(e=>{
      async.series([
       function(callback) {

            db.createDeploy(callback, deployBranch, referenceBranch, creationTime);
      }],
      function(err, results) {
         if(err){
           socket.emit("error", err);
           throw err;
       };
        socket.emit("prepareDeploySuccess");
      });

    });
  },


  getDeploymentList: function(nrc, socket, pathToProg, db, async){

    async.series([
     function(callback) {
          db.getDeployList(callback);
    }],
    function(err, results) {
       if(err){
         socket.emit("error", err);
         throw err;
     };
      socket.emit("deploymentList", results[0]);
    });
  },

  delDeploymentList: function(socket, db, async, id){
    async.series([
     function(callback) {
          db.delDeployList(callback, id);
    }],
    function(err, results) {
       if(err){
         socket.emit("error", err);
         throw err;
     };
      socket.emit("delDeploymentList");
    });
  }

}
