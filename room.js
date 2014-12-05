var mongoose = require('mongoose');
var schema = mongoose.Schema;


var roomSchema = new schema({
    id: Number,
    title: String,
    description: String,
    people: [],
    contents: []
});

roomSchema.methods.contains = function(item) {
	for(var i = 0; i < this.contents.length; i++) {
		if(this.contents[i] === item) {
			return true;
		}
	}
	
	return false;
};

roomSchema.methods.addCharacter = function(character) {
	this.people.push(character);
	character.room = this;
};

roomSchema.methods.removeCharacter = function(character) {
	this.people.splice(this.people.indexOf(character), 1);
	character.room = null;
};

roomSchema.methods.getRoomTitle = function() {
	return { message: this.title, color: 'Cyan' };
};

roomSchema.methods.getRoomDescription = function() {
	return { message: this.description, color: 'Gray' };
};

roomSchema.methods.getCharacter = function(key) {
	// TODO: Handle NPCs
	// TODO: Handle stuff like 2.guard

	var lowercaseKey = key.toLowerCase();
	
	for(var i = 0; i < this.people.length; i++) {
		if(this.people[i].name.toLowerCase().substr(0, key.length) === lowercaseKey) {
			return this.people[i];
		}
	}
	
	return null;
};

roomSchema.methods.showRoomToCharacter = function(character) {
	if(character.socket !== undefined) {
		character.socket.emit('message', this.getRoomTitle());
		character.socket.emit('message', this.getRoomDescription());
	}
};

var roomModel = mongoose.model('room', roomSchema);

exports.getRooms = function getRooms(callback) {
	roomModel.find({}, function(err, docs) {
		callback(docs);
	});
};




