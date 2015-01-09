var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var Social =  require("./social");
var interpreter = require("./interpreter");
var util = require('util');
var extensions = require('./extensions');
var item = require("./item");
var utility = require("./utility");
var constants = require("./constants");
var text = require('./text');
var mudlog = require('./mudlog');

var directions = [ 'north', 'east', 'south', 'west', 'up', 'down' ];

global.NUM_WEARS  = 18;

var characterSchema = new schema({
	name: String,
	gender: Number,
	
	hitpoints: Number,
	maximumHitpoints: Number,
	manapoints: Number,
	maximumManapoints: Number,
	movepoints: Number,
	maximumMovepoints: Number,
	
	gold: Number,
	experience: Number,
	level: Number,
	
	strength: Number,
	strengthAdd: Number,
	intelligence: Number,
	wisdom: Number,
	dexterity: Number,
	constitution: Number,
	charisma: Number,
	
	position: Number,
	
	wearing: [],
	inventory: []
});

characterSchema.methods.getPersonalPronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "it";
		case global.GENDER_MALE:
			return "he";
		case global.GENDER_FEMALE:
			return "she";
	}
};

characterSchema.methods.getObjectPronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "it";
		case global.GENDER_MALE:
			return "him";
		case global.GENDER_FEMALE:
			return "her";
	}
};

characterSchema.methods.getPossessivePronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "its";
		case global.GENDER_MALE:
			return "his";
		case global.GENDER_FEMALE:
			return "her";
	}
};


characterSchema.methods.blah = function() {
	return 'blah';
};

characterSchema.methods.getDescription = function() {
	// Implementation overriden by child schemas	
};

characterSchema.methods.listInventory = function() {
	// Implementation overriden by child schemas	
};

characterSchema.methods.listEquipment = function() {
	// Implementation overriden by child schemas
};

characterSchema.methods.listScore = function() {
	// Implementation overriden by child schemas	
};

characterSchema.methods.listGold = function() {
	// Implementation overriden by child schemas	
};

characterSchema.methods.listEquipment = function() {
	// Implementation overriden by child schemas	
};

characterSchema.methods.hourlyUpdate = function() {
	// Implementation overriden by child schemas	
};

characterSchema.methods.consider = function(targetName) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.slay = function(targetName) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.isNpc = function() {
	// Implementation overriden by child schemas	
	return false;
};

characterSchema.getThac0 = function() {
	// Implementation overriden by child schemas
};

characterSchema.getBareHandDamage = function() {
	// Implementation overriden by child schemas
};

characterSchema.methods.isAwake = function() {
	if(this.position >= global.POS_RESTING) {
		return true;
	}
	
	return false;
};

characterSchema.methods.emitMessage = function(message, color) {
	if(this.socket !== undefined) {
		var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);
		
		var prompt = this.hitpoints + "H " + this.manapoints + "M " + this.movepoints + "V > ";
		
		if(color !== undefined) {
			this.socket.emit('message', { message: formattedMessage, color: color, prompt: prompt });
		}
		else {
			this.socket.emit('message', { message: formattedMessage, prompt: prompt });
		}
	}
};

characterSchema.methods.setPrompt = function(prompt) {
	this.socket.emit('message', { message: "", prompt: prompt });
};

characterSchema.methods.emitRoomMessage = function(message, color) {
	var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);

	for(var i = 0; i < this.room.people.length; i++) {
		if(this.room.people[i] !== this) {
			if(!this.room.people[i].isNpc()) {
				this.room.people[i].emitMessage(formattedMessage, color);
			}
		}
	}
};

characterSchema.methods.emitWorldMessage = function(message, color) {
	var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);

	for(var i = 0; i < this.world.people.length; i++) {
		if(this.world.people[i] !== this) {
			if(!this.world.people[i].isNpc()) {
				this.world.people[i].emitMessage(formattedMessage, color);
			}
		}
	}
};

characterSchema.methods.emitObservedMessage = function(target, message, color) {
	var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);

	for(var i = 0; i < this.room.people.length; i++) {
		if(this.room.people[i] !== this && this.room.people[i] !== target) {
			if(!this.room.people[i].isNpc()) {
				this.room.people[i].emitMessage(formattedMessage, color);
			}
		}
	}
};

characterSchema.methods.say = function(message) {
	if(message.length < 1) {
		this.emitMessage("Yes, but WHAT do you want to say?");
	}
	else {
		this.emitMessage("You say, '" + message + "'");
		this.emitRoomMessage(this.name + " says, '" + message + "'");
	}
};

characterSchema.methods.generalCommunication = function(subCommand, message) {
	if(this.room.isSoundproof) {
		this.emitMessage('The walls seem to absorb your words.');
		return;
	}
	
    var commType;
    var commColor;
    var cannotComm;

    switch(subCommand) {
		case global.SCMD_HOLLER:
			if(this.isNoHoller) {
				this.emitMessage('Turn off your noholler flag first!');
				return;
			}
			
			commType = 'holler';
			cannotComm = 'You cannot holler!';
			commColor = 'Orange';
			break;
		case global.SCMD_SHOUT:
			if(this.isNoShout) {
				this.emitMessage('Turn off your noshout flag first!');
				return;
			}
			
			commType = 'shout';
			cannotComm = 'You cannot shout!';
			commColor = 'Yellow';
			break;
		case global.SCMD_GOSSIP:
			if(this.isNoGossip) {
				this.emitMessage('You aren\'t even on the channel!');
				return;
			}
			
			commType = 'gossip';
			cannotComm = 'You cannot gossip!';
			commColor = 'Orange';
			break;
		case global.SCMD_AUCTION:
			if(this.isNoAuction) {
				this.emitMessage('You aren\'t even on the channel!');
				return;
			}
			
			commType = 'auction';
			cannotComm = 'You cannot auction!';
			commColor = 'Magenta';
			break;
		case global.SCMD_GRATZ:
			if(this.isNoGratz) {
				this.emitMessage('You aren\'t listening to congratulations messages!');
				return;
			}
			
			commType = 'congrat';
			cannotComm = 'You cannot congratulate!';
			commColor = 'Green';
			break;
		case global.SCMD_QSAY:
			if(this.isNoQuest) {
				this.emitMessage("You aren't currently listening to the quest channel!");
				return;
			}
			
			commType = 'quest-say';
			cannotComm = 'You cannot currently qsay!';
			commColor = 'White';
			break;			
	}

	if(message.length < 1) {
		this.emitMessage("Yes, " + commType + ", fine, " + commType + " we must, but WHAT???");
		return;
	}

	this.emitMessage("You " + commType + ", '" + message + "'", commColor);
	var outputMessage = this.name + " " + commType + "s, '" + message + "'";
	
	for(var i = 0; i < this.world.people.length; i++) {
		if(this.world.people[i] !== this) {
			if(!this.world.people[i].isNpc()) {
				if(!this.world.people[i].room.isSoundproof) {
					switch(subCommand) {
						case global.SCMD_HOLLER:
							if(!this.world.people[i].isNoHoller) {
								this.world.people[i].emitMessage(outputMessage, commColor);
							}
							break;
						case global.SCMD_SHOUT:
							if(!this.world.people[i].isNoShout) {
								// TODO: Put this back in eventually!
								//if(this.world.people[i].room.zone.id === this.room.zone.id) {
									this.world.people[i].emitMessage(outputMessage, commColor);
								//}
							}
							break;
						case global.SCMD_GOSSIP:
							if(!this.world.people[i].isNoGossip) {
								this.world.people[i].emitMessage(outputMessage, commColor);
							}
							break;
						case global.SCMD_AUCTION:
							if(!this.world.people[i].isNoAuction) {
								this.world.people[i].emitMessage(outputMessage, commColor);
							}
							break;
						case global.SCMD_GRATZ:
							if(!this.world.people[i].isNoGratz) {
								this.world.people[i].emitMessage(outputMessage, commColor);
							}
							break;
						case global.SCMD_QSAY:
							if(!this.world.people[i].isNoQuest) {
								this.world.people[i].emitMessage(outputMessage, commColor);
							}
							break;
					}
				}
			}
		}
	}
};

