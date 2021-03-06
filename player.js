var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var item = require("./item");
var character = require("./character");
var characterSchema = require("./character").schema;
var utility = require("./utility");
var constants = require("./constants");
var mudlog = require('./mudlog');


var playerSchema = characterSchema.extend({
	password: String,
	practiceSessions: Number,
	hunger: Number,
	thirst: Number,
	drunk: Number,
	title: String,
	class: Number,
	
	isNoAuction: Boolean,
	isNoGossip: Boolean,
	isNoHoller: Boolean,
	isNoShout: Boolean,
	isNoGratz: Boolean,
	isNoQuest: Boolean,
	isNoTell: Boolean
});

playerSchema.methods.isNpc = function() {
	return false;
};

playerSchema.methods.getAge = function() {
	// TODO: Implement player age
	return 25;
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
    
    this.setTitle();
};

playerSchema.methods.setTitle = function(title) {
	if(title === undefined) {
		if(this.gender === global.GENDER_MALE) {
			this.title = this.setMaleTitle();
		}
		else {
			this.title = this.setFemaleTitle();
		}
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
	
	this.isNoAuction = false;
	this.isNoGossip = false;
	this.isNoHoller = false;
	this.isNoShout = false;
	this.isNoGratz = false;
	this.isNoQuest = false;	
	this.isNoTell = false;
	
	this.advanceLevel();
};

playerSchema.methods.toggle = function(mode, property, trueMessage, falseMessage) {
	var toggle = false;
	
	if(mode === undefined) {
		if(property === true) {
			toggle = false;
		}
		else {
			toggle = true;
		}
	}
	else {
		toggle = mode;
	}

	if(toggle === true) {
		this.emitMessage(trueMessage);
	}
	else {
		this.emitMessage(falseMessage);
	}
	
	return toggle;
};

playerSchema.methods.toggleAuction = function(mode) {
	this.isNoAuction = this.toggle(mode, this.isNoAuction, "You are now deaf to auctions.", "You can now hear auctions.");
	mudlog.info(this.name + " turned auction channel to " + this.isNoAuction);
};

playerSchema.methods.toggleGossip = function(mode) {
	this.isNoGossip = this.toggle(mode, this.isNoGossip, "You are now deaf to gossip.", "You can now hear gossip.");
	mudlog.info(this.name + " turned gossip channel to " + this.isNoGossip);
};

playerSchema.methods.toggleGratz = function(mode) {
	this.isNoGratz = this.toggle(mode, this.isNoGratz, "You are now deaf to congratulations messages.", "You can now hear congratulations messages.");
	mudlog.info(this.name + " turned gratz channel to " + this.isNoGratz);
};

playerSchema.methods.toggleHoller = function(mode) {
	this.isNoHoller = this.toggle(mode, this.isNoHoller, "You are now deaf to holler messages.", "You can now hear holler messages.");
	mudlog.info(this.name + " turned holler channel to " + this.isNoHoller);
};

playerSchema.methods.toggleShout = function(mode) {
	this.isNoShout = this.toggle(mode, this.isNoShout, "You are now deaf to shouting.", "You can now hear shouting.");
	mudlog.info(this.name + " turned shout channel to " + this.isNoShout);
};

playerSchema.methods.toggleQuest = function(mode) {
	this.isNoQuest = this.toggle(mode, this.isNoQuest, "You are now deaf to quest messages.", "You can now hear quest messages.");
	mudlog.info(this.name + " turned quest channel to " + this.isNoQuest);
};

playerSchema.methods.toggleTell = function(mode) {
	this.isNoTell = this.toggle(mode, this.isNoTell, "You are now deaf to tells.", "You can now hear tells.");
	mudlog.info(this.name + " turned tells to " + this.isNoTell);
};

playerSchema.methods.enterGame = function() {
	if(this.hitpoints < 1) {
		this.hitpoints = 1;
	}
	
	this.emitRoomMessage(this.name + " has entered the game.");
	this.position = global.POS_STANDING;
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
	
	if(this.position !== global.POS_FIGHTING) {
		description = description + positions[this.position];
	}
	
	// TODO: More (affections, etc)
	
	return description;
};

playerSchema.methods.listGold = function() {
	if(this.gold === 0) {
		this.emitMessage("You're dead broke!\n\r");
	}
	else if(this.gold === 1) {
		this.emitMessage("You have one miserable little gold coin.\n\r");
	}
	else {
		this.emitMessage("You have " + this.gold + " gold coins.\n\r");
	}
};

playerSchema.methods.listScore = function() {
	this.emitMessage("This ranks you as " + this.name + " " + this.title + " (level " + this.level + ")");
	
	this.emitMessage("Strength: [" + this.strength + "/" + this.strengthAdd + "] Dexterity: [" + this.dexterity + "] Intelligence: [" + this.intelligence + "]");
	this.emitMessage("Wisdom: [" + this.wisdom + "] Constitution: [" + this.constitution + "] Charisma: [" + this.charisma + "]");

	this.emitMessage("You have " + this.practiceSessions + " practice sessions.");
	
	this.emitMessage("You have " + this.gold + " gold coins.");
	
	this.emitMessage("You have " + this.experience + " and need " + this.experienceForNextLevel() + " to reach your next level.");

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
	
	this.emitMessage("");
};

// When age < 15 return the value p0 
// When age in 15..29 calculate the line between p1 & p2 
// When age in 30..44 calculate the line between p2 & p3 
// When age in 45..59 calculate the line between p3 & p4 
// When age in 60..79 calculate the line between p4 & p5 
// When age >= 80 return the value p6 
playerSchema.methods.graf = function(grafAge, p0, p1, p2, p3, p4, p5, p6) {
	if(grafAge < 15) {
		return p0;
	}
	else if (grafAge <= 29) {
		return (p1 + (((grafAge - 15) * (p2 - p1)) / 15));
	}
	else if (grafAge <= 44) {
		return (p2 + (((grafAge - 30) * (p3 - p2)) / 15)); 
	}
	else if (grafAge <= 59) {
		return (p3 + (((grafAge - 45) * (p4 - p3)) / 15));
	}
	else if (grafAge <= 79) {
		return (p4 + (((grafAge - 60) * (p5 - p4)) / 20));
	}
	else {
		return (p6)
	}
};

playerSchema.methods.getHourlyHitpointGain = function() {
	var gain = this.graf(this.getAge(), 8, 12, 20, 32, 16, 10, 4);
	
	switch(this.position) {
		case global.POS_SLEEPING:
			gain = gain  + (gain / 2);
			break;
		case global.POS_RESTING:
			gain = gain + (gain / 4);
			break;
		case global.POS_SITTING:
			gain = gain + (gain / 8);
			break;
	}
	
	if(this.class === global.CLASS_CLERIC || this.class === global.CLASS_MAGIC_USER) {
		gain = gain / 2;
	}
	
	if(this.hunger === 0 || this.thirst === 0) {
		gain = gain / 4;
	}
	
	// TODO: Poison
	
	return Math.round(gain);
};

playerSchema.methods.getHourlyManapointGain = function() {
	var gain = this.graf(this.getAge(), 4, 8, 12, 16, 12, 10, 8);
	
	switch(this.position) {
		case global.POS_SLEEPING:
			gain = gain  * 2;
			break;
		case global.POS_RESTING:
			gain = gain + (gain / 2);
			break;
		case global.POS_SITTING:
			gain = gain + (gain / 4);
			break;
	}
	
	if(this.class === global.CLASS_CLERIC || this.class === global.CLASS_MAGIC_USER) {
		gain = gain * 2;
	}
	
	if(this.hunger === 0 || this.thirst === 0) {
		gain = gain / 4;
	}
	
	// TODO: Poison
	
	return Math.round(gain);
};

playerSchema.methods.getHourlyMovepointGain = function() {
	var gain = this.graf(this.getAge(), 16, 20, 24, 20, 16, 12, 10);
	
	switch(this.position) {
		case global.POS_SLEEPING:
			gain = gain  + (gain / 2);
			break;
		case global.POS_RESTING:
			gain = gain + (gain / 4);
			break;
		case global.POS_SITTING:
			gain = gain + (gain / 8);
			break;
	}
	
	if(this.hunger === 0 || this.thirst === 0) {
		gain = gain / 4;
	}
	
	// TODO: Poison
	
	return Math.round(gain);
};

playerSchema.methods.hourlyUpdateExtras = function() {
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

playerSchema.methods.gainExperience = function(amount) {
	if(this.level < 0 || this.level >= global.LVL_IMMORT) {
		return;
	}
	
	if(amount > 0) {
		amount = Math.min(global.MAX_EXP_GAIN, amount);
		this.experience = this.experience + amount;

		var isAltered = false;
		var numberOfLevels = 0;
		
		while(this.experience >= this.experienceForNextLevel()) {
			this.level = this.level + 1;
			this.advanceLevel();
			numberOfLevels++;
			isAltered = true;
		}
		
		if(isAltered === true) {
			mudlog.info(this.name + " advanced " + numberOfLevels + " level(s) to reach level " + this.level);
			
			if(numberOfLevels === 1) {
				this.emitMessage("You rise a level!");
			}
			else {
				this.emitMessage("You rise " + numberOfLevels + " levels!");
			}
			
			this.setTitle();
		}
	}
	else if(amount < 0) {
		amount = Math.max(-1 * global.MAX_EXP_LOSS, amount);
		this.experience = this.experience + amount;
		
		if(this.experience < 0) {
			this.experience = 0;
		}
	}
};

playerSchema.methods.consider = function(targetName) {
	var target = this.room.getCharacter(targetName);
	
	if(target === null) {
		this.emitMessage("Consider killing who?\n\r");
		return;
	}
	
	if(target === this) {
		this.emitMessage("Easy! Very easy indeed!\n\r");
		return;
	}
	
	if(target.isNpc() === false) {
		this.emitMessage("Would you like to borrow a cross and a shovel?\n\r");
		return;
	}
	
   var diff = target.level - this.level;
   
    if(diff <= -10) {
        this.emitMessage('Now where did that chicken go?\n\r');
    }
    else if(diff <= -5) {
        this.emitMessage('You could do it with a needle!\n\r');
    }
    else if(diff <= -2) {
        this.emitMessage('Easy.\n\r');
    }
    else if(diff < -1) {
        this.emitMessage('Fairly easy.\n\r');
    }
    else if(diff === 0) {
        this.emitMessage('The perfect match!\n\r');
    }
    else if(diff <= 1) {
        this.emitMessage('You would need some luck!\n\r');
    }
    else if(diff <= 2) {
        this.emitMessage('You would need a lot of luck!\n\r');
    }
    else if(diff <= 3) {
        this.emitMessage('You would need a lot of luck and great equipment!\n\r');
    }
    else if(diff <= 5) {
        this.emitMessage('Do you feel lucky, punk?\n\r');
    }
    else if(diff <= 10) {
        this.emitMessage('Are you mad!?\n\r');
    }
    else if(diff <= 100) {
        this.emitMessage('You ARE mad!\n\r');
    }
};

playerSchema.methods.slay = function(targetName) {
	var target = this.room.getCharacter(targetName);
	
	if(target === null) {
		this.emitMessage("No-one by that name here... Your wrath will have to wait.\n\r");
		return;
	}
	
	if(target === this) {
		this.emitMessage("Your mother would be so sad... :(\n\r");
		return;
	}

	mudlog.info(this.name + " slayed " + target.name);
	this.emitMessage("You chop " + target.name + " to pieces! Oh the humanity!!!");
	target.emitMessage(this.name + " chops you to pieces!");
	this.emitObservedMessage(target, this.name + " brutally slays " + target.name);
	target.die();
};

playerSchema.methods.getThac0 = function() {
	switch(this.class) {
		case global.CLASS_MAGIC_USER:
			switch(this.level) {
				case  0: return 100;
				case  1: return  20;
				case  2: return  20;
				case  3: return  20;
				case  4: return  19;
				case  5: return  19;
				case  6: return  19;
				case  7: return  18;
				case  8: return  18;
				case  9: return  18;
				case 10: return  17;
				case 11: return  17;
				case 12: return  17;
				case 13: return  16;
				case 14: return  16;
				case 15: return  16;
				case 16: return  15;
				case 17: return  15;
				case 18: return  15;
				case 19: return  14;
				case 20: return  14;
				case 21: return  14;
				case 22: return  13;
				case 23: return  13;
				case 24: return  13;
				case 25: return  12;
				case 26: return  12;
				case 27: return  12;
				case 28: return  11;
				case 29: return  11;
				case 30: return  11;
				case 31: return  10;
				case 32: return  10;
				case 33: return  10;
				case 34: return   9;
			    default:
      				mudlog.error("SYSERR: Missing level for mage thac0.");				
			}
			break;
		case global.CLASS_CLERIC:
			switch(this.level) {
				case  0: return 100;
				case  1: return  20;
				case  2: return  20;
				case  3: return  20;
				case  4: return  18;
				case  5: return  18;
				case  6: return  18;
				case  7: return  16;
				case  8: return  16;
				case  9: return  16;
				case 10: return  14;
				case 11: return  14;
				case 12: return  14;
				case 13: return  12;
				case 14: return  12;
				case 15: return  12;
				case 16: return  10;
				case 17: return  10;
				case 18: return  10;
				case 19: return   8;
				case 20: return   8;
				case 21: return   8;
				case 22: return   6;
				case 23: return   6;
				case 24: return   6;
				case 25: return   4;
				case 26: return   4;
				case 27: return   4;
				case 28: return   2;
				case 29: return   2;
				case 30: return   2;
				case 31: return   1;
				case 32: return   1;
				case 33: return   1;
				case 34: return   1;
				default:
					mudlog.error("Missing level for cleric thac0.");
			}
			break;
		case global.CLASS_THIEF:
			switch(this.level) {
				case  0: return 100;
				case  1: return  20;
				case  2: return  20;
				case  3: return  19;
				case  4: return  19;
				case  5: return  18;
				case  6: return  18;
				case  7: return  17;
				case  8: return  17;
				case  9: return  16;
				case 10: return  16;
				case 11: return  15;
				case 12: return  15;
				case 13: return  14;
				case 14: return  14;
				case 15: return  13;
				case 16: return  13;
				case 17: return  12;
				case 18: return  12;
				case 19: return  11;
				case 20: return  11;
				case 21: return  10;
				case 22: return  10;
				case 23: return   9;
				case 24: return   9;
				case 25: return   8;
				case 26: return   8;
				case 27: return   7;
				case 28: return   7;
				case 29: return   6;
				case 30: return   6;
				case 31: return   5;
				case 32: return   5;
				case 33: return   4;
				case 34: return   4;
				default:
					mudlog.error("Missing level for thief thac0.");
			}
			break;
		case global.CLASS_WARRIOR:
			switch(this.level) {
				case  0: return 100;
				case  1: return  20;
				case  2: return  19;
				case  3: return  18;
				case  4: return  17;
				case  5: return  16;
				case  6: return  15;
				case  7: return  14;
				case  8: return  14;
				case  9: return  13;
				case 10: return  12;
				case 11: return  11;
				case 12: return  10;
				case 13: return   9;
				case 14: return   8;
				case 15: return   7;
				case 16: return   6;
				case 17: return   5;
				case 18: return   4;
				case 19: return   3;
				case 20: return   2;
				case 21: return   1;
				case 22: return   1;
				case 23: return   1;
				case 24: return   1;
				case 25: return   1;
				case 26: return   1;
				case 27: return   1;
				case 28: return   1;
				case 29: return   1;
				case 30: return   1;
				case 31: return   1;
				case 32: return   1;
				case 33: return   1;
				case 34: return   1;
				default:
					mudlog.error("Missing level for warrior thac0.");
			}
			break;
		default:
			mudlog.error("Unknown class in thac0 chart.");
	}
	
	return 100;
};

playerSchema.methods.getClassAbbreviation = function() {
	switch(this.class) {
		case global.CLASS_MAGIC_USER:
			return "Ma";
		case global.CLASS_CLERIC:
			return "Cl";
		case global.CLASS_THIEF:
			return "Th";
		case global.CLASS_WARRIOR:
			return "Wa";
		default:
			return "??";
	}
};

playerSchema.methods.getBareHandDamage = function() {
	return utility.randomNumber(0, 2);
};

playerSchema.methods.getNameForWho = function(shortListMode) {
	var result = "  [";
	
	if(this.level <= 9) {
		result += " ";
	}
	
	result += this.level + " " + this.getClassAbbreviation() + "] " + this.name;
	
	if(shortListMode === false) {
		result += " " + this.title;
	}
	
	return result;
};

playerSchema.methods.setMaleTitle = function() {
	if(this.level <= 0 || this.level > global.LVL_IMPL) {
	    return 'the Man';
	}
	else if(this.level === global.LVL_IMPL) {
        return 'the Implementor';
    }
    else {
    	switch(this.class) {
			case global.CLASS_MAGIC_USER:
				switch (this.level) {
					case  1: return "the Apprentice of Magic";
					case  2: return "the Spell Student";
					case  3: return "the Scholar of Magic";
					case  4: return "the Delver in Spells";
					case  5: return "the Medium of Magic";
					case  6: return "the Scribe of Magic";
					case  7: return "the Seer";
					case  8: return "the Sage";
					case  9: return "the Illusionist";
					case 10: return "the Abjurer";
					case 11: return "the Invoker";
					case 12: return "the Enchanter";
					case 13: return "the Conjurer";
					case 14: return "the Magician";
					case 15: return "the Creator";
					case 16: return "the Savant";
					case 17: return "the Magus";
					case 18: return "the Wizard";
					case 19: return "the Warlock";
					case 20: return "the Sorcerer";
					case 21: return "the Necromancer";
					case 22: return "the Thaumaturge";
					case 23: return "the Student of the Occult";
					case 24: return "the Disciple of the Uncanny";
					case 25: return "the Minor Elemental";
					case 26: return "the Greater Elemental";
					case 27: return "the Crafter of Magics";
					case 28: return "the Shaman";
					case 29: return "the Keeper of Talismans";
					case 30: return "the Archmage";
					case global.LVL_IMMORT: return "the Immortal Warlock";
					case global.LVL_GOD: return "the Avatar of Magic";
					case global.LVL_GRGOD: return "the God of Magic";
					default: return "the Mage";
				}
				break;
			case global.CLASS_CLERIC:
				switch (this.level) {
					case  1: return "the Believer";
					case  2: return "the Attendant";
					case  3: return "the Acolyte";
					case  4: return "the Novice";
					case  5: return "the Missionary";
					case  6: return "the Adept";
					case  7: return "the Deacon";
					case  8: return "the Vicar";
					case  9: return "the Priest";
					case 10: return "the Minister";
					case 11: return "the Canon";
					case 12: return "the Levite";
					case 13: return "the Curate";
					case 14: return "the Monk";
					case 15: return "the Healer";
					case 16: return "the Chaplain";
					case 17: return "the Expositor";
					case 18: return "the Bishop";
					case 19: return "the Arch Bishop";
					case 20: return "the Patriarch";
					/* no one ever thought up these titles 21-30 */
					case global.LVL_IMMORT: return "the Immortal Cardinal";
					case global.LVL_GOD: return "the Inquisitor";
					case global.LVL_GRGOD: return "the God of good and evil";
					default: return "the Cleric";
				}
				break;
			case global.CLASS_THIEF:
				switch (this.level) {
					case  1: return "the Pilferer";
					case  2: return "the Footpad";
					case  3: return "the Filcher";
					case  4: return "the Pick-Pocket";
					case  5: return "the Sneak";
					case  6: return "the Pincher";
					case  7: return "the Cut-Purse";
					case  8: return "the Snatcher";
					case  9: return "the Sharper";
					case 10: return "the Rogue";
					case 11: return "the Robber";
					case 12: return "the Magsman";
					case 13: return "the Highwayman";
					case 14: return "the Burglar";
					case 15: return "the Thief";
					case 16: return "the Knifer";
					case 17: return "the Quick-Blade";
					case 18: return "the Killer";
					case 19: return "the Brigand";
					case 20: return "the Cut-Throat";
					/* no one ever thought up these titles 21-30 */
					case global.LVL_IMMORT: return "the Immortal Assasin";
					case global.LVL_GOD: return "the Demi God of Thieves";
					case global.LVL_GRGOD: return "the God of Thieves and Tradesmen";
					default: return "the Thief";
				}
				break;
			case global.CLASS_WARRIOR:
				switch(this.level) {
					case  1: return "the Swordpupil";
					case  2: return "the Recruit";
					case  3: return "the Sentry";
					case  4: return "the Fighter";
					case  5: return "the Soldier";
					case  6: return "the Warrior";
					case  7: return "the Veteran";
					case  8: return "the Swordsman";
					case  9: return "the Fencer";
					case 10: return "the Combatant";
					case 11: return "the Hero";
					case 12: return "the Myrmidon";
					case 13: return "the Swashbuckler";
					case 14: return "the Mercenary";
					case 15: return "the Swordmaster";
					case 16: return "the Lieutenant";
					case 17: return "the Champion";
					case 18: return "the Dragoon";
					case 19: return "the Cavalier";
					case 20: return "the Knight";
					/* no one ever thought up these titles 21-30 */
					case global.LVL_IMMORT: return "the Immortal Warlord";
					case global.LVL_GOD: return "the Extirpator";
					case global.LVL_GRGOD: return "the God of war";
					default: return "the Warrior";
				}
				break;
			default:
				/* Default title for classes which do not have titles defined */
				return "the Classless";
		}
	}
};

playerSchema.methods.setFemaleTitle = function() {
	if(this.level <= 0 || this.level > global.LVL_IMPL) {
	    return 'the Woman';
	}
	else if(this.level === global.LVL_IMPL) {
        return 'the Implementress';
    }
    else {
    	switch(this.class) {
			case global.CLASS_MAGIC_USER:
				switch (this.level) {
					case  1: return "the Apprentice of Magic";
					case  2: return "the Spell Student";
					case  3: return "the Scholar of Magic";
					case  4: return "the Delveress in Spells";
					case  5: return "the Medium of Magic";
					case  6: return "the Scribess of Magic";
					case  7: return "the Seeress";
					case  8: return "the Sage";
					case  9: return "the Illusionist";
					case 10: return "the Abjuress";
					case 11: return "the Invoker";
					case 12: return "the Enchantress";
					case 13: return "the Conjuress";
					case 14: return "the Witch";
					case 15: return "the Creator";
					case 16: return "the Savant";
					case 17: return "the Craftess";
					case 18: return "the Wizard";
					case 19: return "the War Witch";
					case 20: return "the Sorceress";
					case 21: return "the Necromancress";
					case 22: return "the Thaumaturgess";
					case 23: return "the Student of the Occult";
					case 24: return "the Disciple of the Uncanny";
					case 25: return "the Minor Elementress";
					case 26: return "the Greater Elementress";
					case 27: return "the Crafter of Magics";
					case 28: return "Shaman";
					case 29: return "the Keeper of Talismans";
					case 30: return "Archwitch";
					case global.LVL_IMMORT: return "the Immortal Enchantress";
					case global.LVL_GOD: return "the Empress of Magic";
					case global.LVL_GRGOD: return "the Goddess of Magic";
					default: return "the Witch";
				}
				break;
			case global.CLASS_CLERIC:
				switch (this.level) {
					case  1: return "the Believer";
					case  2: return "the Attendant";
					case  3: return "the Acolyte";
					case  4: return "the Novice";
					case  5: return "the Missionary";
					case  6: return "the Adept";
					case  7: return "the Deaconess";
					case  8: return "the Vicaress";
					case  9: return "the Priestess";
					case 10: return "the Lady Minister";
					case 11: return "the Canon";
					case 12: return "the Levitess";
					case 13: return "the Curess";
					case 14: return "the Nunne";
					case 15: return "the Healess";
					case 16: return "the Chaplain";
					case 17: return "the Expositress";
					case 18: return "the Bishop";
					case 19: return "the Arch Lady of the Church";
					case 20: return "the Matriarch";
					/* no one ever thought up these titles 21-30 */
					case global.LVL_IMMORT: return "the Immortal Priestess";
					case global.LVL_GOD: return "the Inquisitress";
					case global.LVL_GRGOD: return "the Goddess of good and evil";
					default: return "the Cleric";
				}
				break;
			case global.CLASS_THIEF:
				switch (this.level) {
					case  1: return "the Pilferess";
					case  2: return "the Footpad";
					case  3: return "the Filcheress";
					case  4: return "the Pick-Pocket";
					case  5: return "the Sneak";
					case  6: return "the Pincheress";
					case  7: return "the Cut-Purse";
					case  8: return "the Snatcheress";
					case  9: return "the Sharpress";
					case 10: return "the Rogue";
					case 11: return "the Robber";
					case 12: return "the Magswoman";
					case 13: return "the Highwaywoman";
					case 14: return "the Burglaress";
					case 15: return "the Thief";
					case 16: return "the Knifer";
					case 17: return "the Quick-Blade";
					case 18: return "the Murderess";
					case 19: return "the Brigand";
					case 20: return "the Cut-Throat";
					/* no one ever thought up these titles 21-30 */
					case global.LVL_IMMORT: return "the Immortal Assasin";
					case global.LVL_GOD: return "the Demi Goddess of thieves";
					case global.LVL_GRGOD: return "the Goddess of thieves and tradesmen";
					default: return "the Thief";
				}
				break;
			case global.CLASS_WARRIOR:
				switch(this.level) {
					case  1: return "the Swordpupil";
					case  2: return "the Recruit";
					case  3: return "the Sentress";
					case  4: return "the Fighter";
					case  5: return "the Soldier";
					case  6: return "the Warrior";
					case  7: return "the Veteran";
					case  8: return "the Swordswoman";
					case  9: return "the Fenceress";
					case 10: return "the Combatess";
					case 11: return "the Heroine";
					case 12: return "the Myrmidon";
					case 13: return "the Swashbuckleress";
					case 14: return "the Mercenaress";
					case 15: return "the Swordmistress";
					case 16: return "the Lieutenant";
					case 17: return "the Lady Champion";
					case 18: return "the Lady Dragoon";
					case 19: return "the Cavalier";
					case 20: return "the Lady Knight";
					/* no one ever thought up these titles 21-30 */
					case global.LVL_IMMORT: return "the Immortal Lady of War";
					case global.LVL_GOD: return "the Queen of Destruction";
					case global.LVL_GRGOD: return "the Goddess of war";
					default: return "the Warrior";
				}
				break;
			default:
				/* Default title for classes which do not have titles defined */
				return "the Classless";
		}
	}
};

playerSchema.methods.experienceForNextLevel = function() {
	if(this.level > global.LVL_IMMORT) {
		return global.MAX_EXPERIENCE - ((global.LVL_IMMORT - this.level) * 1000);
	}
	
	switch(this.class) {
		case global.CLASS_MAGIC_USER:
			switch(this.level) {
				case  0: return 0;
				case  1: return 1;
				case  2: return 2500;
				case  3: return 5000;
				case  4: return 10000;
				case  5: return 20000;
				case  6: return 40000;
				case  7: return 60000;
				case  8: return 90000;
				case  9: return 135000;
				case 10: return 250000;
				case 11: return 375000;
				case 12: return 750000;
				case 13: return 1125000;
				case 14: return 1500000;
				case 15: return 1875000;
				case 16: return 2250000;
				case 17: return 2625000;
				case 18: return 3000000;
				case 19: return 3375000;
				case 20: return 3750000;
				case 21: return 4000000;
				case 22: return 4300000;
				case 23: return 4600000;
				case 24: return 4900000;
				case 25: return 5200000;
				case 26: return 5500000;
				case 27: return 5950000;
				case 28: return 6400000;
				case 29: return 6850000;
				case 30: return 7400000;
				// add new levels here 
				case global.LVL_IMMORT: return 8000000;
      		}
			break;
		case global.CLASS_CLERIC:
			switch(this.level) {
				case  0: return 0;
				case  1: return 1;
				case  2: return 1500;
				case  3: return 3000;
				case  4: return 6000;
				case  5: return 13000;
				case  6: return 27500;
				case  7: return 55000;
				case  8: return 110000;
				case  9: return 225000;
				case 10: return 450000;
				case 11: return 675000;
				case 12: return 900000;
				case 13: return 1125000;
				case 14: return 1350000;
				case 15: return 1575000;
				case 16: return 1800000;
				case 17: return 2100000;
				case 18: return 2400000;
				case 19: return 2700000;
				case 20: return 3000000;
				case 21: return 3250000;
				case 22: return 3500000;
				case 23: return 3800000;
				case 24: return 4100000;
				case 25: return 4400000;
				case 26: return 4800000;
				case 27: return 5200000;
				case 28: return 5600000;
				case 29: return 6000000;
				case 30: return 6400000;
				// add new levels here
				case global.LVL_IMMORT: return 7000000;
			}
			break;
		case global.CLASS_THIEF:
			switch(this.level) {
				case  0: return 0;
				case  1: return 1;
				case  2: return 1500;
				case  3: return 3000;
				case  4: return 6000;
				case  5: return 13000;
				case  6: return 27500;
				case  7: return 55000;
				case  8: return 110000;
				case  9: return 225000;
				case 10: return 450000;
				case 11: return 675000;
				case 12: return 900000;
				case 13: return 1125000;
				case 14: return 1350000;
				case 15: return 1575000;
				case 16: return 1800000;
				case 17: return 2100000;
				case 18: return 2400000;
				case 19: return 2700000;
				case 20: return 3000000;
				case 21: return 3250000;
				case 22: return 3500000;
				case 23: return 3800000;
				case 24: return 4100000;
				case 25: return 4400000;
				case 26: return 4800000;
				case 27: return 5200000;
				case 28: return 5600000;
				case 29: return 6000000;
				case 30: return 6400000;
				// add new levels here
				case global.LVL_IMMORT: return 7000000;				
			}
			break;
		case global.CLASS_WARRIOR:
			switch(this.level) {
				case  0: return 0;
				case  1: return 1;
				case  2: return 2000;
				case  3: return 4000;
				case  4: return 8000;
				case  5: return 16000;
				case  6: return 32000;
				case  7: return 64000;
				case  8: return 125000;
				case  9: return 250000;
				case 10: return 500000;
				case 11: return 750000;
				case 12: return 1000000;
				case 13: return 1250000;
				case 14: return 1500000;
				case 15: return 1850000;
				case 16: return 2200000;
				case 17: return 2550000;
				case 18: return 2900000;
				case 19: return 3250000;
				case 20: return 3600000;
				case 21: return 3900000;
				case 22: return 4200000;
				case 23: return 4500000;
				case 24: return 4800000;
				case 25: return 5150000;
				case 26: return 5500000;
				case 27: return 5950000;
				case 28: return 6400000;
				case 29: return 6850000;
				case 30: return 7400000;
				// add new levels here
				case this.LVL_IMMORT: return 8000000;				
			}
			break;
	}
	
	mudlog.error("XP tables not correctly set up!");
	return 123465;
};

var playerModel = mongoose.model('player', playerSchema);

module.exports = {
	schema: playerSchema,
	player: playerModel
};

