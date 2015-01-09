var mudlog = require('./mudlog');

// Object constructor
function World() {
	this.rooms = [];
	this.people = [];
	this.items = [];
	this.zones = [];
	this.time = null;
	this.weather = null;
}

// Public Properties
World.prototype.rooms;
World.prototype.people;
World.prototype.zones;
World.prototype.items;
World.prototype.time;
World.prototype.weather;

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

World.prototype.countCharacter = function(mobId) {
	var count = 0;
	
	for(var i = 0; i < this.people.length; i++) {
		if(this.people[i].isNpc()) {
			if(this.people[i].id === mobId) {
				count++;
			}
		}
	}
	
	return count;
};

World.prototype.addItem = function(item) {
	this.items.push(item);
	item.world = this;
};

World.prototype.removeItem = function(item) {
	this.items.splice(this.items.indexOf(item), 1);
	item.world = null;
};

World.prototype.countItem = function(itemId) {
	var count = 0;
	
	for(var i = 0; i < this.items.length; i++) {
		if(this.items[i].id === itemId) {
			count++;
		}
	}
	
	return count;
};

World.prototype.getCharacter = function(parameter) {
	var name = parameter;
	var member = 1;
	
	if(parameter.indexOf(".") > -1) {
		var tokens = parameter.split(".");
		
		member = tokens[0];
		name = tokens[1];
	}
	
	var counter = 0;
	
	if(member === 0) {
		return this.getPlayer(name);
	}
	else {
		var key = name.toLowerCase();

		for(var i = 0; i < this.people.length; i++) {
			if(this.people[i].isNpc()) {
				for(var j = 0; j < this.people[i].keywords.length; j++) {
					if(this.people[i].keywords[j].substr(0, key.length).toLowerCase() === key) {
						counter++;
						break;
					}
				}
			}
			else {
				if(this.people[i].name.substr(0, key.length).toLowerCase() === key) {
					counter++;
				}
			}
			
			if(counter === member) {
				return this.people[i];
			}
		}
	}
	
	return null;
};

World.prototype.getPlayer = function(name) {
	var key = name.toLowerCase();	
	
	for(var i = 0; i < this.people.length; i++)	{
		if(!this.people[i].isNpc()) {
			if(this.people[i].name.substr(0, key.length).toLowerCase() === key) {
				return this.people[i];
			}
		}
	}
	
	return null;
};

World.prototype.hourElapsed = function() {
	this.time.advanceHour();
	this.time.save(function(err) {
		if(err !== null) {
			mudlog.error(err);
		}
    });
    
    this.weather.update(this.time.month);
    this.weather.save(function(err) {
    	if(err !== null) {
    		mudlog.error(err);
    	}
    });
	
	for(var i = 0; i < this.people.length; i++)	{
		this.people[i].hourlyUpdate();
		
		// TODO: Save?
		//this.people[i].save();
	}
};

World.prototype.performViolence = function() {
	for(var i = 0; i < this.people.length; i++)	{
		if(this.people[i].position === global.POS_FIGHTING) {
			this.people[i].performViolence();
		}
	}
};

World.prototype.updateMobs = function() {
	for(var i = 0; i < this.people.length; i++)	{
		if(this.people[i].isNpc()) {
			this.people[i].performActivity();
		}
	}
};

// Exports
module.exports = World;
