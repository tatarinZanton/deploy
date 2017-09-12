function run(socket){
var config = process.env.NODE_ENV === 'production' ? require('../../config').build.env : require('../../config').dev.env;
var nrc = require('node-run-cmd'),
commands = [
  'git reset --hard',
  'git clean -f -d',
  'git checkout nav_development',
  'git branch -D deploy',
  'git pull origin nav_development',
  'git checkout -b deploy',
  {command: 'node_modules/.bin/gulp deploy',cwd:"/var/www/billing-system/app-advanced"},
  {command: 'node_modules/.bin/gulp clean-deploy',cwd:"/var/www/billing-system/app-advanced"},
  'git add --all',
  'git commit -m "Updaiting test '+new Date()+'"',
  'git push --force origin deploy'
],
options = { cwd: config.pathToProg,
            onData: function(data){
              socket.emit("prepareDeployConsole", data);

            },
            onError: function(err){
              socket.emit("prepareDeployConsole", err);
            },
            // onDone: function(data){
            //   socket.emit("prepareDeployConsole", data);
            // },

          };

nrc.run(commands, options).then(e=>socket.emit("prepareDeploySuccess"));

}
module.exports = run;
