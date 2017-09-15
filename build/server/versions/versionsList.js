function run(socket){
  var config = process.env.NODE_ENV === 'production' ? require('../../../config').build.env : require('../../../config').dev.env;
  var versionsData, result, error,
  nrc = require('node-run-cmd'),
  commands = [
    "git log --pretty=format:'%H|%D|%s' -5"
  ],
  options = { cwd: config.pathToProg.replace (/"/g, ""),
              onData: function(data){
               versionsData = data;
              },
              onError: function(err){
                error += err + "\n";
              },
              onDone: function(data){
                 result = data;
                // socket.emit("prepareDeployConsole", data);
              },

            };

  nrc.run(commands, options).then(e=>{
    if (result != 0) {
      socket.emit("errorVersionlist", error);
    }
      var versions=[], tmp;
      versionsData.split("\n").forEach(function(el){
        var tag;
        el = el.replace (/'/g, "");
        tag = el.split(/tag/);
        if (tag[1]) {
         tag = tag[1].split("|")[0].match(/\d{1,2}\.\d{1,2}\.\d{1,2}\.\d{1,3}/)[0];
        }

        tmp = el.split("|");

        // console.log(tmp);
        versions.push({
                        hash: tmp[0],
                        name: tmp[tmp.length - 1],
                        version : (typeof tag === "string") ? tag : ""
                      });
      });

      console.log(versions);
      // socket.emit("versionsList", versions);
  });

}
module.exports = run;
