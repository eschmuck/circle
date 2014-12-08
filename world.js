// Object constructor
function World() {
	this.rooms = [];
	this.people = [];
	this.zones = [];
}

// Public Properties
World.prototype.rooms;
World.prototype.people;
World.prototype.zones;

World.prototype.getRoom = function(id) {
	for(var i = 0; i < this.rooms.length; i++) {
		if(this.rooms[i].id === id) {
			return this.rooms[i];
		}
	}
	
	return null;
};

World.prototype.addCharacter = function(character) {
	this.people.push(character);
	character.world = this;
};

World.prototype.removeCharacter = function(character) {
	this.people.splice(this.people.indexOf(character), 1);
	character.world = null;
};


// Exports
module.exports = World;
