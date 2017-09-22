module.exports = function(socket, db, async, socketsTls){
  const connection = require('../connection/companies.js');
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

}
