var mongoose = require('mongoose');
var schema = mongoose.Schema;

var roomSchema = new schema({
    id: Number,
    title: String,
    description: String,
    northernExit: {
		      toRoomId: Number,
		      isPickproof: Boolean,
		      isLockable: Boolean,
		      isClosed: Boolean,
		      isClosable: Boolean,
		      doorKeywords: [],
		      doorKeyId: Number,
		      description: String
	},
    easternExit: {
		      toRoomId: Number,
		      isPickproof: Boolean,
		      isLockable: Boolean,
		      isClosed: Boolean,
		      isClosable: Boolean,
		      doorKeywords: [],
		      doorKeyId: Number,
		      description: String
	},
    southernExit: {
		      toRoomId: Number,
		      isPickproof: Boolean,
		      isLockable: Boolean,
		      isClosed: Boolean,
		      isClosable: Boolean,
		      doorKeywords: [],
		      doorKeyId: Number,
		      description: String
	},
    westernExit: {
		      toRoomId: Number,
		      isPickproof: Boolean,
		      isLockable: Boolean,
		      isClosed: Boolean,
		      isClosable: Boolean,
		      doorKeywords: [],
		      doorKeyId: Number,
		      description: String
	},
	upwardExit: {
		      toRoomId: Number,
		      isPickproof: Boolean,
		      isLockable: Boolean,
		      isClosed: Boolean,
		      isClosable: Boolean,
		      doorKeywords: [],
		      doorKeyId: Number,
		      description: String
	},
	downwardExit: {
		      toRoomId: Number,
		      isPickproof: Boolean,
		      isLockable: Boolean,
		      isClosed: Boolean,
		      isClosable: Boolean,
		      doorKeywords: [],
		      doorKeyId: Number,
		      description: String
	},
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
	
	// TODO: Dark room, blind character
	
	character.emitMessage(this.title, 'Cyan');
	character.emitMessage(this.description, 'Gray');
	
	var exits = '';

    if(this.northernExit !== undefined) {
        if(!this.northernExit.isClosed) {
            exits = exits + ' N';
        }
    }

	if(this.easternExit !== undefined) {
	    if(!this.easternExit.isClosed) {
            exits = exits + ' E';
        }
	}

    if(this.southernExit !== undefined) {
        if(!this.southernExit.isClosed) {
            exits = exits + ' S';
        }
    }

    if(this.westernExit !== undefined) {
        if(!this.westernExit.isClosed) {
            exits = exits + ' W';
        }
    }

    if(this.upwardExit !== undefined) {
        if(!this.upwardExit.isClosed) {
            exits = exits + ' U';
        }
    }

    if(this.downwardExit !== undefined) {
    if(!this.downwardExit.isClosed) {
            exits = exits + ' D';
        }
    }

    if(exits === '') {
	    exits = ' None!';
    }

    character.emitMessage('[ Exits:' + exits + ' ]', 'Cyan');
};

var roomModel = mongoose.model('room', roomSchema);

exports.getRooms = function getRooms(callback) {
	roomModel.find({}, function(err, docs) {
		callback(docs);
	});
};