characterSchema.methods.toggleAuction = function(mode) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.toggleGossip = function(mode) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.toggleGratz = function(mode) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.toggleHoller = function(mode) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.toggleShout = function(mode) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.toggleQuest = function(mode) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.toggleTell = function(mode) {
	// Implementation overriden by child schemas	
};

characterSchema.methods.canTellTarget = function(target) {
	if(this === target) {
		this.emitMessage("You try to tell yourself something.  Did it work?");
	}
	else if(this.isNoTell) {
		this.emitMessage("You cannot tell other people while you have notell on.");
	}
	// else if(this.room.isSoundproof) {
	// 	this.emitMessage("The walls seem to absorb your words.");
	// }
	// else if(target.room.isSoundproof || target.isNoTell) {
	// 	this.emitMessage(target.getPersonalPronoun + " can't hear you.");
	// }
	// else if(target.isWriting) {
	// 	this.emitMessage(target.getPersonalPronoun + "'s writing a message right now; try again later.");
	// }
	// else if(target.isLinkless) {
	// 	this.emitMessage(target.getPersonalPronoun + "'s linkless at the moment.");
	// }
	else {
		return true;
	}
	
	return false;
};

characterSchema.methods.tell = function(targetName, message) {
	var target = this.world.getCharacter(targetName);
	
	if(target === null) {
		this.emitMessage("No-one by that name here.");
	}
	else {
		if(this.canTellTarget(target)) {
			this.emitMessage("You tell " + target.name + ", '" + message + "'", "Red");
			target.emitMessage(this.name + " tells you, '" + message + "'", "Red");
		}
	}
};

characterSchema.methods.social = function(action, parameter) {
	var thisSocial = new Social(action, parameter, this);
	thisSocial.emitMessages();
};

characterSchema.methods.emote = function(parameter) {
	this.emitMessage(this.name + " " + parameter);
	this.emitRoomMessage(this.name + " " + parameter);
};

characterSchema.methods.insult = function(parameter) {
	var target = this.room.getCharacter(parameter);
	
	if(target === null) {
		this.emitMessage("Can't find that person!!!");
		return;
	}
	
	if(target === this) {
		this.emitMessage("You feel insulted.");
		this.emitRoomMessage(this.name + " calls " + this.getPossessivePronoun() + " own mother a donkey.");
		return;
	}
	
	var randomNumber = utility.randomNumber(1, 3);
	
	this.emitMessage("You insult " + target.name + ".");
	
	switch(randomNumber) {
		case 1:
			if(target.gender !== global.GENDER_FEMALE) {
				target.emitMessage(this.name + " accuses you of fighting like a woman.");
			}
			else {
				target.emitMessage(this.name + " says women can't fight.");
			}
			break;
		case 2:
			target.emitMessage(this.name + " calls your mother a horse-faced troll.");
			break;
		case 3:
			target.emitMessage(this.name + " tells you to get lost!");
			break;
	}
	
	this.emitObservedMessage(target, this.name + " insults " + target.name + ".");
};

characterSchema.methods.stand = function() {
	switch(this.position) {
		case global.POS_STANDING:
			this.emitMessage("You are already standing.");
			break;
		case global.POS_SITTING:
			this.emitMessage("You stand up.");
			this.emitRoomMessage(this.name + " clambers to " + this.getPossessivePronoun() + " feet.");
			this.position = global.POS_STANDING;
			break;
        case global.POS_RESTING:
            this.emitMessage("You stop resting, and stand up.");
			this.emitRoomMessage(this.name + ' stops resting, and clambers on ' + this.getPossessivePronoun() + ' feet.');
            this.position = global.POS_STANDING;
            break;
        case global.POS_SLEEPING:
            this.emitMessage("You have to wake up first!");
            break;
        case global.POS_FIGHTING:
            this.emitMessage("Do you not consider fighting as standing?");
            break;
        default:
            this.emitMessage("You stop floating around, and put your feet on the ground.");
            this.emitRoomMessage(this.name + " stops floating around and puts " + this.getPossessivePronoun() + ' feet on the ground.');
            this.position = global.POS_STANDING;
            break;
	}
};

characterSchema.methods.sit = function() {
	switch(this.position) {
		case global.POS_STANDING:
			this.emitMessage("You sit down.");
			this.emitRoomMessage(this.name + " sits down.");
			this.position = global.POS_SITTING;
			break;
		case global.POS_SITTING:
			this.emitMessage("You're sitting already.");
			break;
        case global.POS_RESTING:
            this.emitMessage("You stop resting, and sit up.");
            this.emitRoomMessage(this.name + ' stops resting.');
            this.position = global.POS_SITTING;
            break;
        case global.POS_SLEEPING:
            this.emitMessage("You have to wake up first.");
            break;
        case global.POS_FIGHTING:
            this.emitMessage('Sit down while fighting? Are you MAD?');
            break;
        default:
            this.emitMessage('You stop floating around, and sit down.');
            this.emitRoomMessage(this.name + ' stops floating around, and sit down.');
            this.position = global.POS_SITTING;
            break;
	}
};

characterSchema.methods.sleep = function() {
	switch(this.position) {
        case global.POS_STANDING:
            this.emitMessage('You sit down and rest your tired bones.');
            this.emitRoomMessage(this.name + ' sits down and rests.');
            this.position = global.POS_RESTING;
            break;
        case global.POS_SITTING:
            this.emitMessage('You rest your tired bones.');
            this.emitRoomMessage(this.name + ' rests.');
            this.position = global.POS_RESTING;
            break;
        case global.POS_RESTING:
		    this.emitMessage('You are already resting.');
		    break;
        case global.POS_SLEEPING:
            this.emitMessage('You have to wake up first.');
            break;
        case global.POS_FIGHTING:
            this.emitMessage('Rest down while fighting? Are you MAD?');
            break;
        default:
            this.emitMessage('You stop floating around, and stop to rest your tired bones.');
            this.emitRoomMessage(this.name + ' stops floating around, and rests.');
            this.position = POS_SITTING;
            break;
	}
};

