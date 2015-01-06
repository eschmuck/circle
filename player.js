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
	class: Number,
	
	isNoAuction: Boolean,
	isNoGossip: Boolean,
	isNoHoller: Boolean,
	isNoShout: Boolean,
	isNoGratz: Boolean,
	isNoQuest: Boolean
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
	
	this.advanceLevel();
};

playerSchema.methods.toggle = function(mode, property, trueMessage, falseMessage) {
	var toggle = false;
	
	if(mode === undefined) {
		if(property === true) {
			toggle = false;
		}
		else {
			toggle = false;
		}
	}
	else {
		toggle = mode;
	}
	
	property = toggle;
	
	if(property === true) {
		this.emitMessage(trueMessage);
	}
	else {
		this.emitMessage(falseMessage);
	}
};

playerSchema.methods.toggleAuction = function(mode) {
	// var toggle = false;
	
	// if(mode === undefined) {
	// 	if(this.isNoAuction === true) {
	// 		toggle = false;
	// 	}
	// 	else {
	// 		toggle = true;
	// 	}
	// }
	// else {
	// 	toggle = mode;
	// }

	// this.isNoAuction = toggle;

	// if(this.isNoAuction === true) {
	// 	this.emitMessage("You are now deaf to auctions.");
	// }
	// else {
	// 	this.emitMessage("You can now hear auctions.");
	// }
	
	this.toggle(mode, this.isNoAuction, "You are now deaf to auctions.", "You can now hear auctions.");
	
	console.log(this.isNoAuction);
};

playerSchema.methods.toggleGossip = function(mode) {
	var toggle = false;
	
	if(mode === undefined) {
		if(this.isNoGossip === true) {
			toggle = false;
		}
		else {
			toggle = true;
		}
	}
	else {
		toggle = mode;
	}

	this.isNoGossip = toggle;

	if(this.isNoGossip === true) {
		this.emitMessage("You are now deaf to gossip.");
	}
	else {
		this.emitMessage("You can now hear gossip.");
	}
};

playerSchema.methods.toggleGratz = function(mode) {
	var toggle = false;
	
	if(mode === undefined) {
		if(this.isNoGratz === true) {
			toggle = false;
		}
		else {
			toggle = true;
		}
	}
	else {
		toggle = mode;
	}

	this.isNoGratz = toggle;

	if(this.isNoGratz === true) {
		this.emitMessage("You are now deaf to congratulations messages.");
	}
	else {
		this.emitMessage("You can now hear congratulations messages.");
	}
};

playerSchema.methods.toggleHoller = function(mode) {
	var toggle = false;
	
	if(mode === undefined) {
		if(this.isNoHoller === true) {
			toggle = false;
		}
		else {
			toggle = true;
		}
	}
	else {
		toggle = mode;
	}

	this.isNoHoller = toggle;

	if(this.isNoHoller === true) {
		this.emitMessage("You will no longer hear holler messages.");
	}
	else {
		this.emitMessage("You can now hear people hollering.");
	}
};

playerSchema.methods.toggleShout = function(mode) {
	var toggle = false;
	
	if(mode === undefined) {
		if(this.isNoShout === true) {
			toggle = false;
		}
		else {
			toggle = true;
		}
	}
	else {
		toggle = mode;
	}

	this.isNoShout = toggle;

	if(this.isNoShout === true) {
		this.emitMessage("You will no longer hear shouts.");
	}
	else {
		this.emitMessage("You can now hear people shouting.");
	}
};

playerSchema.methods.toggleQuest = function(mode) {
	var toggle = false;
	
	if(mode === undefined) {
		if(this.isNoQuest === true) {
			toggle = false;
		}
		else {
			toggle = true;
		}
	}
	else {
		toggle = mode;
	}

	this.isNoQuest = toggle;

	if(this.isNoQuest === true) {
		this.emitMessage("You will no longer quest messages.");
	}
	else {
		this.emitMessage("You can now hear quest messages");
	}
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
	
	this.emitMessage("Strength: [" + this.strength + "/" + this.strengthAdd + "] Dexterity: [" + this.dexterity + "] Intelligence: [" + this.intelligence + "]");
	this.emitMessage("Wisdom: [" + this.wisdom + "] Constitution: [" + this.constitution + "] Charisma: [" + this.charisma + "]");

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

var playerModel = mongoose.model('player', playerSchema);



module.exports = {
	schema: playerSchema,
	player: playerModel
};

