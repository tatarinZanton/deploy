function run(socket){

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
options = { cwd: '/var/www/billing-system',
            onData: function(data){
              console.log(data);
            },
            onError: function(err){
              console.log(err);
            },
            onDone: function(data){
              console.log(data);
              // socket.emit("success", "prepareDeploy");
            },

          };

nrc.run(commands, options);

}
module.exports = run;