characterSchema.methods.sleep = function() {
    switch(this.postion) {
	    case global.POS_STANDING:
	    case global.POS_SITTING:
	    case global.POS_RESTING:
	        this.emitMessage('You go to sleep.');
	        this.emitRoomMessage(this.name + ' lies down and falls asleep.');
	        this.position = POS_SLEEPING;
	        break;
        case global.POS_SLEEPING:
            this.emitMessage('You are already sound asleep.');
            break;
        case global.POS_FIGHTING:
            this.emitMessage('Sleep while fighting? Are you MAD?');
            break;
        default:
            this.emitMessage('You stop floating around, and lie down to sleep.');
            this.emitRoomMessage(this.name + ' stops floating around, and lie down to sleep.');
            this.position = POS_SLEEPING;
            break;
    }
};

characterSchema.methods.openExit = function(exit) {
	if(exit.isLocked) {
		this.emitMessage("It's locked.\n\r");
		return false;
	}
	
	if(!exit.isClosed) {
		this.emitMessage("But it's already open.\n\r");
		return false;
	}

	this.emitMessage("You open the " + exit.doorKeywords[0] + ".\n\r");
	this.emitRoomMessage(this.name + " opens the " + exit.doorKeywords[0] + ".\n\r");
	exit.isClosed = false;
	return true;
};

characterSchema.methods.closeExit = function(exit) {
	if(exit.isClosed) {
		this.emitMessage("But it's already closed.\n\r");
		return false;
	}
	
	if(!exit.isClosable) {
		this.emitMessage("That can't be closed.\n\r");
		return false;
	}

	this.emitMessage("You close the " + exit.doorKeywords[0] + ".\n\r");
	this.emitRoomMessage(this.name + " closes the " + exit.doorKeywords[0] + ".\n\r");
	exit.isClosed = true;
	return true;
};

characterSchema.methods.unlockExit = function(exit) {
	if(!exit.isClosed) {
		this.emitMessage("But it's already open.\n\r");
		return false;
	}
	
	if(!exit.isLocked) {
		this.emitMessage("But it's already unlocked.\n\r");
		return false;
	}
	
	if(this.inventory.findItemById(exit.doorKeyId) === false) {
		this.emitMessage("You don't seem to have the right key for that.\n\r");
		return false;
	}
	
	this.emitMessage("You unlock the " + exit.doorKeywords[0] + "... *CLICK*\n\r");
	this.emitRoomMessage(this.name + " unlocks the " + exit.doorKeywords[0] + ".\n\r");
	exit.isLocked = false;
	return true;
};

characterSchema.methods.lockExit = function(exit) {
	if(!exit.isClosed) {
		this.emitMessage("But it's wide open...\n\r");
		return false;
	}
	
	if(exit.isLocked) {
		this.emitMessage("But it's already locked.\n\r");
		return false;
	}
	
	if(this.inventory.findItemById(exit.doorKeyId) === false) {
		this.emitMessage("You don't seem to have the right key for that.\n\r");
		return false;
	}
	
	this.emitMessage("You lock the " + exit.doorKeywords[0] + "... *CLICK*\n\r");
	this.emitRoomMessage(this.name + " locks the " + exit.doorKeywords[0] + ".\n\r");
	exit.isLocked = true;
	return true;
};

// TODO: Combine openDoor, closeDoor, lockDoor, unlockDoor -- too much code duplication.
characterSchema.methods.openDoor = function(keyword, directionInput) {
	var exit = null;
	var result = false;
	
	if(directionInput === undefined) {
		exit = this.room.getDoorByKeyword(keyword);
		
		if(exit === null) {
			this.emitMessage("There doesn't seem to be a " + keyword + " here.\n\r");
			return;
		}
		else {
			result = this.openExit(exit);
		}
	}
	else {
		var direction = -1;
		
		switch(directionInput.substring(0, 1).toLowerCase()) {
			case "n":
				direction = 0;
				break;
			case "e":
				direction = 1;
				break;
			case "s":
				direction = 2;
				break;
			case "w":
				direction = 3;
				break;
			case "u":
				direction = 4;
				break;
			case "d":
				direction = 5;
				break;
		}
		
		if(direction === -1) {
			this.emitMessage("Which way is that?\n\r");
			return;
		}
		else {
			exit = this.room.getDoorByKeywordAndDirection(keyword, direction);
			
			if(exit === null) {
				this.emitMessage("There doesn't seem to be a " + keyword + " in that direction.\n\r");
				return;
			}
			else {
				result = this.openExit(exit);
			}
		}
	}
	
	if(result === true) {
		this.room.openOppositeDoor(this.world.getRoom(exit.toRoomId));
	}
};

characterSchema.methods.closeDoor = function(keyword, directionInput) {
	var exit = null;
	var result = false;
	
	if(directionInput === undefined) {
		exit = this.room.getDoorByKeyword(keyword);
		
		if(exit === null) {
			this.emitMessage("There doesn't seem to be a " + keyword + " here.\n\r");
			return;
		}
		else {
			result = this.closeExit(exit);
		}
	}
	else {
		var direction = -1;
		
		switch(directionInput.substring(0, 1).toLowerCase()) {
			case "n":
				direction = 0;
				break;
			case "e":
				direction = 1;
				break;
			case "s":
				direction = 2;
				break;
			case "w":
				direction = 3;
				break;
			case "u":
				direction = 4;
				break;
			case "d":
				direction = 5;
				break;
		}
		
		if(direction === -1) {
			this.emitMessage("Which way is that?\n\r");
			return;
		}
		else {
			exit = this.room.getDoorByKeywordAndDirection(keyword, direction);
			
			if(exit === null) {
				this.emitMessage("There doesn't seem to be a " + keyword + " in that direction.\n\r");
				return;
			}
			else {
				result = this.closeExit(exit);
			}
		}
	}
	
	if(result === true) {
		this.room.closeOppositeDoor(this.world.getRoom(exit.toRoomId));
	}
};

characterSchema.methods.unlockDoor = function(keyword, directionInput) {
	var exit = null;
	var result = false;
	
	if(directionInput === undefined) {
		exit = this.room.getDoorByKeyword(keyword);
		
		if(exit === null) {
			this.emitMessage("There doesn't seem to be a " + keyword + " here.\n\r");
			return;
		}
		else {
			result = this.unlockExit(exit);
		}
	}
	else {
		var direction = -1;
		
		switch(directionInput.substring(0, 1).toLowerCase()) {
			case "n":
				direction = 0;
				break;
			case "e":
				direction = 1;
				break;
			case "s":
				direction = 2;
				break;
			case "w":
				direction = 3;
				break;
			case "u":
				direction = 4;
				break;
			case "d":
				direction = 5;
				break;
		}
		
		if(direction === -1) {
			this.emitMessage("Which way is that?\n\r");
			return;
		}
		else {
			exit = this.room.getDoorByKeywordAndDirection(keyword, direction);
			
			if(exit === null) {
				this.emitMessage("There doesn't seem to be a " + keyword + " in that direction.\n\r");
				return;
			}
			else {
				result = this.unlockExit(exit);
			}
		}
	}
	
	if(result === true) {
		this.room.unlockOppositeDoor(this.world.getRoom(exit.toRoomId));
	}
};

