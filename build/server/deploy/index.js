function run(socket, db, async){
  const config = process.env.NODE_ENV === 'production' ? require('../../../config').build.env : require('../../../config').dev.env;
  config.pathToProg = config.pathToProg.replace (/"/g, "");
  const branches = require('./branches');
  const deployment = require('./deployment');
  const nrc = require('node-run-cmd');

  socket.on("getDeploymentBranches",function(){
    branches.getRemoteBranchesForDeployment(nrc, socket, config.pathToProg);
  });

  socket.on("makeDeployement", function(deployBranch, referenceBranch){
    deployment.prepareDeploy(nrc, socket, config.pathToProg, db, async, deployBranch, referenceBranch);
  });
}
module.exports = run;
