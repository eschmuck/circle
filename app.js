var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var mongoose = require('mongoose');

var character = require('./character');
var connections = require('./connections');
var database = require('./database');
var player = require('./player').player;
var text = require('./text');
var room = require('./room');
var zone = require('./zone');
var world = require('./world');
var interpreter = require('./interpreter');

var connection = mongoose.connect('mongodb://localhost/circledb');

var app = express();
var server = app.listen(3000);
//var gameDb = new database();
var gameWorld = new world();
var inputInterpreter = new interpreter();

var sockets = [];

app.use(express.static(path.resolve(__dirname, 'client')));

// this tells socket.io to use our express server
var io = require('socket.io').listen(server);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port 3000");
});

room.getRooms(function(roomDocs) {
  gameWorld.rooms = roomDocs;
  zone.getZones(function(zoneDocs) {
    gameWorld.zones = zoneDocs;
    for(var i = 0; i < gameWorld.zones.length; i++) {
      console.log('reseting zone ' + gameWorld.zones[i].id);
      gameWorld.zones[i].world = gameWorld;
      gameWorld.zones[i].reset(gameWorld.rooms);
    }
  });
});

setInterval(hourElapsed, 10000);

io.sockets.on('connection', function(socket) {
  console.log('A new user connected!');

  socket.player = null;
  socket.connectionState = connections.CON_GET_NAME;
  emitMessage(socket, text.IntroMessage);

  sockets.push(socket);

  socket.on('disconnect', function() {
    sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on('message', function(msg) {
    switch (socket.connectionState) {
      case connections.CON_PLAYING:
        inputInterpreter.handleInput(socket.player, msg['input']);
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
      emitMessage(socket, text.ClassMenu);
    }
    else {
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
      emitMessage(socket, '\r\nThat\'s not a class.\r\nClass: ');
      return;
    }

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
    if (socket.player.level === undefined) {
      socket.player.start();
      socket.player.save(function(err) {
        // TODO: Log error, I guess?
      });
    }

    emitMessage(socket, text.WelcomeMessage);
    socket.connectionState = connections.CON_PLAYING;
    socket.player.socket = socket;
    socket.player.enterGame();

    gameWorld.addCharacter(socket.player);

    var startRoom = gameWorld.getRoom(3001);
    startRoom.addCharacter(socket.player);
    startRoom.showRoomToCharacter(socket.player);
  }
});

function emitMessage(socket, text, color, mask) {
  socket.emit('message', {
    message: text,
    color: color,
    mask: mask
  });
}

function hourElapsed() {
  //world.hourElapsed();
  console.log(gameWorld.people);
}
