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

Character.prototype.title;

// Constants
exports.GENDER_NEUTRAL = 0;
exports.GENDER_MALE    = 1;
exports.GENDER_FEMALE  = 2;

// Exports
module.exports = Character;