characterSchema.methods.lockDoor = function(keyword, directionInput) {
	var exit = null;
	var result = false;
	
	if(directionInput === undefined) {
		exit = this.room.getDoorByKeyword(keyword);
		
		if(exit === null) {
			this.emitMessage("There doesn't seem to be a " + keyword + " here.\n\r");
			return;
		}
		else {
			result = this.lockExit(exit);
		}
	}
	else {
		var direction = -1;
		
		switch(directionInput.substring(0, 1).toLowerCase()) {
			case "n":
				direction = 0;
				break;
			case "e":
				direction = 1;
				break;
			case "s":
				direction = 2;
				break;
			case "w":
				direction = 3;
				break;
			case "u":
				direction = 4;
				break;
			case "d":
				direction = 5;
				break;
		}
		
		if(direction === -1) {
			this.emitMessage("Which way is that?\n\r");
			return;
		}
		else {
			exit = this.room.getDoorByKeywordAndDirection(keyword, direction);
			
			if(exit === null) {
				this.emitMessage("There doesn't seem to be a " + keyword + " in that direction.\n\r");
				return;
			}
			else {
				result = this.lockExit(exit);
			}
		}
	}
	
	if(result === true) {
		this.room.lockOppositeDoor(this.world.getRoom(exit.toRoomId));
	}
};

characterSchema.methods.move = function(direction) {
	var exit;
	var exitExists = this.room.exitExists(direction);

	if(!exitExists) {
	 	this.emitMessage("Alas, you cannot go that way...");
	}
	else {
		switch(direction) {
			case 0:
				exit = this.room.northernExit;
				break;
			case 1:
				exit = this.room.easternExit;
				break;
			case 2:
				exit = this.room.southernExit;
				break;
			case 3:
				exit = this.room.westernExit;
				break;
			case 4:
				exit = this.room.upwardExit;
				break;
			case 5:
				exit = this.room.downwardExit;
				break;
		}
		
		if(exit.isClosed === true) {
		 	this.emitMessage("The " + exit.doorKeywords[0] + " seems to be closed.\n\r");
		}
		else {
		 	var newRoom = this.world.getRoom(exit.toRoomId);
		 	
		 	if(newRoom !== null) {
		 		if(newRoom.mobsAllowed === false && this.isNpc() === true) {
					return;
				}
		 		
			 	this.emitRoomMessage(this.name + " leaves " + directions[direction] + ".\n\r");
			 	this.room.removeCharacter(this);
		 		
			 	newRoom.addCharacter(this);
			 	this.emitRoomMessage(this.name + " has arrived.\n\r");
				
			 	newRoom.showRoomToCharacter(this);
			 	
			 	if(newRoom.isDeathTrap === true) {
			 		this.die();
			 	}
		 	}
		 	else {
		 		this.emitMessage("Although you should be able to go there, you cannot!\n\r");
		 	}
		}
	}
};

characterSchema.methods.goto = function(keyword) {
	var newRoom = this.world.getRoom(parseInt(keyword), 10);
	
	if(newRoom !== null) {
		this.emitRoomMessage(this.name + " disappears in a puff of smoke.\n\r");
	 	this.room.removeCharacter(this);
	 	
	 	newRoom.addCharacter(this);
	 	this.emitRoomMessage(this.name + " appears with an ear-splitting bang.\n\r");
		
	 	newRoom.showRoomToCharacter(this);
	}
};

characterSchema.methods.takeObject = function(object) {
	this.room.removeItem(object);
	this.inventory.push(object);
	this.emitMessage("You take " + object.shortDescription + ".");
	this.emitRoomMessage(this.name + " takes " + object.shortDescription + ".");
};

characterSchema.methods.takeObjects = function(objectArray) {
	for(var i = 0; i < objectArray.length; i++) {
		this.takeObject(objectArray[i]);
	}
};

characterSchema.methods.takeItem = function(keyword) {
	var result = this.room.findRoomContentsFromKeywords(keyword);
	
	if(result === null) {
		this.emitMessage("Take what?!?");
		return;
	}
	
	if(result.mode === 'all' && result.items.length === 0) {
		this.emitMessage("You can't find " + result.token.indefiniteArticle() + " " + result.token + " here.");
		return;
	}
	
	if(result.items.length === 0) {
		this.emitMessage("You can't seem to find " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].canBeTaken === true) {
			this.takeObject(result.items[i]);
		}
		else {
			this.emitMessage(result.items[i].shortDescription + ": You can't take THAT!");
		}
	}
};

characterSchema.methods.dropObject = function(object) {
	this.inventory.splice(this.inventory.indexOf(object), 1);
	this.room.addItem(object);
	this.emitMessage("You drop " + object.shortDescription + ".");
	this.emitRoomMessage(this.name + " drops " + object.shortDescription + ".");
};


characterSchema.methods.junkObject = function(object) {
	this.inventory.splice(this.inventory.indexOf(object), 1);
	this.world.removeItem(object);
	this.emitMessage("You junk " + object.shortDescription + ".\n\rYou have been rewarded by the gods!");
	this.emitRoomMessage(this.name + " junk " + object.shortDescription + ".\n\r" + this.name + " has been rewarded by the gods!");
	// TODO: This line of code
	//this.gold = this.gold + (object.value * 0.02);
};

characterSchema.methods.findFromKeywords = function(keyword, list) {
	var result = { };
	result.items = [];

	var item;
	
	if(keyword.indexOf(".") > -1) {
		var tokens = keyword.split(".");
		
		if(tokens[1].length === 0) {
			return null;
		}
		
		if(tokens[0].toLowerCase() === "all") {
			result.mode = 'all.item';
			result.token = tokens[1];
			result.items = list.findItems(tokens[1]);
		}
		else {
			result.mode = 'n.item';
			result.token = tokens[1];
			
			item = list.findItem(parseInt(tokens[0], 10), tokens[1]);

			if(item !== null) {
				result.items.push(item);
			}
		}
	}
	else {
		if(keyword.toLowerCase().trim() === 'all') {
			result.mode = 'all';
			result.token = '';
			result.items = list.findItems('all');
		}
		else {
			result.mode = '1.item';
			result.token = keyword;
			
			item = list.findItem(1, keyword);
			
			if(item !== null) {
				result.items.push(item);
			}
		}
	}
	
	return result;
};

characterSchema.methods.findInventoryFromKeywords = function (keyword) {
	return this.findFromKeywords(keyword, this.inventory);
};

characterSchema.methods.findWearingFromKeywords = function (keyword) {
	return this.findFromKeywords(keyword, this.wearing);
};

