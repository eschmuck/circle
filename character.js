// Object constructor
function Character() {
	this.inventory = [];
	this.fighting = null;
	this.room = null;
}

// Public Properties
Character.prototype.name;
Character.prototype.gender;

Character.prototype.hitpoints;
Character.prototype.maximumHitpoints;
Character.prototype.manapoints;
Character.prototype.maximumManapoints;
Character.prototype.movepoints;
Character.prototype.maximumMovepoints;

Character.prototype.gold;
Character.prototype.experience;
Character.prototype.level;

Character.prototype.position;

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


// Exports
module.exports = Character;
