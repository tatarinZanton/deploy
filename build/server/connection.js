function run (company, socket, index, socketsTls){

  // console.log(company);
const port = company.port;
const hostname = company.hostname;

const tls = require('tls');
var fs = require('fs');
var keyFileStr = __dirname+'/certs/'+company.tls_key+'/client.key',
    crtFileStr = __dirname+'/certs/'+company.tls_key+'/client.crt',
    caFileStr  = __dirname+'/certs/'+company.tls_key+'/ca.crt';
console.log();
// Проверка существования сертификатов
if (!fs.existsSync(keyFileStr) || !fs.existsSync(crtFileStr) || !fs.existsSync(caFileStr)) {
  socket.emit("certNotFound", index);
  return;
}

const options = {
  host: hostname,
  port: port,

  // Necessary only if using the client certificate authentication
  key: fs.readFileSync(keyFileStr),
  cert: fs.readFileSync(crtFileStr),

  // Necessary only if the server uses the self-signed certificate
  ca: fs.readFileSync(caFileStr)
};

var socketTls = tls.connect(options, () => {
  console.log('client connected',
              socketTls.authorized ? 'authorized' : 'unauthorized');
  // process.stdin.pipe(socketTls);
  // process.stdin.resume();
  // socketTls.write("update");
  socketsTls[company.id] = socketTls;
  socket.emit("clientConnected", index);

})

.setEncoding('utf8')

.on('data', (data) => {

  switch (data) {
    case 'doneUpdate':
      console.log(data);
      socket.emit("success", "updateClient", index);
      // socketTls.end();
      break;

    default:
    socket.emit("consoleOut", {data, index});
    break;
  }

})
.on("error", function(err) {
  // socket.emit("error", err);
  // console.log(index);
  // console.log(err);
  socket.emit("connectionErr", { index,err } );
  socket.emit("blockActions", index);
})
.on('end', () => {
  console.log("End connection");
});

}
module.exports = run;
