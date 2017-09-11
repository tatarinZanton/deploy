require('./check-versions')()
var config = require('../config')
var path = require('path')
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server, {
  serveClient: false,
  wsEngine: 'ws' // uws is not supported since it is a native module
})
var async = require('async')

var db
require('./server/db')().then(d => (db = d))

io.on('connection', function (socket) {
  require('./server/sockets')(db, async, socket)
})

// default port where dev server listens for incoming traffic
var port = config.build.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.build.proxyTable

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve pure static assets
app.use('/', express.static(config.build.assetsRoot))

module.exports = server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})
