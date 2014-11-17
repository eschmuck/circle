var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var connections = require('./connections');
var database = require('./database');

var app = express();
var server = app.listen(3000);

app.use(express.static(path.resolve(__dirname, 'client')));

// this tells socket.io to use our express server
var io = require('socket.io').listen(server); 

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port 3000");
});

var sockets = [];

var welcomeMessage = 'Welcome to CircleMUD 4.0\n\rBy what name do you wish to be known?';
var menu = 'Welcome to CircleMUD!\n\r0) Exit from CircleMUD.\n\r1) Enter the game.\n\r\n\r  Make a choice: '; 
var startMessage = 'Welcome.  This is your new CircleMUD character!  You can now earn gold, gain experience, find weapons and equipment, and much more -- while meeting people from around the world!';

io.sockets.on('connection', function(socket) {
  console.log('A new user connected!');

  io.on('connection', function(socket) {

    socket.player = null;
    socket.connectionState = connections.CON_GET_NAME;
    socket.emit('message', welcomeMessage);

    sockets.push(socket);

    socket.on('disconnect', function() {
      sockets.splice(sockets.indexOf(socket), 1);
    });

    socket.on('message', function(msg) {
      switch(socket.connectionState) {
        case connections.CON_GET_NAME:
          console.log(msg);
          break;
      }
    });


  });



});
