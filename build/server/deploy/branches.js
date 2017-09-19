module.exports = {
  getRemoteBranchesForDeployment: function (nrc, socket, pathToProg){
    let outputRemoteData = "";
   nrc.commands = [
     'git branch -r',
   ];
   nrc.options = {
     cwd: pathToProg,
     onData: function(data){
              outputRemoteData += data;
             },
             onError: function(err){
               console.log(err);
             }
   }
   nrc.run(nrc.commands, nrc.options).then(e=>{
     let arrOfRemoteBranches = [];
     outputRemoteData = outputRemoteData.split("\n").splice(1);
     outputRemoteData.pop();
     outputRemoteData.forEach(function(el){
       arrOfRemoteBranches.push({name:el.split("/")[1]});
     })
      socket.emit("deploymentBranches", arrOfRemoteBranches);
   })
 }


}





  // this.commands = [
  //   'git reset --hard',
  //   'git clean -f -d',
  //   'git checkout ' + this.branch,
  //   'git branch -D deploy',
  //   'git pull origin ' + this.branch,
  //   'git checkout -b deploy',
  //   {command: 'node_modules/.bin/gulp deploy',cwd:"/var/www/billing-system/app-advanced"},
  //   {command: 'node_modules/.bin/gulp clean-deploy',cwd:"/var/www/billing-system/app-advanced"},
  //   'git add --all',
  //   'git commit -m "Updaiting test '+new Date()+'"',
  //   'git push --force origin deploy'
  // ];
  // this.options = { cwd: this.pathToProg,
  //             onData: function(data){
  //               // console.log(config.pathToProg);
  //               socket.emit("prepareDeployConsole", data);
  //               console.log(data);
  //             },
  //             onError: function(err){
  //               socket.emit("prepareDeployConsole", err);
  //               console.log(err);
  //             },
  //             // onDone: function(data){
  //             //   socket.emit("prepareDeployConsole", data);
  //             // },
  //
  //           };


//
//
//
//
//     nrc.run(commands, options).then(e=>socket.emit("prepareDeploySuccess"));
//
//     }
// }

// module.exports.prepareDeploy = run;
