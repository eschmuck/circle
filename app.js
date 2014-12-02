var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');

var character = require('./character');
var connections = require('./connections');
var database = require('./database');
var player = require('./player').player;
var text = require('./text');
var room = require('./room');
var world = require('./world');

var app = express();
var server = app.listen(3000);
var gameDb = new database();
var gameWorld = new world();

var sockets = [];

app.use(express.static(path.resolve(__dirname, 'client')));

// this tells socket.io to use our express server
var io = require('socket.io').listen(server);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port 3000");
});

room.getRooms(function(docs){
  gameWorld.rooms = docs;
});

io.sockets.on('connection', function(socket) {
  console.log('A new user connected!');

  socket.player = null;
  socket.connectionState = connections.CON_GET_NAME;
  //socket.emit('message', text.IntroMessage);
  emitMessage(socket, text.IntroMessage);

  sockets.push(socket);

  socket.on('disconnect', function() {
    sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on('message', function(msg) {
    switch (socket.connectionState) {
      case connections.CON_PLAYING:
        break;
      case connections.CON_GET_NAME:
        getName(msg);
        break;
      case connections.CON_NAME_CNFRM:
        if (msg['input'].substring(0, 1).toUpperCase() == 'Y') {
          emitMessage(socket, 'New character.\n\rGive me a password for ' + socket.player.name + ': ', 'Gray', 'true');
          socket.connectionState = connections.CON_NEWPASSWD;
        }
        else if (msg['input'].substring(0, 1).toUpperCase() == 'N') {
          emitMessage(socket, 'Okay, what IS it, then? ');
          socket.connectionState = connections.CON_GET_NAME;
        }
        else {
          emitMessage(socket, 'Please type Yes or No: ');
        }
        break;
      case connections.CON_PASSWORD:
        if (msg['input'] != socket.player.password) {
          emitMessage(socket, 'Wrong password.\n\rPassword: ', 'Gray', 'true');
        }
        else {
          socket.connectionState = connections.CON_RMOTD;
          emitMessage(socket, text.Motd + '\n\r*** PRESS RETURN: ');
        }
        break;
      case connections.CON_NEWPASSWD:
        if (msg['input'].length < 3 || msg['input'].length > 10) {
          emitMessage(socket, 'Illegal password.\n\rPassword: ', 'Gray', 'true');
        }
        else {
          socket.player.password = msg['input'];
          emitMessage(socket, 'Please retype password: ', 'Gray', 'true');
          socket.connectionState = connections.CON_CNFPASSWD;
        }
        break;
      case connections.CON_CNFPASSWD:
        if (msg['input'] !== socket.player.password) {
          emitMessage(socket, 'Passwords don\'t match... start over.\n\rPassword: ', 'Gray', 'true');
          socket.connectionState = connections.CON_PASSWORD;
        }
        else {
          emitMessage(socket, 'What is your sex (M/F)?');
          socket.connectionState = connections.CON_QSEX;
        }
        break;
      case connections.CON_QSEX:
        getPlayerSex(msg);
        break;
      case connections.CON_QCLASS:
        getPlayerClass(msg);
        break;
      case connections.CON_RMOTD:
        socket.connectionState = connections.CON_MENU;
        emitMessage(socket, text.Menu);
        break;
      case connections.CON_MENU:
        switch (msg['input']) {
          case '0':
            socket.disconnect();
            break;
          case '1':
            enterGame();
            break;
          default:
            emitMessage(socket, 'That\'s not a menu choice!\r\n' + text.Menu);
        }
        break;
    }
  });

  function getPlayerSex(msg) {
    var sexInput = msg['input'].substring(0, 1).toUpperCase();

    if (sexInput === 'M') {
      socket.player.gender = character.GENDER_MALE;
      socket.connectionState = connections.CON_QCLASS;
      emitMessage(socket, text.ClassMenu);
    }
    else if (sexInput === 'F') {
      socket.player.gender = character.GENDER_MALE;
      socket.connectionState = connections.CON_QCLASS;
      //socket.emit('message', text.ClassMenu);
      emitMessage(socket, text.ClassMenu);      
    }
    else {
      //socket.emit('message', 'That is not a sex... What IS your sex (M/F)?');
      emitMessage(socket, 'That is not a sex... What IS your sex (M/F)?');
    }
  }

  function getPlayerClass(msg) {
    var classInput = msg['input'].substring(0, 1).toUpperCase();
    if (classInput === 'C') {
      socket.player.class = player.CLASS_CLERIC;
    }
    else if (classInput === 'M') {
      socket.player.class = player.CLASS_MAGIC_USER;
    }
    else if (classInput === 'W') {
      socket.player.class = player.CLASS_WARRIOR;
    }
    else if (classInput === 'T') {
      socket.player.class = player.CLASS_THIEF;
    }
    else {
      //socket.emit('message', '\r\nThat\'s not a class.\r\nClass: ');
      emitMessage(socket, '\r\nThat\'s not a class.\r\nClass: ');
      return;
    }
    //socket.emit('message', text.Motd + '\n\r*** PRESS RETURN: ');
    emitMessage(socket, text.Motd + '\n\r*** PRESS RETURN: ');
    socket.connectionState = connections.CON_RMOTD;
  }

  function getName(msg) {
    var playerName = msg['input'].substring(0, 1).toUpperCase() + msg['input'].substring(1).toLowerCase();
    socket.player = new player();
    socket.player.name = playerName;
    socket.player.load(playerName, afterPlayerLoaded);
  }

  function afterPlayerLoaded(playerDocuments) {
   if (playerDocuments.length === 0) {
       emitMessage(socket, 'Did I get that right, ' + socket.player.name + ' (Y/N)?');       
       socket.connectionState = connections.CON_NAME_CNFRM;
    }
    else {
       emitMessage(socket, 'Password: ', 'Gray', 'true');
       socket.connectionState = connections.CON_PASSWORD;
       socket.player = playerDocuments[0];
    }
  }
  
  function enterGame() {
    if(socket.player.level === undefined) {
      socket.player.start();
      socket.player.save(function(err) {
        // TODO: Log error, I guess?
      });
    }
    
    //socket.emit('message', text.WelcomeMessage);
    emitMessage(socket, text.WelcomeMessage);   
    socket.connectionState = connections.CON_PLAYING;
    
    var startRoom = gameWorld.getRoom(3001);
    startRoom.addCharacter(socket.player);
    
    // TODO: Change this to 'show room to player' function
    // socket.emit('message', startRoom.title);
    // socket.emit('message', startRoom.description);
    emitMessage(socket, startRoom.title, 'Cyan');
    emitMessage(socket, startRoom.description);
  }
});

function emitMessage(socket, text, color, mask) {
  socket.emit('message', { message: text, color: color, mask : mask });
}
