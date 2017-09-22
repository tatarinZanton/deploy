module.exports = function (socket, db, async,  socketsTls){
    const connection = require('../connection/testing.js');
    const testingContainer = require('./testingContainer');
    const upload = require('./upload');

    socket.on("getTestingContainerForDeploy",function(){
        testingContainer.getTestingContainerForDeploy(socket, db, async,  socketsTls, connection);
    });
    socket.on("uploadToTesting",function(deploy, container){
        console.log(deploy, container);
        upload(deploy, socketsTls.testingCon[container]);
    });

}
