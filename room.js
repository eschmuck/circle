var mongoose = require('mongoose');
var schema = mongoose.Schema;

var exitSchema = new schema({
	description: String,
	doorKeyId: Number,
	doorKeywords: [],
	isClosable: Boolean,
	isClosed: Boolean,
	isLockable: Boolean,
	isLocked: Boolean,
	isPickproof: Boolean,
	toRoomId: Number
});

var roomSchema = new schema({
    id: Number,
    title: String,
    description: String,
    people: [],
    contents: [],
    northernExit: [exitSchema],
	southernExit: [exitSchema]    
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
	character.emitMessage(this.title, 'Cyan');
	character.emitMessage(this.description, 'Gray');
};

var roomModel = mongoose.model('room', roomSchema);

exports.getRooms = function getRooms(callback) {
	roomModel.find({}, function(err, docs) {
		callback(docs);
	});
};