characterSchema.methods.dropItem = function(keyword) {
	var result = this.findInventoryFromKeywords(keyword);

	if(result === null) {
		this.emitMessage("Drop what?!?");
		return;
	}
	
	if(result.mode === 'all' && result.items.length === 0) {
		this.emitMessage("You aren't carrying anything!");
		return;
	}
	
	if(result.items.length === 0) {
		this.emitMessage("You don't seem to have " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		this.dropObject(result.items[i]);
	}
};

characterSchema.methods.junkItem = function(keyword) {
	var result = this.findInventoryFromKeywords(keyword);

	if(result === null) {
		this.emitMessage("Junk what?!?");
		return;
	}
	
	if(result.mode === 'all' && result.items.length === 0) {
		this.emitMessage("You aren't carrying anything!");
		return;
	}
	
	if(result.items.length === 0) {
		this.emitMessage("You don't seem to have " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		this.junkObject(result.items[i]);
	}
};

characterSchema.methods.donateObject = function(object) {
	this.inventory.splice(this.inventory.indexOf(object), 1);
	this.emitMessage("You donate " + object.shortDescription + ".\n\rIt vanishes in a puff of smoke!");
	this.emitRoomMessage(this.name + " donates " + object.shortDescription + ".\n\rIt vanishes in a puff of smoke!");
	
	var donationRoom = this.world.getRoom(3063);
	
	if(donationRoom !== null) {
		donationRoom.addItem(object);
		donationRoom.emitMessage(object.shortDescription + " appears in a puff of smoke!");
	}
};

characterSchema.methods.donateItem = function(keyword) {
	var result = this.findInventoryFromKeywords(keyword);

	if(result === null) {
		this.emitMessage("Donate what?!?");
		return;
	}
	
	if(result.mode === 'all' && result.items.length === 0) {
		this.emitMessage("You aren't carrying anything!");
		return;
	}
	
	if(result.items.length === 0) {
		this.emitMessage("You don't seem to have " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}
	
	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].canBeDonated === true) {
			this.donateObject(result.items[i]);
		}
		else {
			this.emitMessage(result.items[i].shortDescription + " can't be donated!");
		}
	}
};

characterSchema.methods.lookAtCharacter = function(target) {
	this.emitMessage("You look at " + target.name + ".");
	this.emitObservedMessage(target, this.name + " looks at " + target.name + ".");
	target.emitMessage(this.name + " looks at you.");
	
	if(target.description !== undefined) {
		this.emitMessage(target.description.trim());
	}
	else if(target.detailedDescription !== undefined) {
		this.emitMessage(target.detailedDescription.trim());
	}
	else {
		this.emitMessage("You see nothing special about " + target.getObjectPronoun() + ".");
	}
	
	for(var i = 0; i < global.MAX_WEARS; i++) {
		if(target.wearing[i] !== null && target.wearing[i] !== undefined) {
			this.emitMessage(global.WEAR_WHERE[i] + target.wearing[i].shortDescription);
		}
	}
	
	this.emitMessage(target.name + " " + target.getDiagnosis());
	
	// TODO: Thief can see in inventory
	this.emitMessage("You attempt to peek into " + target.getPossessivePronoun() + " inventory: ");
	for(var i = 0; i < target.inventory.length; i++) {
		this.emitMessage("  " + target.inventory[i].shortDescription);
	}
	
	this.emitMessage("");
};

characterSchema.methods.lookAtTarget = function(keyword) {
	var target = this.room.getCharacter(keyword);
	
	if(target !== null) {
		this.lookAtCharacter(target);
		return;
	}

	// TODO: Look in direction
	
	target = this.findInventoryFromKeywords(keyword);

	if(target.items.length > 0) {
		target.items[0].showItemToCharacter(this);
		return;
	}
	
	target = this.findWearingFromKeywords(keyword);

	if(target.items.length > 0) {
		target.items[0].showItemToCharacter(this);
		return;
	}

	target = this.room.findRoomContentsFromKeywords(keyword);

	if(target.items.length > 0) {
		target.items[0].showItemToCharacter(this);
		return;
	}

	// TODO: Extras (room and objects)

	this.emitMessage("You do not see that here.");
};

characterSchema.methods.eatObject = function(object, mode) {
	var extractObject = false;
	var amount = 0;
	
	if(mode === global.SCMD_EAT) {
		this.emitMessage("You eat " + object.shortDescription + ".");
		this.emitRoomMessage(this.name + " eats " + object.shortDescription + ".");
		amount = object.hoursOfHunger;
		extractObject = true;
	}
	else if(mode === global.SCMD_TASTE) {
		this.emitMessage("You nibble a little bit of " + object.shortDescription + ".");
		this.emitRoomMessage(this.name + " nibbles a little but of " + object.shortDescription + ".");
		amount = 1;
		
		if(--object.hoursOfHunger <= 0) {
			extractObject = true;
		}
	}
	
	if(!this.isNpc()) {
		this.hunger = this.hunger + amount;
	}

	// TODO: poison
	
	if(extractObject) {
		if(mode === global.SCMD_TASTE) {
			this.emitMessage("There's nothing left of it now.");
		}
		
		this.inventory.splice(this.inventory.indexOf(object), 1);
		this.world.removeItem(object);
	}
};

characterSchema.methods.eatItem = function(keyword, mode) {
	var result = this.findInventoryFromKeywords(keyword);

	if(result === null) {
		this.emitMessage("Eat what?!?");
		return;
	}
	
	if(result.mode === 'all' && result.items.length === 0) {
		this.emitMessage("You aren't carrying anything!");
		return;
	}
	
	if(result.items.length === 0) {
		this.emitMessage("You don't seem to have " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].type !== global.ITEM_FOOD) {
			this.emitMessage(result.items[i].shortDescription + " -- You can't eat THAT!");
		}
		else if(this.hunger > 20) {
			this.emitMessage("You are too full to eat any more!");
			return;
		}
		else {
			this.eatObject(result.items[i], mode);
		}
	}
};

characterSchema.methods.drinkFromObject = function(object, mode) {
	var amount = 0;

	if(mode === global.SCMD_DRINK) {
		this.emitMessage("You drink the " + global.DRINK_NAMES[object.containsLiquid] + ".");
		this.emitRoomMessage(this.name + " drinks " + global.DRINK_NAMES[object.containsLiquid] + " from " + object.shortDescription + ".");
		amount = 8;
	}
	else if(mode === global.SCMD_SIP) {
		this.emitMessage("It tastes like " + global.DRINK_NAMES[object.containsLiquid] + ".");
		this.emitRoomMessage(this.name + " sips from " + object.shortDescription + ".");
		amount = 1;
	}

	object.quantity = Math.max(0, (object.quantity - amount));

	if(!this.isNpc()) {
		this.thirst = this.thirst + amount;

		if(this.thirst > 20) {
			this.emitMessage("You don't feel thirsty anymore.");
		}
	}

	// TODO: poison
	
	
};

