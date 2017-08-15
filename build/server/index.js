function run(){
	var express = require("express"),
		app = express(),
		server = require('http').Server(app),
		io = require('socket.io')(server),
		router = require("./router");
		cookieParser = require('cookie-parser'),
		bodyParser   = require('body-parser'),
		session      = require('express-session'),
		morgan  = require('morgan');

	// set up our express application
	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms

	// app.set('view engine', 'ejs');
	app.use(express.static(__dirname + "/../public"));
	app.use(express.static(__dirname + "/../views"));


	app.use(session({ secret: 'zimayfgkz;tTcnLETTO+++' })); // session secret


	server.listen(3000, function(){
		router(app, io);
		console.log("Server listennig 3000 port");
	});
}

module.exports = run;
