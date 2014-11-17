var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var app = express();
var server = app.listen(3000);

app.use(express.static(path.resolve(__dirname, 'client')));

// this tells socket.io to use our express server
var io = require('socket.io').listen(server); 

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port 3000");
});

var sockets = [];

io.sockets.on('connection', function(socket) {
  console.log('A new user connected!');

  io.on('connection', function(socket) {

    sockets.push(socket);

    socket.emit('Welcome to CircleMUD 4.0\n\rBy what name do you wish to be known?');

    socket.on('disconnect', function() {
      sockets.splice(sockets.indexOf(socket), 1);
    });


  });



});