var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var character = require('./character');
var connections = require('./connections');
var database = require('./database');
var player = require('./player');

var app = express();
var server = app.listen(3000);
var gameDb = new database();

app.use(express.static(path.resolve(__dirname, 'client')));

// this tells socket.io to use our express server
var io = require('socket.io').listen(server);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port 3000");
});

var sockets = [];

var welcomeMessage = 'Welcome to CircleMUD 4.0\n\rBy what name do you wish to be known?';
var menu = 'Welcome to CircleMUD!\n\r0) Exit from CircleMUD.\n\r1) Enter the game.\n\r\n\r  Make a choice: ';
var startMessage = 'Welcome.  This is your new CircleMUD character!  You can now earn gold, gain experience, find weapons and equipment, and much more -- while meeting people from around the world!';
var motd = 'This is the message of the day.';
var classMenu = '\r\nSelect a class:\r\n  [C]leric\r\n  [T]hief\r\n  [W]arrior\r\n  [M]agic-user\r\n';

io.sockets.on('connection', function(socket) {
  console.log('A new user connected!');

  socket.player = null;
  socket.connectionState = connections.CON_GET_NAME;
  socket.emit('message', welcomeMessage);

  sockets.push(socket);

  socket.on('disconnect', function() {
    sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on('message', function(msg) {
    switch (socket.connectionState) {
      case connections.CON_PLAYING:
        break;
      case connections.CON_GET_NAME:
        var playerName = msg['input'].substring(0, 1).toUpperCase() + msg['input'].substring(1).toLowerCase();
        socket.player = new player(playerName);
        gameDb.loadOne(socket.player, afterPlayerLoaded);
        break;
      case connections.CON_NAME_CNFRM:
        if (msg['input'].substring(0, 1).toUpperCase() == 'Y') {
          socket.emit('message', 'New character.\n\rGive me a password for ' + socket.player.name + ': ');
          socket.connectionState = connections.CON_NEWPASSWD;
        }
        else if (msg['input'].substring(0, 1).toUpperCase() == 'N') {
          socket.emit('message', 'Okay, what IS it, then?');
          socket.connectionState = connections.CON_GET_NAME;
        }
        else {
          socket.emit('message', 'Please type Yes or No: ');
        }
        break;
      case connections.CON_PASSWORD:
        if (msg['input'] != socket.player.password) {
          socket.emit('Wrong password.\n\rPassword: ');
        }
        else {
          socket.connectionState = connections.CON_RMOTD;
          socket.emit('message', motd + '\n\r*** PRESS RETURN: ');
        }
        break;
      case connections.CON_NEWPASSWD:
        if(msg['input'].length < 3 || msg['input'].length > 10) {
          socket.emit('message', 'Illegal password.\n\rPassword: ');
        }
        else {
          socket.player.password = msg['input'];
          socket.emit('message', 'Please retype password: ');
          socket.connectionState = connections.CON_CNFPASSWD;
        }
        break;
      case connections.CON_CNFPASSWD:
        if(msg['input'] !== socket.player.password) {
          socket.emit('message', 'Passwords don\'t match... start over.\n\rPassword:');
          socket.connectionState = connections.CON_PASSWORD;
        }
        else {
          socket.emit('message', 'What is your sex (M/F)?');
          socket.connectionState = connections.CON_QSEX;
        }
        break;
      case connections.CON_QSEX:
        var sexInput = msg['input'].substring(0, 1).toUpperCase();
        
        if(sexInput === 'M') {
          socket.player.gender = character.GENDER_MALE;
          socket.connectionState = connections.CON_QCLASS;
          socket.emit('message', classMenu);
        }
        else if(sexInput === 'F') {
          socket.player.gender = character.GENDER_MALE;
          socket.connectionState = connections.CON_QCLASS;
          socket.emit('message', classMenu);
        }
        else {
          socket.emit('message', 'That is not a sex... What IS your sex (M/F)?');
        }
        break;
      case connections.CON_QCLASS:
        var classInput = msg['input'].substring(0, 1).toUpperCase();
        if(classInput === 'C') {
          socket.player.class = player.CLASS_CLERIC;
        }
        else if(classInput === 'M') {
          socket.player.class = player.CLASS_MAGIC_USER;
        }
        else if(classInput === 'W') {
          socket.player.class = player.CLASS_WARRIOR;
        }
        else if(classInput === 'T') {
          socket.player.class = player.CLASS_THIEF;
        }
        else {
          socket.emit('message', '\r\nThat\'s not a class.\r\nClass: ');
          return;
        }
        socket.emit('message', motd + '\n\r*** PRESS RETURN: ');
        socket.connectionState = connections.CON_RMOTD;
        break;
      case connections.CON_RMOTD:
        socket.connectionState = connections.CON_MENU;
        socket.emit('message', menu);
        break;
      case connections.CON_MENU:
        switch (msg['input']) {
          case '0':
            socket.disconnect();
            break;
          case '1':
            socket.emit('message', welcomeMessage);
            socket.connectionState = connections.CON_PLAYING;
            break;
          default:
            socket.emit('message', 'That\'s not a menu choice!\r\n' + menu);
        }
        break;
    }
  });
  
  function afterPlayerLoaded(playerDocument) {
    if(playerDocument === null) {
      socket.emit('message', 'Did I get that right, ' + socket.player.name + ' (Y/N)?' );
      socket.connectionState = connections.CON_NAME_CNFRM;
    }
  }
});



