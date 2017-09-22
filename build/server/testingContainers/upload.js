module.exports = function (deploy, socketCon){
      let data = {
        action:"update",
        branch: deploy.name
      };
      socketCon.write(JSON.stringify(data));
}
