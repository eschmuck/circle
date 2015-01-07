var mongoose = require('mongoose');
var mob = require('./mob').mob;
var item = require('./item').item;
var mudlog = require('./mudlog');
var utility = require('./utility');
var mobBehaviors = require('./mob');

var schema = mongoose.Schema;

var zoneSchema = new schema({
    id: Number,
    name: String,
    lowestRoomNumber: Number,
    highestRoomNumber: Number,
    lifespan: Number,
    resetMode: Number,
    resetCommands: [],
    age: Number,
});

zoneSchema.methods.reset = function(rooms) {
    for(var i = 0; i < this.resetCommands.length; i++) {
        executeZoneResetCommands(this.resetCommands[i], 0, this.world, null);
    }
};


function executeZoneResetCommands(commands, instructionNumber, world, lastThingLoaded) {
    var maxExisting;
    
    if(instructionNumber < commands.length) {
        var command = commands[instructionNumber].split(" ");

        switch(command[0]) {
            case "*":  // ignore
                break;
            case "M":  // mobile
                var thisMob = new mob();
                var mobId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countCharacter(mobId) < maxExisting) {
                    mob.load(mobId, thisMob, afterMobLoaded, commands, world, instructionNumber);
                }
                break;
            case "O":  // item
                var roomItem = new item();
                var roomItemId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countItem(roomItemId) < maxExisting) {
                    item.load(roomItemId, roomItem, afterRoomItemLoaded, commands, world, null, instructionNumber);
                }
                break;
            case "G":
                var givenItem = new item();
                var givenItemId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countItem(givenItemId) < maxExisting) {
                    item.load(givenItemId, givenItem, afterGivenItemLoaded, commands, world, lastThingLoaded, instructionNumber);
                }
                break;
            case "E":
                var equippedItem = new item();
                var equippedItemId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countItem(givenItemId) < maxExisting) {
                    item.load(equippedItemId, equippedItem, afterEquippedItemLoaded, commands, world, lastThingLoaded, instructionNumber);
                }
                break;
        }
    }
}

function afterMobLoaded(document, mob, commands, world, instructionNumber) {
    mob = document[0];
    
    var hitpointFormulaTokens =  mob.hitpointFormula.split("+");
    var hitpointTotal = hitpointFormulaTokens[1];
    
    var hitpointDice = hitpointFormulaTokens[0].split("d");
    
    for(var i = 0; i < hitpointDice[0]; i++) {
        hitpointTotal += utility.randomNumber(1, hitpointDice[1]);
    }
    
    mudlog.info("Loading " + mob.name + "(" + mob.id + ") with " + hitpointTotal + " hitpoints");
    
    mob.hitpoints = hitpointTotal;
    mob.maximumHitpoints = mob.hitpoints;
    
    var command = commands[instructionNumber].split(" ");
    var roomId = parseInt(command[4], 10);
    world.addCharacter(mob);
    world.getRoom(roomId).addCharacter(mob);

    if(mob.id === 3061 || mob.id === 3068) {
        console.log('this is a janitor');
        mob.set('specialBehavior', mobBehaviors.blahBehavior);
        //mob.specialBehavior = mobBehaviors.blahBehavior;
        //mob.specialBehavior = mobBehaviors.janitorBehavior;
        console.log(mob.specialBehavior);
    }

    executeZoneResetCommands(commands, (instructionNumber + 1), world, mob);
}

function afterRoomItemLoaded(document, item, commands, world, mob, instructionNumber) {
    item = document[0];
    var command = commands[instructionNumber].split(" ");
    var roomId = parseInt(command[4], 10);
    
    mudlog.info("Adding object " + item.shortDescription + "(" + item.id + ") to room " + roomId);
    
    world.addItem(item);
    world.getRoom(roomId).addItem(item);
    executeZoneResetCommands(commands, (instructionNumber + 1), world, item);
}

function afterGivenItemLoaded(document, item, commands, world, mob, instructionNumber) {
    item = document[0];
    
    if(item !== undefined) {
        world.addItem(item);
    
        mudlog.info("Giving " + item.id + " to mob " + mob.id);
        mob.inventory.push(item);
        executeZoneResetCommands(commands, (instructionNumber + 1), world, mob);
    }
    else {
        mudlog.warn("Undefined item load attempted - " + commands + " - " + instructionNumber);
    }
}

function afterEquippedItemLoaded(document, item, commands, world, mob, instructionNumber) {
    item = document[0];
    var command = commands[instructionNumber].split(" ");
    var location = parseInt(command[4], 10);

    mudlog.info("Equipping " + item.id + " onto mob " + mob.id + " at location " + location);

    world.addItem(item);
    mob.wearing[location] = item;
    executeZoneResetCommands(commands, (instructionNumber + 1), world, mob);
}

var zoneModel = mongoose.model('zone', zoneSchema);

exports.getZones = function getZones(callback) {
	zoneModel.find({}, function(err, docs) {
		callback(docs);
	});
};
