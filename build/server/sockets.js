function run(db, async, socket){

  var connection = require('./connection');

  socket.on("getCompanies", function(){
    async.series([
      function(callback) {
        db.getCompanies(callback);
    }],
    // optional callback
    function(err, results) {
        socket.emit("resiveCompanies",results[0]);
    });
  })

  var socketsTls = {};

  socket.on("initConnection", function(companies) {
    for (var i = 0; i < companies.length; i++) {
       connection(companies[i], socket, i, socketsTls );
    }
  })

  socket.on('addCompany', function (data) {
    async.series([
     function(callback) {
        db.addCompany(callback, data);
    }],
    // optional callback
    function(err, results) {
       if(err){
         socket.emit("error", err);
         throw err;
     };
       socket.emit("success", "companyAdd");
    });
  });

  socket.on('deleteCompany', function(data){
    async.series([
      function(callback) {
        db.deleteCompany(callback, data);
    }],
    // optional callback
    function(err, results) {
       if(err){
         socket.emit("error", err);
         throw err;
     };
       socket.emit("success", "companyDel");
    });
  })

  socket.on('editCompany', function(data){
    async.series([
      function(callback) {
        db.editCompany(callback, data);
    }],
    // optional callback
    function(err, results) {
       if(err){
         socket.emit("error", err);
         throw err;
     };
       socket.emit("success", "companyEdit");
    });
  })

  socket.on("prepareDeploy",function(){
     var util = require('util'),
     exec = require('child_process').exec,
     child;
     child = exec('cd /var/www/billing-system && git add --all && git checkout deploy',
       {maxBuffer: 1024 * 500},
       function (error, stdout, stderr) {
         if (error !== null) {
           socket.emit("prepareDeployErr", stderr, error);
           return;
         }
        socket.emit("deployConsole", stdout);

       child = exec('cd /var/www/billing-system/app-advanced && node_modules/.bin/gulp deploy',
         {maxBuffer: 1024 * 500},
         function (error, stdout, stderr) {
           console.log("start deploy");
           if (error !== null) {
             socket.emit("prepareDeployErr", stderr, error);
             return;
           }
            socket.emit("deployConsole", stdout);
           child = exec('cd /var/www/billing-system/app-advanced && node_modules/.bin/gulp clean-deploy',
             {maxBuffer: 1024 * 500},
             function (error, stdout, stderr) {

               if (error !== null) {
                 socket.emit("prepareDeployErr", stderr, error);
                 return;
               }
               socket.emit("deployConsole", stdout);
               child = exec('cd /var/www/billing-system && git add --all && git commit -m "Updaiting test '+new Date()+'" && git push origin deploy',
                 {maxBuffer: 1024 * 500},
                 function (error, stdout, stderr) {
                   if (error !== null) {
                     socket.emit("prepareDeployErr", stderr, error);
                     return;
                   }
                  socket.emit("deployConsole", stdout);
                  socket.emit("success", "prepareDeploy");
               });
           });

       });
     });
  });



  socket.on("updateClient", function(company, index){
     socketsTls[company.id].write("update");
    // update(company, socket, index);
  });



  socket.on("updateTesting", function(){
      var client = new net.Socket();
      client.connect(5555, '178.20.154.244', function() {
      	client.write('getkey');
      });

      // client.on('data', function(data) {
      // 	console.log('Received: ' + data);
      // 	client.destroy(); // kill client after server's response
      // });
      //
      // client.on('close', function() {
      // 	console.log('Connection closed');
      // });
 })
}
module.exports = run;