characterSchema.methods.drinkItem = function(keyword, mode) {
	var inInventory = true;
	var result = this.findInventoryFromKeywords(keyword);

	if(result.items.length === 0) {
		inInventory = false;
		result = this.room.findRoomContentsFromKeywords(keyword);
	}

	if(result === null) {
		this.emitMessage("Drink what?!?");
		return;
	}
	
	if(result.mode === 'all' && result.items.length === 0) {
		this.emitMessage("You can't drink everything!!!  Are you a fish?");
		return;
	}
	
	if(result.items.length === 0) {
		this.emitMessage("You can't seem to find " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(this.thirst > 20) {
			this.emitMessage("You can't drink any more!!!");
			return;
		}
		if(result.items[i].type !== global.ITEM_DRINKCONTAINER && result.items[i].type !== global.ITEM_FOUNTAIN) {
			this.emitMessage(result.items[i].shortDescription + " -- You can't drink from THAT!");
			break;
		}
		else {
			if(result.items[i].type === global.ITEM_DRINKCONTAINER && !inInventory) {
				this.emitMessage("You have to be holding that to drink from it.");
				break;
			}
			
			if(result.items[i].quantity < 1) {
				this.emitMessage("It's empty!");
				break;
			}
			
			this.drinkFromObject(result.items[i], mode);
		}
	}
};

characterSchema.methods.wearObject = function(object, location) {
	if(location === global.WEAR_FINGER_R && this.wearing[global.WEAR_FINGER_R] !== null) {
		location++;
	}
	
	if(location === global.WEAR_NECK_1 && this.wearing[global.WEAR_NECK_1] !== null) {
		location++;
	}
	
	if(location === global.WEAR_WRIST_R && this.wearing[global.WEAR_WRIST_R] !== null) {
		location++;
	}

	if(this.wearing[location] === null || this.wearing[location] === undefined) {
		this.wearing[location] = object;
		this.inventory.splice(this.inventory.indexOf(object), 1);
		this.wearMessage(object, location);
	}
	else {
		this.alreadyWearing(location);
    }
};

characterSchema.methods.wearItem = function(keyword) {
	var result = this.findInventoryFromKeywords(keyword);

	if(result === null) {
		this.emitMessage("Wear what?!?");
		return;
	}

	if(result.items.length === 0) {
		this.emitMessage("You can't seem to find " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].wearSlots.length === 0) {
			this.emitMessage("You can't wear " + result.items[i].shortDescription + ".");
		}
		else {
			this.wearObject(result.items[i], result.items[i].wearSlots[0]);
		}
	}
};

characterSchema.methods.wearItemAtLocation = function(keyword, location) {
	var result = this.findInventoryFromKeywords(keyword);
	
	if(result === null) {
		this.emitMessage("Wear what?!?");
		return;
	}

	if(result.items.length === 0) {
		this.emitMessage("You can't seem to find " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].wearSlots.indexOf(location) > -1) {
			this.wearObject(result.items[i], location);
		}
	}
};

characterSchema.methods.removeObject = function(object) {
	this.emitMessage("You stop using " + object.shortDescription + ".");
	this.emitRoomMessage(this.name + " stops using " + object.shortDescription + ".");
	
	for(var i = 0; i < this.wearing.length; i++) {
		if(this.wearing[i] === object) {
			this.wearing[i] = null;
			break;
		}
	}
	
	this.inventory.push(object);
};

