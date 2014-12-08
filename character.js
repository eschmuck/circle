var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var Social =  require("./social");

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
		if(this.room.people[i] != this) {
			this.room.people[i].emitMessage(message);
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
		// TODO: Finish
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
	}

	// TODO: Finish

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


