// // Object constructor
// function Character() {
// 	this.inventory = [];
// 	this.fighting = null;
// 	this.room = null;
// }

// // Public Properties
// Character.prototype.name;
// Character.prototype.gender;

// Character.prototype.hitpoints;
// Character.prototype.maximumHitpoints;
// Character.prototype.manapoints;
// Character.prototype.maximumManapoints;
// Character.prototype.movepoints;
// Character.prototype.maximumMovepoints;

// Character.prototype.gold;
// Character.prototype.experience;
// Character.prototype.level;

// Character.prototype.position;



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

var playerSchema = characterSchema.extend({
	password: String,
	practiceSessions: Number,
	hunger: Number,
	thirst: Number,
	drunk: Number,
	title: String,
	class: Number
});

playerSchema.methods.meh = function() {
	return 'meh';
};

var characterModel = mongoose.model('character', characterSchema);


var playerModel = mongoose.model('player', playerSchema);


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


// // Exports
// module.exports = Character;


// module.exports = characterSchema;
//module.exports = characterModel;

//module.exports = playerModel;

module.exports = {
	character: characterModel,
	player: playerModel
};


