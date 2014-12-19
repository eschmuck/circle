var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extensions = require('./extensions');

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
	for (var i = 0; i < this.contents.length; i++) {
		if (this.contents[i] === item) {
			return true;
		}
	}

	return false;
};

roomSchema.methods.findContentsItem = function(index, keyword) {
	return this.contents.findItem(index, keyword);
};

roomSchema.methods.findContentsItems = function(keyword) {
	return this.contents.findItems(keyword);
};

roomSchema.methods.findRoomContentsFromKeywords = function (keyword) {
	var result = { };
	result.items = [];

	var item;
	
	if(keyword.indexOf(".") > -1) {
		var tokens = keyword.split(".");
		
		if(tokens[1].length === 0) {
			return null;
		}
		
		if(tokens[0].toLowerCase() === "all") {
			result.mode = 'all.item';
			result.token = tokens[1];
			result.items = this.findContentsItems(tokens[1]);
		}
		else {
			result.mode = 'n.item';
			result.token = tokens[1];
			
			item = this.findContentsItem(parseInt(tokens[0], 10), tokens[1]);

			if(item !== null) {
				result.items.push(item);
			}
		}
	}
	else {
		if(keyword.toLowerCase().trim() === 'all') {
			result.mode = 'all';
			result.token = '';
			result.items = this.findContentsItems('all');
		}
		else {
			result.mode = '1.item';
			result.token = keyword;
			
			item = this.findContentsItem(1, keyword);
			
			if(item !== null) {
				result.items.push(item);
			}
		}
	}
	
	return result;
};


roomSchema.methods.addCharacter = function(character) {
	this.people.push(character);
	character.room = this;
};

roomSchema.methods.removeCharacter = function(character) {
	this.people.splice(this.people.indexOf(character), 1);
	character.room = null;
};

roomSchema.methods.addItem = function(item) {
	this.contents.push(item);
	item.room = this;
};

roomSchema.methods.removeItem = function(item) {
	this.contents.splice(this.contents.indexOf(item), 1);
	item.room = null;
};

roomSchema.methods.findItem = function(index, keyword) {
	return this.contents.findItem(index, keyword);
};

roomSchema.methods.findItems = function(keyword) {
	return this.contents.findItems(keyword);
};

roomSchema.methods.emitMessage = function(message, color) {
	for(var i = 0; i < this.people.length; i++) {
		if(!this.people[i].isNpc()) {
			this.people[i].emitMessage(message, color);
		}
	}
};

roomSchema.methods.getCharacter = function(parameter) {
	var name = parameter;
	var member = 1;

	if (parameter.indexOf(".") > -1) {
		var tokens = parameter.split(".");

		member = tokens[0];
		name = tokens[1];
	}

	var counter = 0;

	if (member === 0) {
		return this.findPlayer(name);
	}
	else {
		var key = name.toLowerCase();

		for (var i = 0; i < this.people.length; i++) {
			if (this.people[i].isNpc()) {
				for (var j = 0; j < this.people[i].keywords.length; j++) {
					if (this.people[i].keywords[j].substr(0, key.length).toLowerCase() === key) {
						counter++;
						break;
					}
				}
			}
			else {
				if (this.people[i].name.substr(0, key.length).toLowerCase() === key) {
					counter++;
				}
			}

			if (counter === member) {
				return this.people[i];
			}
		}
	}

	return null;
};

roomSchema.methods.getPlayer = function(name) {
	var key = name.toLowerCase();

	for (var i = 0; i < this.people.length; i++) {
		if (!this.people[i].isNpc()) {
			if (this.people[i].name.substr(0, key.length).toLowerCase() === key) {
				return this.people[i];
			}
		}
	}

	return null;
};

roomSchema.methods.exitExists = function(direction) {
	switch (direction) {
		case 0:
			if (JSON.stringify(this.northernExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 1:
			if (JSON.stringify(this.easternExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 2:
			if (JSON.stringify(this.southerExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 3:
			if (JSON.stringify(this.westernExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 4:
			if (JSON.stringify(this.upwardExit) === "null") {
				return false;
			}
			else {
				return true;
			}
			break;
		case 5:
			if (JSON.stringify(this.downwardExit) === "null") {
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

	if (this.exitExists(0)) {
		if (this.northernExit.isClosed) {
			exits = exits + ' n';
		}
		else {
			exits = exits + ' N';
		}
	}

	if (this.exitExists(1)) {
		if (this.easternExit.isClosed) {
			exits = exits + ' e';
		}
		else {
			exits = exits + ' E';
		}
	}

	if (this.exitExists(2)) {
		if (this.southernExit.isClosed) {
			exits = exits + ' s';
		}
		else {
			exits = exits + ' S';
		}
	}

	if (this.exitExists(3)) {
		if (this.westernExit.isClosed) {
			exits = exits + ' w';
		}
		else {
			exits = exits + ' W';
		}
	}

	if (this.exitExists(4)) {
		if (this.upwardExit.isClosed) {
			exits = exits + ' u';
		}
		else {
			exits = exits + ' U';
		}
	}

	if (this.exitExists(5)) {
		if (this.downwardExit.isClosed) {
			exits = exits + ' d';
		}
		else {
			exits = exits + ' D';
		}
	}

	if (exits === '') {
		exits = ' None!';
	}

	character.emitMessage('[ Exits:' + exits + ' ]', 'Cyan');

	for (var i = 0; i < this.people.length; i++) {
		if (this.people[i] !== character) {
			if (this.people[i].isNpc()) {
				character.emitMessage(this.people[i].longDescription, 'Orange');
			}
			else {
				character.emitMessage(this.people[i].getDescription(), 'Orange');
			}
		}
	}

	for (var i = 0; i < this.contents.length; i++) {
		character.emitMessage(this.contents[i].longDescription, 'Green');
	}
};

var roomModel = mongoose.model('room', roomSchema);

exports.getRooms = function getRooms(callback) {
	roomModel.find({}, function(err, docs) {
		callback(docs);
	});
};
