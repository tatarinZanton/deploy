function run(db, async, socket){

var connection = require('./connection'),
    deploy = require("./deploy"),
    socketsTls = {},
    versionsList = require("./versionsList");
// Получаем список компаний и устанавливаем соединение с клиентами
socket.on("getCompanies", function(){
  async.series([
    function(callback) {
      db.getCompanies(callback);
  }],
  function(err, results) {
      socket.emit("resiveCompanies",results[0]);
      for (var i = 0; i < results[0].length; i++) {
         connection(results[0][i], socket, i, socketsTls );
      }
  });
})

// добавление компании
socket.on('addCompany', function (data) {
  async.series([
   function(callback) {
      db.addCompany(callback, data);
  }],
  function(err, results) {
     if(err){
       socket.emit("error", err);
       throw err;
   };
     socket.emit("success", "companyAdd");
  });
});

// Удаление компании
socket.on('deleteCompany', function(data){
  async.series([
    function(callback) {
      db.deleteCompany(callback, data);
  }],
  function(err, results) {
     if(err){
       socket.emit("error", err);
       throw err;
   };
     socket.emit("success", "companyDel");
  });
})

// Редактирование компании
socket.on('editCompany', function(data){
  async.series([
    function(callback) {
      db.editCompany(callback, data);
  }],
  function(err, results) {
     if(err){
       socket.emit("error", err);
       throw err;
   };
     socket.emit("success", "companyEdit");
  });
})

// Подготовка к обновлению
socket.on("prepareDeploy",function(){
  deploy(socket);
});


// Обновление компании по индексу
socket.on("updateClient", function(company, index){
   socketsTls[company.id].write("update");
});

// Получаем 5 последних комитов компании по ее индексу
socket.on("getCommits", function(company, index){
   socketsTls[company.id].write("getCommits");
});

socket.on("getVersionsList",function(){
  versionsList(socket);

});

// socket.on("getVersionsDb",function(){
  async.series([
    function(callback) {
      db.getVersions(callback);
  }],
  function(err, results) {
      console.log(results[0]);
      // socket.emit("versionsDb",results[0]);
  });
// });


}
module.exports = run;
