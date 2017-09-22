module.exports = {
  updateTesting:function(socket, container, branch){
    const port = container.port;
    const hostname = container.hostname;

    const tls = require('tls');
    const fs = require('fs');

    const options = {
      host: hostname,
      port: port,

      // Necessary only if using the client certificate authentication
      key: fs.readFileSync('server/certs/'+company.tls_key+'/client.key'),
      cert: fs.readFileSync('server/certs/'+company.tls_key+'/client.crt'),

      // Necessary only if the server uses the self-signed certificate
      ca: fs.readFileSync('server/certs/'+company.tls_key+'/ca.crt')
    };

  }
}


function run(company, socket, index){
  // console.log(company);
const port = company.port;
const hostname = company.hostname;

const tls = require('tls');
var fs = require('fs');

const options = {
  host: hostname,
  port: port,

  // Necessary only if using the client certificate authentication
  key: fs.readFileSync('server/certs/'+company.tls_key+'/client.key'),
  cert: fs.readFileSync('server/certs/'+company.tls_key+'/client.crt'),

  // Necessary only if the server uses the self-signed certificate
  ca: fs.readFileSync('server/certs/'+company.tls_key+'/ca.crt')
};

var socketTls = tls.connect(options, () => {
  console.log('client connected',
              socketTls.authorized ? 'authorized' : 'unauthorized');
  // process.stdin.pipe(socketTls);
  // process.stdin.resume();
  socketTls.write("update");

})

.setEncoding('utf8')

.on('data', (data) => {

  switch (data) {
    case 'doneUpdate':
      console.log(data);
      socket.emit("success", "updateClient", index);
      socketTls.end();
      break;

    default:
    socket.emit("consoleOut", data, index);
    break;
  }

})
.on("error", function(err) {
  // socket.emit("error", err);
  console.log(err);
  socket.emit("servErr", err);
  socket.emit("unblock", index);
})
.on('end', () => {
  console.log("End connection");
});

}

module.exports = run;
