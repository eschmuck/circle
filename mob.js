var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var character = require("./character");
var characterSchema = require("./character").schema;
var utility = require("./utility");
var mudlog = require("./mudlog");

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
	mudlog.info("Performing mob random activity on " + this.id);

	//console.log(this.specialBehavior);
	
	if(this.id === 3061) {
		console.log(this);
	}
	
	if(this.specialBehavior !== undefined) {
		console.log(this.specialBehavior);
		
		this.specialBehavior(this);
	}
	
	// if(this.isScavenger === true) {
	// 	if(utility.randomNumber(1, 10) <= 10) {
	// 		if(this.room.contents.length > 0) {
	// 			var itemToScavenge = this.room.contents[utility.randomNumber(1, this.room.contents.length)];
	// 			this.takeObject(itemToScavenge);
	// 			mudlog.info(this.id + " scavenged " + itemToScavenge.id + ".");
	// 		}
	// 	}
	// }
	
	if(this.isSentinel !== true) {
		var random = utility.randomNumber(0, 18);
		
		if(random <= 10) {
			this.move(random);
			return;
		}
	}
};



mobSchema.methods.isNpc = function() {
	return true;
};

var mobModel = mongoose.model('mob', mobSchema);



function janitorBehavior(character) {
	console.log('janitor spec proc');
}

module.exports = {
	schema: mobSchema,
	mob: mobModel,
	
	blahBehavior: "AAA",
	janitorBehavior: janitorBehavior
};








// var blahBehavior = "AAA";

// exports.blahBehavior = blahBehavior;



// exports.janitorBehavior = janitorBehavior;

