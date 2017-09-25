function run(socket, db, async){
  const config = process.env.NODE_ENV === 'production' ? require('../../../config').build.env : require('../../../config').dev.env;
  config.pathToProg = config.pathToProg.replace (/"/g, "");
  const branches = require('./branches');
  const deployment = require('./deployment');
  const nrc = require('node-run-cmd');

  socket.on("getDeploymentBranches",function(){
    branches.getRemoteBranchesForDeployment(nrc, socket, config.pathToProg, function(foo, arrOfRemoteBranches){
      socket.emit("deploymentBranches", arrOfRemoteBranches);
    });
  });

  socket.on("makeDeployment", function(deployBranch, referenceBranch){
    deployment.prepareDeploy(nrc, socket, config.pathToProg, db, async, deployBranch, referenceBranch);
  });

  socket.on("getDeploymentList",function(){

    deployment.getDeploymentList(nrc, socket, db, config.pathToProg, async, branches);
  });

  socket.on("delDeploymentList",function(id){
    deployment.delDeploymentList(socket, db, async, id);
  });


}
module.exports = run;
