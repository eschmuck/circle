// Object constructor
function Room() {
	this.people = [];
}

// Public Properties
Room.prototype.id;
Room.prototype.title;
Room.prototype.description;
Room.prototype.people;

Room.prototype.getType = function() {
	return "Room";
};

Room.prototype.addCharacter = function(character) {
	this.people.push(character);
};

Room.prototype.removeCharacter = function(character) {
	this.people.splice(this.people.indexOf(character), 1);
	character.room = null;
};

// Exports
module.exports = Room;
