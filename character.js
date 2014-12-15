var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var Social =  require("./social");
var util = require('util');

var directions = [ 'north', 'east', 'south', 'west', 'up', 'down' ];

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
	
	position: Number
});

characterSchema.methods.getPersonalPronoun = function() {
	switch(this.gender) {
		case GENDER_NEUTRAL:
			return "it";
		case GENDER_MALE:
			return "he";
		case GENDER_FEMALE:
			return "she";
	}
};

characterSchema.methods.getObjectPronoun = function() {
	switch(this.gender) {
		case GENDER_NEUTRAL:
			return "it";
		case GENDER_MALE:
			return "him";
		case GENDER_FEMALE:
			return "her";
	}
};

characterSchema.methods.getPossessivePronoun = function() {
	switch(this.gender) {
		case GENDER_NEUTRAL:
			return "its";
		case GENDER_MALE:
			return "his";
		case GENDER_FEMALE:
			return "her";
	}
};


characterSchema.methods.blah = function() {
	return 'blah';
};

characterSchema.methods.getDescription = function() {
	// Implementation overriden by child schemas	
};

characterSchema.methods.isNpc = function() {
	// Implementation overriden by child schemas	
	return false;
};

characterSchema.methods.emitMessage = function(message, color) {
	if(this.socket !== undefined) {
		if(color !== undefined) {
			this.socket.emit('message', { message: message, color: color });
		}
		else {
			this.socket.emit('message', { message: message });
		}
	}
};

characterSchema.methods.emitRoomMessage = function(message, color) {
	for(var i = 0; i < this.room.people.length; i++) {
		if(this.room.people[i] !== this) {
			if(!this.room.people[i].isNpc()) {
				this.room.people[i].emitMessage(message);
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

characterSchema.methods.canTellTarget = function(target) {
	if(this === target) {
		this.emitMessage("You try to tell yourself something.  Did it work?");
	}
	//else if(this.isNoTell) {
	// 	this.emitMessage("You cannot tell other people while you have notell on.");
	// }
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

characterSchema.methods.stand = function() {
	switch(this.position) {
		case POS_STANDING:
			this.emitMessage("You are already standing.");
			break;
		case POS_SITTING:
			this.emitMessage("You stand up.");
			this.emitRoomMessage(this.name + " clambers to " + this.getPossessivePronoun() + " feet.");
			this.position = POS_STANDING;
			break;
        case POS_RESTING:
            this.emitMessage("You stop resting, and stand up.");
			this.emitRoomMessage(this.name + ' stops resting, and clambers on ' + this.getPossessivePronoun() + ' feet.');
            this.position = POS_STANDING;
            break;
        case POS_SLEEPING:
            this.emitMessage("You have to wake up first!");
            break;
        case POS_FIGHTING:
            this.emitMessage("Do you not consider fighting as standing?");
            break;
        default:
            this.emitMessage("You stop floating around, and put your feet on the ground.");
            this.emitRoomMessage(this.name + " stops floating around and puts " + this.getPossessivePronoun() + ' feet on the ground.');
            this.position = POS_STANDING;
            break;
	}
};

characterSchema.methods.sit = function() {
	switch(this.position) {
		case POS_STANDING:
			this.emitMessage("You sit down.");
			this.emitRoomMessage(this.name + " sits down.");
			this.position = POS_SITTING;
			break;
		case POS_SITTING:
			this.emitMessage("You're sitting already.");
			break;
        case POS_RESTING:
            this.emitMessage("You stop resting, and sit up.");
            this.emitRoomMessage(this.name + ' stops resting.');
            this.position = POS_SITTING;
            break;
        case POS_SLEEPING:
            this.emitMessage("You have to wake up first.");
            break;
        case POS_FIGHTING:
            this.emitMessage('Sit down while fighting? Are you MAD?');
            break;
        default:
            this.emitMessage('You stop floating around, and sit down.');
            this.emitRoomMessage(this.name + ' stops floating around, and sit down.');
            this.position = POS_SITTING;
            break;
	}
};

characterSchema.methods.sleep = function() {
	switch(this.position) {
        case POS_STANDING:
            this.emitMessage('You sit down and rest your tired bones.');
            this.emitRoomMessage(this.name + ' sits down and rests.');
            this.position = POS_RESTING;
            break;
        case POS_SITTING:
            this.emitMessage('You rest your tired bones.');
            this.emitRoomMessage(this.name + ' rests.');
            this.position = POS_RESTING;
            break;
        case POS_RESTING:
		    this.emitMessage('You are already resting.');
		    break;
        case POS_SLEEPING:
            this.emitMessage('You have to wake up first.');
            break;
        case POS_FIGHTING:
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
	    case POS_STANDING:
	    case POS_SITTING:
	    case POS_RESTING:
	        this.emitMessage('You go to sleep.');
	        this.emitRoomMessage(this.name + ' lies down and falls asleep.');
	        this.position = POS_SLEEPING;
	        break;
        case POS_SLEEPING:
            this.emitMessage('You are already sound asleep.');
            break;
        case POS_FIGHTING:
            this.emitMessage('Sleep while fighting? Are you MAD?');
            break;
        default:
            this.emitMessage('You stop floating around, and lie down to sleep.');
            this.emitRoomMessage(this.name + ' stops floating around, and lie down to sleep.');
            this.position = POS_SLEEPING;
            break;
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
		 	this.emitMessage("The " + exit.doorKeywords[0] + " seems to be closed.");
		}
		else {
		 	var newRoom = this.world.getRoom(exit.toRoomId);
		 	
		 	if(newRoom !== null) {
			 	this.emitRoomMessage(this.name + " leaves " + directions[direction] + ".");
			 	this.room.removeCharacter(this);
		 		
			 	newRoom.addCharacter(this);
			 	this.emitRoomMessage(this.name + " has arrived.");
				
			 	newRoom.showRoomToCharacter(this);
		 	}
		 	else {
		 		this.emitMessage("Although you should be able to go there, you cannot!");
		 	}
		}
	}
};


var characterModel = mongoose.model('character', characterSchema);

// Constants
var GENDER_NEUTRAL = 0;
var GENDER_MALE    = 1;
var GENDER_FEMALE  = 2;

var POS_DEAD       = 0;
var POS_MORTALLYW  = 1;
var POS_INCAP      = 2;
var POS_STUNNED    = 3;
var POS_SLEEPING   = 4;
var POS_RESTING    = 5;
var POS_SITTING    = 6;
var POS_FIGHTING   = 7;
var POS_STANDING   = 8;

module.exports = {
	schema: characterSchema,
	character: characterModel,
	
	GENDER_NEUTRAL: GENDER_NEUTRAL,
	GENDER_MALE:    GENDER_MALE,
	GENDER_FEMALE:  GENDER_FEMALE,
	
	POS_DEAD:      POS_DEAD,
	POS_MORTALLYW: POS_MORTALLYW,
	POS_INCAP:     POS_INCAP,
	POS_STUNNED:   POS_STUNNED,
	POS_SLEEPING:  POS_SLEEPING,
	POS_RESTING:   POS_RESTING,
	POS_SITTING:   POS_SITTING,
	POS_FIGHTING:  POS_FIGHTING,
	POS_STANDING:  POS_STANDING
};


