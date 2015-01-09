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
	if(this.specialBehavior !== undefined) {
		var result = this.specialBehavior(this);
		
		if(result === true) {
			return;
		}
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
		if(this.position === global.POS_STANDING) {
			var random = utility.randomNumber(0, 18);
			
			if(random <= 10) {
				this.move(random);
				return;
			}
		}
	}
};

mobSchema.methods.isNpc = function() {
	return true;
};

mobSchema.methods.getThac0 = function() {
	var calcThac0 = 20;
		
	// TODO: str apply
	// TODO: hitroll apply
	
	calcThac0 = calcThac0 - Math.round((this.intelligence - 13) / 1.5);
	calcThac0 = calcThac0 - Math.round((this.wisdom - 13) / 1.5);
	
	return calcThac0;
};

mobSchema.methods.getBareHandDamage = function() {
	// Format = XdY+Z
	
	var firstPiece = this.damRollFormula.split("d");
	var secondPiece = firstPiece[1].split("+");
	
	var numberOfDice = firstPiece[0];
	var sizeOfDice = secondPiece[0];
	var damageBonus = secondPiece[1];
	
	var damage = 0;
	
	for(var i = 0; i < numberOfDice; i++) {
		damage = damage + utility.randomNumber(1, sizeOfDice);
	}
	
	damage = damage + damageBonus;
	
	return damage;	
};

var mobModel = mongoose.model('mob', mobSchema);

function janitorBehavior(character) {
	var tookItem = false;
	
	var items = character.room.contents;
	
	for(var i = 0; i < items.length; i++)	{
		var item = character.room.contents[i];
		
		if(item.canBeTaken === true) {
			character.takeObject(item);
			tookItem = true;
		}
	}

	if(tookItem === true) {
		character.say("Damn kids... always leaving their junk around... crappy job...\n\r");
	}
	
	return tookItem;
}

function fidoBehavior(character) {
	for(var i = 0; i < character.room.contents; i++) {
		if(character.room.contents[i].isCorpse()) {
			character.world.removeItem(character.room.contents[i]);
			character.emitRoomMessage(character.name + " savagely devours a corpse.\n\r");
			return true;
		}
	}
	
	return false;
}

module.exports = {
	schema: mobSchema,
	mob: mobModel,
	
	janitorBehavior: janitorBehavior,
	fidoBehavior: fidoBehavior
};








// var blahBehavior = "AAA";

// exports.blahBehavior = blahBehavior;



// exports.janitorBehavior = janitorBehavior;

