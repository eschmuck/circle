var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var character = require("./character");
var characterSchema = require("./character").schema;

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

playerSchema.methods.blah = function() {
	return 'override blah';
};

playerSchema.methods.isNpc = function() {
	return false;
};

playerSchema.methods.listInventory = function() {
	this.emitMessage("You are carrying:");
	
	if(this.inventory.length === 0) {
		this.emitMessage("  Absolutely nothing!!!");
	}
	else {
		for(var i = 0; i < this.inventory.length; i++) {
			this.emitMessage("  " + this.inventory[i].shortDescription, "Green");
		}
	}
};
	
// TODO: change to 'statics'?
playerSchema.methods.load = function(name, callback) {
	playerModel.find({ name: name }, function(err, docs) {
		callback(docs);
	});
};

playerSchema.methods.start = function() {
	this.level = 1;
	this.experience = 1;
	
	this.maximumHitpoints = 10;
	this.maximumManapoints = 100;
	this.maximumMovepoints = 82;
	
	this.hitpoints = this.maximumHitpoints;
	this.manapoints = this.maximumManapoints;
	this.movepoints = this.maximumMovepoints;
	
	this.practiceSessions = 0;
	
	this.hunger = 24;
	this.thirst = 24;
	this.drunk = 0;
};

playerSchema.methods.enterGame = function() {
	this.position = character.POS_STANDING;
};

playerSchema.methods.getDescription = function() {
	var positions = [
	    ' is lying here, dead.',
	    ' is lying here, mortally wounded.',
	    ' is lying here, incapacitated.',
	    ' is lying here, stunned.',
	    ' is sleeping here.',
	    ' is resting here.',
	    ' is sitting here.',
	    '!FIGHTING!',
	    ' is standing here.'
	];
	
	var description = this.name + " " + this.title;
	
	if(this.position !== character.POS_FIGHTING) {
		description = description + positions[this.position];
	}
	
	// TODO: More (affections, etc)
	
	return description;
};


playerSchema.methods.listScore = function() {
	this.emitMessage("This ranks you as " + this.name + " " + this.title + " (level " + this.level + ")");
	
	if(this.hunger === 0) {
		this.emitMessage("You are hungry.");
	}
};

playerSchema.methods.hourlyUpdate = function() {
	if(this.hunger > -1) {
		this.hunger = Math.max((this.hunger - 1), 0);
	}
	
	if(this.hunger === 0) {
		this.emitMessage("You are hungry.");
		this.emitRoomMessage(this.name + "'s stomach growls loudly.");
	}
	
	if(this.thirst > -1) {
		this.thirst = Math.max((this.thirst - 1), 0);
	}
	
	if(this.thirst === 0) {
		this.emitMessage("You are thirsty.");
	}
	
	if(this.drunk > 0) {
		this.drunk = Math.max((this.drunk - 1), 0);
		
		if(this.drunk === 0) {
			this.emitMessage("You are now sober.");
		}
	}
};

var playerModel = mongoose.model('player', playerSchema);

// Constants
exports.CLASS_UNDEFINED	  = -1;
exports.CLASS_MAGIC_USER  = 0;
exports.CLASS_CLERIC      = 1;
exports.CLASS_THIEF       = 2;
exports.CLASS_WARRIOR     = 3;


module.exports = {
	schema: playerSchema,
	player: playerModel
};