characterSchema.methods.removeItem = function(keyword) {
	var result = this.findWearingFromKeywords(keyword);
	
	if(result === null) {
		this.emitMessage("Remove what?");
		return;
	}
	
	if(result.length === 0) {
		this.emitMessage("You can't seem to find " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}
	
	for(var i = 0; i < result.items.length; i++) {
		this.removeObject(result.items[i]);
	}
};

characterSchema.methods.alreadyWearing = function(location) {
    switch(location) {
        case 0:
        	this.emitMessage("You're already using a light.");
            break;
        case 1:
        	this.emitMessage("YOU SHOULD NEVER SEE THIS MESSAGE.  PLEASE REPORT.");
            break;
        case 2:
        	this.emitMessage("You're already wearing something on both of your ring fingers.");
            break;
        case 3:
        	this.emitMessage("YOU SHOULD NEVER SEE THIS MESSAGE.  PLEASE REPORT.");
            break;
        case 4:
        	this.emitMessage("You can't wear anything else around your neck.");
            break;
        case 5:
        	this.emitMessage("You're already wearing something on your body.");
            break;
        case 6:
        	this.emitMessage("You're already wearing something on your head.");
            break;
        case 7:
        	this.emitMessage("You're already wearing something on your legs.");
            break;
        case 8:
        	this.emitMessage("You're already wearing something on your feet.");
            break;
        case 9:
        	this.emitMessage("You're already wearing something on your hands.");
            break;
        case 10:
        	this.emitMessage("You're already wearing something on your arms.");
            break;
        case 11:
        	this.emitMessage("You're already using a shield.");
            break;
        case 12:
        	this.emitMessage("You're already wearing something about your body.");
            break;
        case 13:
        	this.emitMessage("You're already wearing something around your waist.");
            break;
        case 14:
        	this.emitMessage("YOU SHOULD NEVER SEE THIS MESSAGE.  PLEASE REPORT.");
            break;
        case 15:
        	this.emitMessage("You're already wearing something around both of your wrists.");
            break;
        case 16:
        	this.emitMessage("You're already wielding a weapon.");
            break;
        case 17:
        	this.emitMessage("You're already holding something.");
            break;
    }
};

characterSchema.methods.wearMessage = function(object, location) {
	switch(location) {
		case 0:
			this.emitMessage("You light " + object.shortDescription + " and hold it.");
			this.emitRoomMessage(this.name + " lights " + object.shortDescription + " and holds it.");
			break;
		case 1:
			this.emitMessage("You slide " + object.shortDescription + " onto your right ring finger.");
			this.emitRoomMessage(this.name + " slides " + object.shortDescription + " onto " + this.getPossessivePronoun() + " right ring finger.");
			break;
		case 2:
			this.emitMessage("You slide " + object.shortDescription + " onto your left ring finger.");
			this.emitRoomMessage(this.name + " slides " + object.shortDescription + " onto " + this.getPossessivePronoun() + " left ring finger.");
			break;
		case 3:
		case 4:
			this.emitMessage("You wear " + object.shortDescription + " around your neck.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " around " + this.getPossessivePronoun() + " neck.");
			break;
		case 5:
			this.emitMessage("You wear " + object.shortDescription + " on your body.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " on " + this.getPossessivePronoun() + " body.");
			break;
		case 6:
			this.emitMessage("You wear " + object.shortDescription + " on your head.");
			this.emitRoomMessage(this.name + " wear " + object.shortDescription + " on " + this.getPossessivePronoun() + " head.");
			break;
		case 7:
			this.emitMessage("You wear " + object.shortDescription + " on your legs.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " on " + this.getPossessivePronoun() + " legs.");
			break;
		case 8:
			this.emitMessage("You wear " + object.shortDescription + " on your feet.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " on " + this.getPossessivePronoun() + " feet.");
			break;
		case 9:
			this.emitMessage("You wear " + object.shortDescription + " on your hands.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " on " + this.getPossessivePronoun() + " hands.");
			break;
		case 10:
			this.emitMessage("You wear " + object.shortDescription + " on your arms.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " on " + this.getPossessivePronoun() + " arms.");
			break;
		case 11:
			this.emitMessage("You start to use " + object.shortDescription + " as a shield.");
			this.emitRoomMessage(this.name + " straps " + object.shortDescription + " around " + this.getPossessivePronoun() + " arm as a shield.");
			break;
		case 12:
			this.emitMessage("You wear " + object.shortDescription + " around your body.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " about " + this.getPossessivePronoun() + " body.");
			break;
		case 13:
			this.emitMessage("You wear " + object.shortDescription + " around your waist.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " around " + this.getPossessivePronoun() + " waist.");
			break;
		case 14:
			this.emitMessage("You wear " + object.shortDescription + " around your right wrist.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " around " + this.getPossessivePronoun() + " right wrist.");
			break;
		case 15:
			this.emitMessage("You wear " + object.shortDescription + " around your left wrist.");
			this.emitRoomMessage(this.name + " wears " + object.shortDescription + " around " + this.getPossessivePronoun() + " left wrist.");
			break;
		case 16:
			this.emitMessage("You wield " + object.shortDescription + ".");
			this.emitRoomMessage(this.name + " wields " + object.shortDescription + ".");
			break;
		case 17:
			this.emitMessage("You grab " + object.shortDescription + ".");
			this.emitRoomMessage(this.name + " grabs " + object.shortDescription + ".");
			break;
	}
};

characterSchema.methods.giveObject = function(object, target) {
	// TODO: Check for number of items, weight, etc
	
	this.emitMessage("You give " + object.shortDescription + " to " + target.name + ".");
	target.emitMessage(this.name + " gives you " + object.shortDescription + ".");
	this.emitObservedMessage(target, this.name + " gives " + object.shortDescription + " to " + target.name + ".");
	
	this.inventory.splice(this.inventory.indexOf(object), 1);
	target.inventory.push(object);
};

characterSchema.methods.giveItem = function(keyword, targetName) {
	var result = this.findInventoryFromKeywords(keyword);

	if(result === null) {
		this.emitMessage("Give what?!?");
		return;
	}
	
	if(result.mode === 'all' && result.items.length === 0) {
		this.emitMessage("You aren't carrying anything!");
		return;
	}
	
	if(result.items.length === 0) {
		this.emitMessage("You don't seem to have " + result.token.indefiniteArticle() + " " + result.token + ".");
		return;
	}

	var target = this.world.getCharacter(targetName);
	
	if(target === null) {
		this.emitMessage("No-one by that name here.");
		return;
	}
	
	if(target === this) {
		this.emitMessage("Give something to yourself?!?");
		return;
	}

	for(var i = 0; i < result.items.length; i++) {
		this.giveObject(result.items[i], target);
	}
};

characterSchema.methods.getDiagnosis = function() {
	var diagnosis = [];
	
	diagnosis[0] = { percent: 100, description: "is in excellent condition." };
	diagnosis[1] = { percent: 90, description: "has a few scratches." };
	diagnosis[2] = { percent: 75, description: "has some small wounds and bruises." };
	diagnosis[3] = { percent: 50, description: "has quite a few wounds." };
	diagnosis[4] = { percent: 30, description: "has some big nasty wounds and scratches." };
	diagnosis[5] = { percent: 15, description: "looks pretty hurt." };
	diagnosis[6] = { percent: 0, description: "is in awful condition." };
	diagnosis[7] = { percent: -1, description: "is bleeding awfully from big wounds." };
	
	var percent = -1;
	var index = 0;
	
	if(this.maximumHitpoints > 0) {
		percent = (100 * this.hitpoints) / this.maximumHitpoints;
	}

	for(index = 0; index < diagnosis.length; index++) {
		if(percent >= diagnosis[index].percent) {
			break;
		}
	}
	
	return diagnosis[index].description;
};

characterSchema.methods.stopFighting = function() {
	this.fighting = null;
	this.position = global.POS_STANDING;
};

characterSchema.methods.updatePosition = function() {
	if(this.hitpoints > 0 && this.position > global.POS_STUNNED) {
		return;
	}
	else if(this.hitpoints > 0) {
		this.position = global.POS_STANDING;
	}
	else if(this.hitpoints < -11) {
		this.position = global.POS_DEAD;
	}
	else if(this.hitpoints < -6) {
		this.position = global.POS_MORTALLYW;
	}
	else if(this.hitpoints < -3) {
		this.position = global.POS_INCAP;
	}
	else {
		this.position = global.POS_STUNNED;
	}
};

characterSchema.methods.getArmorClass = function() {
	// TODO: AC_APPLY stuff
	// TODO: Dex Apply
	
	var armorClass = 100;
	
	// -100 is the best
	return Math.max(-100, armorClass);
};

characterSchema.methods.performViolence = function() {
	if(this.fighting === null || this.fighting === undefined) {
		this.stopFighting();
		return;
	}
	
	if(this.room !== this.fighting.room) {
		this.stopFighting();
		return;
	}
	
	// TODO: Find weapon type
	
	var diceRoll = utility.randomNumber(1, 20);
	mudlog.info(this.name + " is fighting " + this.fighting.name + " / diceRoll=" + diceRoll);
	
	// Decide whether this is a hit or a miss. 
	// Victim asleep = hit, otherwise:
	//   1   = Automatic miss
	// 2..19 = Checked vs. AC
	//  20   = Automatic hit

	var result = false;

	if(diceRoll === 20 || this.fighting.isAwake() === false) {
		result = true;
	}
	else if(diceRoll === 1) {
		result = false;
	}
	else {
		if(this.calcThac0() - diceRoll <= this.fighting.getArmorClass()) {
			result = true;
		}
	}
	
	if(result === false) {
		this.damageMessage(this.fighting, 0, 0);
	}
	else {
		// TODO: strength apply, damroll apply
		// TODO: add weapon damage
		
		// For now, assume barehand damage
		var damageAmount = this.getBareHandDamage();
		

		// Include a damage multiplier if victim isn't ready to fight:
		// Position sitting  1.33 x normal
		// Position resting  1.66 x normal
		// Position sleeping 2.00 x normal
		// Position stunned  2.33 x normal
		// Position incap    2.66 x normal
		// Position mortally 3.00 x normal
		if(this.fighting.position < global.POS_FIGHTING) {
			damageAmount = damageAmount * 1 + ((global.POS_FIGHTING - this.fighting.position) / 3);
		}
		
		// At least 1 damage
		damageAmount = Math.max(1, damageAmount);
		
		// TODO: Backstab
		this.damage(this.fighting, damageAmount, 0);
	}
};

characterSchema.methods.attack = function(target) {
	mudlog.info(this.name + " has attacked " + target.name);
	this.fighting = target;
	this.position = global.POS_FIGHTING;
	this.performViolence();
};

characterSchema.methods.hit = function(targetName) {
	var target = this.room.getCharacter(targetName);

	if(target === null) {
		this.emitMessage("The target of your violence outburst seems to have left.");
		return;
	}

	if(target === this) {
		this.emitMessage("You hit yourself.  OUCH!");
		return;
	}
	
	if(this.room.isPeaceful === true) {
		this.emitMessage("Your urge to commit violence subsides and is replaced by a peaceful feeling.");
		return;
	}
	
	// TODO: A few other checks
	
	this.attack(target);
};

// < 0	Victim died
// = 0	No damage
// > 0	How much damage done
characterSchema.methods.damage = function(target, damageAmount, attackType) {
	if(target.position <= global.POS_DEAD) {
		return -1;
	}

	if(this.room.isPeaceful) {
		this.emitMessage("This room just has such a peaceful, easy feeling...\r\n");
		return 0;
	}
	
	// TODO: Shopkeeper protection
	
	// TODO: Immortal damage protection
	
	// TODO: More stuff
	
	// Set the maximum damage per round and subtract the hit points
	var actualDamage = Math.max(Math.min(damageAmount, 100), 0);
	target.hitpoints = target.hitpoints - actualDamage;

	// Gain exp for the hit
	this.experience = this.experience + (target.level * actualDamage);
	
	target.updatePosition();
	
	this.damageMessage(target, actualDamage, attackType);

	switch(target.position) {
		case global.POS_MORTALLYW:
			this.emitMessage(target.name + " is mortally wounded and will die soon if not aided.");
			this.emitObservedMessage(target, target.name + " is mortally wounded and will die soon if not aided.");
			target.emitMessage("You are mortally wounded and will die soon if not aided.");
			break;
		case global.POS_DEAD:
			this.emitMessage(target.name + " is dead!  R.I.P.");
			this.emitObservedMessage(target, target.name + " is dead!  R.I.P.");
			target.emitMessage("You are dead!  Sorry....");
			break;
		default:
			// TODO: Lots
	}
	
	
	return damageAmount;
};

characterSchema.methods.die = function() {
	this.emitMessage("Everything fades to black....");
	this.emitMessage(".... You have died. RIP!\n\r");
	
	for(var i = 0; i < this.world.people; i++) {
		if(this.world.people[i].fighting === this) {
			this.world.people[i].fighting = null;
		}
	}

	this.performDeathCry();
	this.toCorpse();
	this.room.removeCharacter(this);
	this.world.removeCharacter(this);
	
	if(this.isNpc() === false) {
		if(this.socket !== undefined) {
			this.socket.connectionState = global.CON_MENU;
			this.setPrompt("> ");
			this.emitMessage(text.Menu);
		}
	}
};

characterSchema.methods.performDeathCry = function() {
	this.emitRoomMessage("Your blood freezes as you hear " + this.name + "'s death cry.\n\r");
	
	var adjacentRooms = this.room.getAdjacentRooms();
	
	for(var i = 0; i < adjacentRooms.length; i++) {
		adjacentRooms[i].emitMessage("Your blood freezes as you hear someone's death cry.\n\r");
	}
};

characterSchema.methods.toCorpse = function() {
	var corpse = new item.item({
		id: -1,
		shortDescription: "the corpse of " + this.name,
		longDescription: "The corpse of " + this.name + " lays here in a pool of blood.",
		type: global.ITEM_CORPSE
	});
	
	corpse.keywords.push("corpse");
	corpse.keywords.push(this.name);
	
	while(this.inventory.length > 0) {
	 	var inventoryItem = this.inventory.pop();
	 	
	 	if(inventoryItem !== null) {
	 		if(inventoryItem !== undefined) {
	 			corpse.contents.push(inventoryItem);
	 		}
	 	}
	}
	
	while(this.wearing.length > 0) {
		var wornItem = this.wearing.pop();
		
		if(wornItem !== null) {
			if(wornItem !== undefined) {
				corpse.contents.push(wornItem);
			}
		}
	}
	
	this.world.addItem(corpse);
	this.room.addItem(corpse);
};

characterSchema.methods.damageMessage = function(target, actualDamage, attackType) {
	var messageIndex = 0;
	
	if(actualDamage === 0) {
		messageIndex = 0;
	}
	else if(actualDamage <= 2) {
		messageIndex = 1;
	}
	else if(actualDamage <= 4) {
		messageIndex = 2;
	}
	else if(actualDamage <= 6) {
		messageIndex = 3;
	}
	else if(actualDamage <= 10) {
		messageIndex = 4;
	}
	else if(actualDamage <= 14) {
		messageIndex = 5;
	}
	else if(actualDamage <= 19) {
		messageIndex = 6;
	}
	else if(actualDamage <= 23) {
		messageIndex = 7;
	}
	else {
		messageIndex = 8;
	}
	
	switch(messageIndex) {
		case 0:
			this.emitMessage("You try to hit " + target.name + ", but miss.", "Orange");
			target.emitMessage(this.name + " tries to hit you, but misses.", "Red");
			this.emitObservedMessage(target, this.name + " tries to hit " + target.Name + ", but misses.");
			break;
		case 1:
			this.emitMessage("You tickle " + target.name + " as you hit " + target.getObjectPronoun() + ".", "Orange");
			target.emitMessage(this.name + " tickles you as " + this.getPersonalPronoun() + " hits you.", "Red");
			this.emitObservedMessage(target, this.name + " tickles " + target.Name + " as " + this.getPersonalPronoun() + " hits " + target.getObjectPronoun() + ".");
			break;
		case 2:
			this.emitMessage("You barely hit " + target.name + ".", "Orange");
			target.emitMessage(this.name + " barely hits you.", "Red");
			this.emitObservedMessage(target, this.name + " barely hits " + target.Name + ".");
			break;
		case 3:
			this.emitMessage("You hit " + target.name + ".", "Orange");
			target.emitMessage(this.name + " hits you.", "Red");
			this.emitObservedMessage(target, this.name + " hits " + target.Name + ".");
			break;
		case 4:
			this.emitMessage("You hit " + target.name + " hard.", "Orange");
			target.emitMessage(this.name + " hits you hard.", "Red");
			this.emitObservedMessage(target, this.name + " hits " + target.Name + " hard.");
			break;
		case 5:
			this.emitMessage("You hit " + target.name + " very hard.", "Orange");
			target.emitMessage(this.name + " hits you very hard.", "Red");
			this.emitObservedMessage(target, this.name + " hits " + target.Name + " very hard.");
			break;
		case 6:
			this.emitMessage("You hit " + target.name + " extremely hard.", "Orange");
			target.emitMessage(this.name + " hits you extremely hard.", "Red");
			this.emitObservedMessage(target, this.name + " hits " + target.Name + " extremely hard.");
			break;
		case 7:
			this.emitMessage("You massacre " + target.name + " into small fragments with your hit.", "Orange");
			target.emitMessage(this.name + " massacres you into small fragments with " + this.getPossessivePronoun() + " hit.", "Red");
			this.emitObservedMessage(target, this.name + " massacres " + target.Name + " into small fragments with " + this.getPossessivePronoun() + " hit.");
			break;
		case 8:
			this.emitMessage("You OBLITERATE " + target.name + " with your deadly hit!!", "Orange");
			target.emitMessage(this.name + " OBLITERATES you with " + this.getPossessivePronoun() + " deadly hit!!", "Red");
			this.emitObservedMessage(target, this.name + " OBLITERATES " + target.Name + " with " + this.getPossessivePronoun() + " deadly hit!!");
			break;
	}
};


var characterModel = mongoose.model('character', characterSchema);

module.exports = {
	schema: characterSchema,
	character: characterModel,
};


