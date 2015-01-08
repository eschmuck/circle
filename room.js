var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extensions = require('./extensions');

var roomSchema = new schema({
	id: Number,
	title: String,
	description: String,
	isIndoors: Boolean,
	mobsAllowed: Boolean,
	northernExit: {
		toRoomId: Number,
		isPickproof: Boolean,
		isLocked: Boolean,
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
		isLocked: Boolean,
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
		isLocked: Boolean,
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
		isLocked: Boolean,
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
		isLocked: Boolean,
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
		isLocked: Boolean,
		isLockable: Boolean,
		isClosed: Boolean,
		isClosable: Boolean,
		doorKeywords: [],
		doorKeyId: Number,
		description: String
	},
	people: [],
	contents: [],
	extras: [{
		description: String,
		keywords: []
	}]
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

roomSchema.methods.findRoomContentsFromKeywords = function(keyword) {
	var result = {};
	result.items = [];

	var item;

	if (keyword.indexOf(".") > -1) {
		var tokens = keyword.split(".");

		if (tokens[1].length === 0) {
			return null;
		}

		if (tokens[0].toLowerCase() === "all") {
			result.mode = 'all.item';
			result.token = tokens[1];
			result.items = this.findContentsItems(tokens[1]);
		}
		else {
			result.mode = 'n.item';
			result.token = tokens[1];

			item = this.findContentsItem(parseInt(tokens[0], 10), tokens[1]);

			if (item !== null) {
				result.items.push(item);
			}
		}
	}
	else {
		if (keyword.toLowerCase().trim() === 'all') {
			result.mode = 'all';
			result.token = '';
			result.items = this.findContentsItems('all');
		}
		else {
			result.mode = '1.item';
			result.token = keyword;

			item = this.findContentsItem(1, keyword);

			if (item !== null) {
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
	for (var i = 0; i < this.people.length; i++) {
		if (!this.people[i].isNpc()) {
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

roomSchema.methods.getDoorByKeyword = function(keyword) {
	var index = 1;
	var doorKeyword = keyword;

	if (keyword.indexOf(".") > -1) {
		var tokens = keyword.split(".");

		if (tokens[1].length === 0) {
			return null;
		}

		index = parseInt(tokens[0], 10);
		doorKeyword = tokens[1];
	}

	var counter = 0;

	if (this.northernExit !== null) {
		if (this.northernExit.doorKeywords !== undefined) {
			if (this.northernExit.doorKeywords.indexOf(doorKeyword) > -1) {
				counter++;
			}

			if (counter === index) {
				return this.northernExit;
			}
		}
	}

	if (this.easternExit !== null) {
		if (this.easternExit.doorKeywords !== undefined) {
			if (this.easternExit.doorKeywords.indexOf(doorKeyword) > -1) {
				counter++;
			}

			if (counter === index) {
				return this.easternExit;
			}
		}
	}

	if (this.southernExit !== null) {
		if (this.southernExit.doorKeywords !== undefined) {
			if (this.southernExit.doorKeywords.indexOf(doorKeyword) > -1) {
				counter++;
			}

			if (counter === index) {
				return this.southernExit;
			}
		}
	}

	if (this.westernExit !== null) {
		if (this.westernExit.doorKeywords !== undefined) {
			if (this.westernExit.doorKeywords.indexOf(doorKeyword) > -1) {
				counter++;
			}

			if (counter === index) {
				return this.westernExit;
			}
		}
	}

	if (this.upwardExit !== null) {
		if (this.upwardExit.doorKeywords !== undefined) {
			if (this.upwardExit.doorKeywords.indexOf(doorKeyword) > -1) {
				counter++;
			}

			if (counter === index) {
				return this.upwardExit;
			}
		}
	}

	if (this.downwardExit !== null) {
		if (this.downwardExit.doorKeywords !== undefined) {
			if (this.downwardExit.doorKeywords.indexOf(doorKeyword) > -1) {
				counter++;
			}

			if (counter === index) {
				return this.downwardExit;
			}
		}
	}

	return null;
};

roomSchema.methods.getDoorByKeywordAndDirection = function(keyword, direction) {
	var exit = null;

	switch (direction) {
		case 0:
			exit = this.northernExit;
			break;
		case 1:
			exit = this.southernExit;
			break;
		case 2:
			exit = this.easternExit;
			break;
		case 3:
			exit = this.westernExit;
			break;
		case 4:
			exit = this.upwardExit;
			break;
		case 5:
			exit = this.downwardExit;
			break;
	}

	if (exit.doorKeywords.indexOf(keyword) > -1) {
		return exit;
	}

	return null;
};

roomSchema.methods.getExit = function(direction) {
	switch (direction) {
		case 0:
			return this.northernExit;
		case 1:
			return this.easternExit;
		case 2:
			return this.southernExit;
		case 3:
			return this.westernExit;
		case 4:
			return this.upwardExit;
		case 5:
			return this.downwardExit;
	}
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

roomSchema.methods.getOppositeExit = function(otherRoom) {
	if (otherRoom.northernExit !== null) {
		if (otherRoom.northernExit.toRoomId === this.id) {
			return otherRoom.northernExit;
		}
	}

	if (otherRoom.easternExit !== null) {
		if (otherRoom.easternExit.toRoomId === this.id) {
			return otherRoom.easternExit;
		}
	}

	if (otherRoom.southernExit !== null) {
		if (otherRoom.southernExit.toRoomId === this.id) {
			return otherRoom.southernExit;
		}
	}

	if (otherRoom.westernExit !== null) {
		if (otherRoom.westernExit.toRoomId === this.id) {
			return otherRoom.westernExit;
		}
	}

	if (otherRoom.upwardExit !== null) {
		if (otherRoom.upwardExit.toRoomId === this.id) {
			return otherRoom.upwardExit;
		}
	}

	if (otherRoom.downwardExit !== null) {
		if (otherRoom.downwardExit.toRoomId === this.id) {
			return otherRoom.downwardExit;
		}
	}
};

roomSchema.methods.openOppositeDoor = function(otherRoom) {
	if (otherRoom === null) {
		return;
	}

	var oppositeExit = this.getOppositeExit(otherRoom);

	if (oppositeExit !== null) {
		oppositeExit.isClosed = false;

		if (oppositeExit.doorKeywords.length > 0) {
			otherRoom.emitMessage("The " + oppositeExit.doorKeywords[0] + " is opened from the other side.\n\r");
		}
		else {
			otherRoom.emitMessage("The door is opened from the other side.\n\r");
		}
	}
};

roomSchema.methods.closeOppositeDoor = function(otherRoom) {
	if (otherRoom === null) {
		return;
	}

	var oppositeExit = this.getOppositeExit(otherRoom);

	if (oppositeExit !== null) {
		oppositeExit.isClosed = true;

		if (oppositeExit.doorKeywords.length > 0) {
			otherRoom.emitMessage("The " + oppositeExit.doorKeywords[0] + " is closed from the other side.\n\r");
		}
		else {
			otherRoom.emitMessage("The door is closed from the other side.\n\r");
		}
	}
};

roomSchema.methods.unlockOppositeDoor = function(otherRoom) {
	if (otherRoom === null) {
		return;
	}

	var oppositeExit = this.getOppositeExit(otherRoom);

	if (oppositeExit !== null) {
		oppositeExit.isLocked = false;

		if (oppositeExit.doorKeywords.length > 0) {
			otherRoom.emitMessage("The " + oppositeExit.doorKeywords[0] + " is unlocked from the other side.\n\r");
		}
		else {
			otherRoom.emitMessage("The door is unlocked from the other side.\n\r");
		}
	}
};

roomSchema.methods.lockOppositeDoor = function(otherRoom) {
	if (otherRoom === null) {
		return;
	}

	var oppositeExit = this.getOppositeExit(otherRoom);

	if (oppositeExit !== null) {
		oppositeExit.isLocked = true;

		if (oppositeExit.doorKeywords.length > 0) {
			otherRoom.emitMessage("The " + oppositeExit.doorKeywords[0] + " is locked from the other side.\n\r");
		}
		else {
			otherRoom.emitMessage("The door is locked from the other side.\n\r");
		}
	}
};

roomSchema.methods.listExit = function(character, direction, exit) {
	if (exit !== null) {
		if (exit.isClosed === false) {
			var connectedRoom = this.world.getRoom(exit.toRoomId);

			if (connectedRoom !== null) {
				character.emitMessage("  " + direction + " - " + connectedRoom.title);
			}
		}
	}
}

roomSchema.methods.listExits = function(character) {
	// TODO: Blind, Dark

	character.emitMessage("Obvious Exits:");
	this.listExit(character, "N", this.northernExit);
	this.listExit(character, "E", this.easternExit);
	this.listExit(character, "S", this.southernExit);
	this.listExit(character, "W", this.westernExit);
	this.listExit(character, "U", this.upwardExit);
	this.listExit(character, "D", this.downwardExit);
	character.emitMessage("");
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

	character.emitMessage("");
};

var roomModel = mongoose.model('room', roomSchema);

exports.getRooms = function getRooms(callback) {
	roomModel.find({}, function(err, docs) {
		callback(docs);
	});
};
