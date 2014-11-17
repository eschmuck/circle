// Object constructor
function World() {
	this.rooms = [];
	this.zones = [];
}

// Public Properties
World.prototype.rooms;
World.prototype.zones;

World.prototype.getRoom = function(id) {
	for(var i = 0; i < this.rooms.length; i++) {
		if(this.rooms[i].id === id) {
			return this.rooms[i];
		}
	}
	
	return null;
};

// Exports
module.exports = World;
