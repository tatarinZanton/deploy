function run(db, async, socket){

const deploy = require("./deploy"), // подключаем модуль deploy
    companies = require("./companies"),
    socketsTls = {},
    versionsList = require("./versionsList"),
    testingContainers = require("./testingContainers");
    socketsTls.testingCon = [];

    deploy(socket, db, async);
    companies(socket, db, async, socketsTls);
    testingContainers(socket, db, async, socketsTls);

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

socket.on("getVersionsDb",function(){
  async.series([
    function(callback) {
      db.getVersions(callback);
  }],
  function(err, results) {
      socket.emit("versionsDb",results[0]);
  });
});


}
module.exports = run;
