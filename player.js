var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var item = require("./item");
var character = require("./character");
var characterSchema = require("./character").schema;
var utility = require("./utility");
var constants = require("./constants");

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

playerSchema.methods.listEquipment = function() {
	this.emitMessage("You are using: ");
	
	var found = false;
	
	for(var i = 0; i < global.MAX_WEARS; i++) {
		if(this.wearing[i] !== null && this.wearing[i] !== undefined) {
			this.emitMessage(global.WEAR_WHERE[i] + this.wearing[i].shortDescription);
			found = true;
		}
	}
	
	if(found === false) {
		this.emitMessage("  Absolutely nothing!!!");
	}
};
	
// TODO: change to 'statics'?
playerSchema.methods.load = function(name, callback) {
	playerModel.find({ name: name }, function(err, docs) {
		callback(docs);
	});
};

playerSchema.methods.rollRealAbilities = function() {
	var table = [6];
	var rolls = [4];

	for(var i = 0; i < 6; i++) {
	    for(var j = 0 ; j < 4; j++) {
	            rolls[j] = utility.randomNumber(1, 6);
	        }
	
	    table[i] = rolls[0] + rolls[1] + rolls[2] + rolls[3] -
	        Math.min(rolls[0], Math.min(rolls[1], Math.min(rolls[2], rolls[3])));
	}
	
	table.sort(function(a, b) { return b - a; } );
	
	this.strengthAdd = 0;
	
	switch(this.class) {
	    case global.CLASS_MAGIC_USER:
	        this.intelligence = table[0];
	        this.wisdom = table[1];
	        this.dexterity = table[2];
	        this.strength = table[3];
	        this.constitution = table[4];
	        this.charisma = table[5];
	        break;
	    case global.CLASS_CLERIC:
	        this.wisdom = table[0];
	        this.intelligence = table[1];
	        this.strength = table[2];
	        this.dexterity = table[3];
	        this.constitution = table[4];
	        this.charisma = table[5];
	        break;
	    case global.CLASS_THIEF:
	        this.dexterity = table[0];
	        this.strength = table[1];
	        this.constitution = table[2];
	        this.intelligence = table[3];
	        this.wisdom = table[4];
	        this.charisma = table[5];
	        break;
	    case global.CLASS_WARRIOR:
	        this.strength = table[0];
	        this.dexterity = table[1];
	        this.constitution = table[2];
	        this.wisdom = table[3];
	        this.intelligence = table[4];
	        this.charisma = table[5];
	
	        if(this.strength === 18) {
	        	this.strengthAdd = utility.randomNumber(0, 100);
            }
	        break;
	}
};

playerSchema.methods.advanceLevel = function() {
    var addHitpoints = global.constitutionApply[this.constitution][global.constitutionApplyType_Hitpoints];
    var addManapoints = 0;
    var addMovePoints = 0;

    switch(this.class) {
            case global.CLASS_MAGIC_USER:
                addHitpoints += utility.randomNumber(3, 8);
                addManapoints = utility.randomNumber(this.level, 1.5 * this.level);
                addMovePoints = utility.randomNumber(0, 2);
                break;
            case global.CLASS_CLERIC:
                addHitpoints += utility.randomNumber(5, 10);
                addManapoints = utility.randomNumber(this.level, 1.5 * this.level);
                addMovePoints = utility.randomNumber(0, 2);
                break;
            case global.CLASS_THIEF:
                addHitpoints += utility.randomNumber(7, 13);
                addMovePoints = utility.randomNumber(1, 3);
                break;
            case global.CLASS_WARRIOR:
                addHitpoints += utility.randomNumber(10, 15);
                addMovePoints = utility.randomNumber(1, 3);
                break;
        }

    this.maximumHitpoints += Math.max(1, addHitpoints);
    this.maximumMovepoints += Math.max(1, addMovePoints);
    
    if(this.level > 1) {
	    this.maximumManapoints += addManapoints;
    }

    if(this.class === global.CLASS_MAGIC_USER || this.class === global.CLASS_CLERIC) {
	    this.practiceSessions += Math.max(2, global.wisdomApply[this.wisdom]);
    }
    else {
	    this.practiceSessions += Math.min(2, Math.max(1, global.wisdomApply[this.wisdom]));
    }
};

playerSchema.methods.start = function() {
	this.level = 1;
	this.experience = 1;
	
	this.rollRealAbilities();
	
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
	
	this.gold = 0;
	
	this.advanceLevel();
};

playerSchema.methods.enterGame = function() {
	this.emitRoomMessage(this.name + " has entered the game.");
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

playerSchema.methods.listGold = function() {
	if(this.gold === 0) {
		this.emitMessage("You're dead broke!");
	}
	else if(this.gold === 1) {
		this.emitMessage("You have one miserable little gold coin.");
	}
	else {
		this.emitMessage("You have " + this.gold + " gold coins.");
	}
};

playerSchema.methods.listScore = function() {
	this.emitMessage("This ranks you as " + this.name + " " + this.title + " (level " + this.level + ")");
	
	this.emitMessage("Strength: " + this.strength + "/" + this.strengthAdd);
	this.emitMessage("Dexterity: " + this.dexterity);
	this.emitMessage("Intelligence: " + this.intelligence);
	this.emitMessage("Wisdom: " + this.wisdom);
	this.emitMessage("Constitution: " + this.constitution);
	this.emitMessage("Charisma: " + this.charisma);

	this.emitMessage("You have " + this.practiceSessions + " practice sessions.");

	if(this.hunger === 0) {
		this.emitMessage("You are hungry.");
	}
	else if(this.hunger < 5) {
		this.emitMessage("You will be hungry pretty soon!");
	}

	if(this.thirst === 0) {
		this.emitMessage("You are thirsty.");
	}	
	else if(this.thirst < 5) {
		this.emitMessage("You will be thirsty pretty soon!");
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
		this.emitRoomMessage(this.name + " looks parched!");
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
global.CLASS_UNDEFINED	  = -1;
global.CLASS_MAGIC_USER  = 0;
global.CLASS_CLERIC      = 1;
global.CLASS_THIEF       = 2;
global.CLASS_WARRIOR     = 3;


module.exports = {
	schema: playerSchema,
	player: playerModel
};

