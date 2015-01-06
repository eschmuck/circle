var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var character = require("./character");
var characterSchema = require("./character").schema;
var utility = require("./utility");

var mobSchema = characterSchema.extend({
    id: Number,
    keywords: [ String ],
	longDescription: String,
	detailedDescription: String,
	thac0: Number,
	armorClass: Number,
	hitpointFormula: String,
	damRollFormula: String,
	isSentinel: Boolean,
	isScavenger: Boolean
});

mobSchema.statics.load = function(id, mob, callback, commands, world, instructionNumber) {
 	this.find({ id: id }, function(err, docs) {
 		callback(docs, mob, commands, world, instructionNumber);
 	});
};

mobSchema.methods.hourlyUpdate = function() {

};

mobSchema.methods.performActivity = function() {
	if(this.isScavenger === true) {
		if(utility.randomNumber(1, 10) <= 10) {
			if(this.room.contents.length > 0) {
				var itemToScavenge = this.room.contents[utility.randomNumber(1, this.room.contents.length)];
				this.takeObject(itemToScavenge);
				this.say("Ooh! I've been looking for one of these!");
			}
		}
	}
};

mobSchema.methods.isNpc = function() {
	return true;
};

var mobModel = mongoose.model('mob', mobSchema);

module.exports = {
	schema: mobSchema,
	mob: mobModel
};

