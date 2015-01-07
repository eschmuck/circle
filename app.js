var express = require('express');
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var mongoose = require('mongoose');

var character = require('./character');
var constants = require('./constants');
var database = require('./database');
var player = require('./player').player;
var text = require('./text');
var room = require('./room');
var time = require('./time');
var weather = require('./weather');
var zone = require('./zone');
var world = require('./world');
var interpreter = require('./interpreter');
var mudlog = require('./mudlog');

var connection = mongoose.connect('mongodb://localhost/circledb');

var app = express();
var server = app.listen(3000);
var gameWorld = new world();
var inputInterpreter = new interpreter();

var sockets = [];

app.use(express.static(path.resolve(__dirname, 'client')));

// this tells socket.io to use our express server
var io = require('socket.io').listen(server);

http.createServer(app).listen(app.get('port'), function() {
  mudlog.info("Express server listening on port 3000");
});

time.getTime(function(timeDoc) {
  gameWorld.time = timeDoc[0];
});

weather.getWeather(function(weatherDoc) {
  gameWorld.weather = weatherDoc[0];
  
  // TODO: Understand why this doesn't work
  //weather.world = gameWorld;
});

room.getRooms(function(roomDocs) {
  gameWorld.rooms = roomDocs;
  zone.getZones(function(zoneDocs) {
    gameWorld.zones = zoneDocs;
    for(var i = 0; i < gameWorld.zones.length; i++) {
      mudlog.info('reseting zone ' + gameWorld.zones[i].id);
      gameWorld.zones[i].world = gameWorld;
      gameWorld.zones[i].reset(gameWorld.rooms);
    }
  });
});

setInterval(hourElapsed, global.SECONDS_PER_MUDHOUR * 1000);
setInterval(updateMobs, global.PULSE_MOBILE * 1000);

io.sockets.on('connection', function(socket) {
  socket.player = null;
  socket.connectionState = global.CON_GET_NAME;
  emitMessage(socket, text.IntroMessage);

  sockets.push(socket);

  mudlog.info('A new user connected! Socket count:' + sockets.length);

  socket.on('disconnect', function() {
    
    // if(socket.player !== undefined) {
    //   socket.player.emitRoomMessage(socket.player + " vanishes in a flash of white light!");
    //   gameWorld.removeCharacter(socket.player);
    // }
    
    sockets.splice(sockets.indexOf(socket), 1);
    
    mudlog.info('Socket disconnected. Socket count: ' + sockets.length);
  });

  socket.on('message', function(msg) {
    switch (socket.connectionState) {
      case global.CON_PLAYING:
        inputInterpreter.handleInput(socket.player, msg['input']);
        break;
      case global.CON_GET_NAME:
        getName(msg);
        break;
      case global.CON_NAME_CNFRM:
        if (msg['input'].substring(0, 1).toUpperCase() == 'Y') {
          mudlog.info('New player: ' + socket.player.name);
          emitMessage(socket, 'New character.\n\rGive me a password for ' + socket.player.name + ': ', 'Gray', 'true');
          socket.connectionState = global.CON_NEWPASSWD;
        }
        else if (msg['input'].substring(0, 1).toUpperCase() == 'N') {
          emitMessage(socket, 'Okay, what IS it, then? ');
          socket.connectionState = global.CON_GET_NAME;
        }
        else {
          emitMessage(socket, 'Please type Yes or No: ');
        }
        break;
      case global.CON_PASSWORD:
        if (msg['input'] != socket.player.password) {
          emitMessage(socket, 'Wrong password.\n\rPassword: ', 'Gray', 'true');
        }
        else {
          var existingPlayer = gameWorld.getPlayer(socket.player.name);
          
          if(existingPlayer !== null) {
            emitMessage(socket, "You take over your own body, already in use!");
            existingPlayer.emitRoomMessage(socket.player.name + " suddenly keels over in pain, surrounded by a white aura...");
            existingPlayer.emitRoomMessage(socket.player.name + "'s body has been taken over by a new spirit!");
            existingPlayer.socket.disconnect();
            
            existingPlayer.socket = socket;
            socket.player = existingPlayer;
            socket.connectionState = global.CON_PLAYING;
          }
          else {
            socket.connectionState = global.CON_RMOTD;
            emitMessage(socket, text.Motd + '\n\r*** PRESS RETURN: ');
          }            
        }
        break;
      case global.CON_NEWPASSWD:
        if (msg['input'].length < 3 || msg['input'].length > 10) {
          emitMessage(socket, 'Illegal password.\n\rPassword: ', 'Gray', 'true');
        }
        else {
          socket.player.password = msg['input'];
          emitMessage(socket, 'Please retype password: ', 'Gray', 'true');
          socket.connectionState = global.CON_CNFPASSWD;
        }
        break;
      case global.CON_CNFPASSWD:
        if (msg['input'] !== socket.player.password) {
          emitMessage(socket, 'Passwords don\'t match... start over.\n\rPassword: ', 'Gray', 'true');
          socket.connectionState = global.CON_NEWPASSWD;
        }
        else {
          emitMessage(socket, 'What is your sex (M/F)?');
          socket.connectionState = global.CON_QSEX;
        }
        break;
      case global.CON_QSEX:
        getPlayerSex(msg);
        break;
      case global.CON_QCLASS:
        getPlayerClass(msg);
        break;
      case global.CON_RMOTD:
        socket.connectionState = global.CON_MENU;
        emitMessage(socket, text.Menu);
        break;
      case global.CON_MENU:
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
      socket.player.gender = global.GENDER_MALE;
      socket.connectionState = global.CON_QCLASS;
      emitMessage(socket, text.ClassMenu);
    }
    else if (sexInput === 'F') {
      socket.player.gender = global.GENDER_MALE;
      socket.connectionState = global.CON_QCLASS;
      emitMessage(socket, text.ClassMenu);
    }
    else {
      emitMessage(socket, 'That is not a sex... What IS your sex (M/F)?');
    }
  }

  function getPlayerClass(msg) {
    var classInput = msg['input'].substring(0, 1).toUpperCase();
    if (classInput === 'C') {
      socket.player.class = global.CLASS_CLERIC;
    }
    else if (classInput === 'M') {
      socket.player.class = global.CLASS_MAGIC_USER;
    }
    else if (classInput === 'W') {
      socket.player.class = global.CLASS_WARRIOR;
    }
    else if (classInput === 'T') {
      socket.player.class = global.CLASS_THIEF;
    }
    else {
      emitMessage(socket, '\r\nThat\'s not a class.\r\nClass: ');
      return;
    }

    emitMessage(socket, text.Motd + '\n\r*** PRESS RETURN: ');
    socket.connectionState = global.CON_RMOTD;
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
      socket.connectionState = global.CON_NAME_CNFRM;
    }
    else {
      emitMessage(socket, 'Password: ', 'Gray', 'true');
      socket.connectionState = global.CON_PASSWORD;
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
    socket.connectionState = global.CON_PLAYING;
    socket.player.socket = socket;

    gameWorld.addCharacter(socket.player);

    var startRoom = gameWorld.getRoom(3001);
    startRoom.addCharacter(socket.player);
    startRoom.showRoomToCharacter(socket.player);
    
    socket.player.enterGame();
    
    mudlog.info(socket.player.name + " has entered the game");
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
  gameWorld.hourElapsed();
}

function updateMobs() {
  gameWorld.updateMobs();
}
