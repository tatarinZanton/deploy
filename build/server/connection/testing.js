function run (container, socket, socketsTls){


const port = container.port;
const hostname = container.hostname;

const tls = require('tls');
var fs = require('fs');

var keyFileStr = __dirname + '/../certs/'+container.tls_key+'/client.key',
    crtFileStr = __dirname + '/../certs/'+container.tls_key+'/client.crt',
    caFileStr  = __dirname + '/../certs/'+container.tls_key+'/ca.crt';

// Проверка существования сертификатов
if (!fs.existsSync(keyFileStr) || !fs.existsSync(crtFileStr) || !fs.existsSync(caFileStr)) {
  console.log("err");
  socket.emit("connectionErrTestingContainer", container.id, "tls not found");
  return;
}


const options = {
  host: hostname,
  port: port,

  key: fs.readFileSync(keyFileStr),
  cert: fs.readFileSync(crtFileStr),
  ca: fs.readFileSync(caFileStr)
};

let socketTls = tls.connect(options, () => {
  socketsTls.testingCon[container.id] = socketTls;
  socket.emit("testingContainerConnected", container.id);
})

.setEncoding('utf8')

.on('data', (data) => {
  data = JSON.parse(data);
  console.log(data);
  switch (data.type) {
    case 'doneUpdate':

      // socket.emit("success", {type:"updateClient", index, status:data.status});
      // socketTls.end();
      break;
    case 'resiveCommits':
      // console.log(data);
      // socket.emit("resiveCommits", {data, index});
      // socketTls.end();
      break;
    case '':

      break;
    default:
    // socket.emit("consoleOut", {data, index});
    break;
  }

})
.on("error", function(err) {
  console.log(err);
  // socket.emit("error", err);
  socket.emit("connectionErrTestingContainer", container.id, err );
  // socket.emit("connectionErr", {err, index} );
  // socket.emit("blockActions", {index});
})
.on('end', () => {
  console.log("End connection", container.id);
});

}
module.exports = run;
