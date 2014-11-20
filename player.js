var Character = require("./character");
var util = require("util");

// Object constructor
function Player(name) {
	Player.super_.call(this);
	this.name = name;
}

util.inherits(Player, Character);

Player.prototype.getType = function() {
	return "player";
};

Player.prototype.start = function() {
	this.level = 1;
	this.experience = 1;
	
	this.maximumHitpoints = 10;
	this.maximumManapoints = 100;
	this.maximumMovepoints = 82;
	
	this.practiceSessions = 0;
	
	this.hunger = 24;
	this.thirst = 24;
	this.drunk = 0;
};


Player.prototype.password;

Player.prototype.practiceSessions;

Player.prototype.hunger;
Player.prototype.thirst;
Player.prototype.drunk;

Player.prototype.title;
Player.prototype.class;

// Constants
exports.CLASS_UNDEFINED	  = -1;
exports.CLASS_MAGIC_USER  = 0;
exports.CLASS_CLERIC      = 1;
exports.CLASS_THIEF       = 2;
exports.CLASS_WARRIOR     = 3;

// Exports
module.exports = Player;
