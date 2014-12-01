// var Character = require("./character");
// var util = require("util");

// // Object constructor
// function Player(name) {
// 	Player.super_.call(this);
// 	this.name = name;
// }

// util.inherits(Player, Character);

// Player.prototype.getType = function() {
// 	return "player";
// };

// Player.prototype.start = function() {
// 	this.level = 1;
// 	this.experience = 1;
	
// 	this.maximumHitpoints = 10;
// 	this.maximumManapoints = 100;
// 	this.maximumMovepoints = 82;
	
// 	this.practiceSessions = 0;
	
// 	this.hunger = 24;
// 	this.thirst = 24;
// 	this.drunk = 0;
// };




var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var character = require("./character").character;
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

playerSchema.methods.load = function(name, callback) {
	mongoose.connect('mongodb://localhost/circledb');
	playerModel.find({ name: name}, function(err, docs) {
		console.log(docs.length);
		callback(docs);
		mongoose.connection.close();
	});
};

playerSchema.methods.start = function() {
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

var playerModel = mongoose.model('player', playerSchema);

// Constants
exports.CLASS_UNDEFINED	  = -1;
exports.CLASS_MAGIC_USER  = 0;
exports.CLASS_CLERIC      = 1;
exports.CLASS_THIEF       = 2;
exports.CLASS_WARRIOR     = 3;

// // Exports
// module.exports = Player;



module.exports = {
	schema: playerSchema,
	player: playerModel
	//player: playerModel
};

// exports.getPlayer = function getPlayer(playerName, callback) {
// 	mongoose.connect('mongodb://localhost/circledb');
// 	playerModel.find({ name: playerName}, function(err, docs) {
// 		console.log(docs.length);
// 		callback(docs);
// 		mongoose.connection.close();
// 	});
// };
