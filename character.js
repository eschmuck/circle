var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');

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

characterSchema.methods.blah = function() {
	return 'blah';
};

characterSchema.methods.say = function(message) {
	console.log(message);
	if(message.length < 1) {
		if(this.socket !== undefined) {
			this.socket.emit('message', { message: "Yes, but WHAT do you want to say?" });
		}
	}
	else {
		if(this.socket !== undefined) {
			this.socket.emit('message', { message: "You say, '" + message + "'" });
		}
		
		for(var i = 0; i < this.room.people.length; i++) {
			if(this.room.people[i] != this) {
				if(this.room.people[i].socket !== undefined) {
					this.room.people[i].socket.emit('message', { message: this.name + " says, '" + message + "'" });
				}
			}
		}
	}
};

var characterModel = mongoose.model('character', characterSchema);

// Constants
exports.GENDER_NEUTRAL = 0;
exports.GENDER_MALE    = 1;
exports.GENDER_FEMALE  = 2;

exports.POS_DEAD       = 0;
exports.POS_MORTALLYW  = 1;
exports.POS_INCAP      = 2;
exports.POS_STUNNED    = 3;
exports.POS_SLEEPING   = 4;
exports.POS_RESTING    = 5;
exports.POS_SITTING    = 6;
exports.POS_FIGHTING   = 7;
exports.POS_STANDING   = 8;

module.exports = {
	schema: characterSchema,
	character: characterModel
};


