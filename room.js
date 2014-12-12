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

roomSchema.methods.exitExists = function(direction) {
	switch(direction) {
		case 0:
			if(JSON.stringify(this.northernExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 1:
			if(JSON.stringify(this.easternExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 2:
			if(JSON.stringify(this.southerExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 3:
			if(JSON.stringify(this.westernExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 4:
			if(JSON.stringify(this.upwardExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 5:
			if(JSON.stringify(this.downwardExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
	}	
};

roomSchema.methods.showRoomToCharacter = function(character) {
	
	// TODO: Dark room, blind character
	
	character.emitMessage(this.title, 'Cyan');
	character.emitMessage(this.description, 'Gray');
	
	var exits = '';

    if(this.exitExists(0)) {
    	if(this.northernExit.isClosed) {
    		exits = exits + ' n';
    	}
       else {
            exits = exits + ' N';
        }
    }

	if(this.exitExists(1)) {
	    if(this.easternExit.isClosed) {
            exits = exits + ' e';
        }
        else {
        	exits = exits + ' E';
        }
	}

	if(this.exitExists(2)) {
	    if(this.southernExit.isClosed) {
            exits = exits + ' s';
        }
        else {
        	exits = exits + ' S';
        }
	}

	if(this.exitExists(3)) {
	    if(this.westernExit.isClosed) {
            exits = exits + ' w';
        }
        else {
        	exits = exits + ' W';
        }
	}

	if(this.exitExists(4)) {
	    if(this.upwardExit.isClosed) {
            exits = exits + ' u';
        }
        else {
        	exits = exits + ' U';
        }
	}

	if(this.exitExists(5)) {
	    if(this.downwardExit.isClosed) {
            exits = exits + ' d';
        }
        else {
        	exits = exits + ' D';
        }
	}

    if(exits === '') {
	    exits = ' None!';
    }

    character.emitMessage('[ Exits:' + exits + ' ]', 'Cyan');
    
    // TODO: Contents, People
    
    for(var i = 0; i < this.people.length; i++) {
    	if(this.people[i] !== character) {
    		if(this.people[i].isNpc()) {
    			character.emitMessage(this.people[i].longDescription, 'Orange');
    		}
    		else {
    			character.emitMessage(this.people[i].getDescription(), 'Orange');
    		}
    	}
    }
};

var roomModel = mongoose.model('room', roomSchema);

exports.getRooms = function getRooms(callback) {
	roomModel.find({}, function(err, docs) {
		callback(docs);
	});
};




