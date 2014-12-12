var mongoose = require('mongoose');
var mob = require('./mob').mob;


var schema = mongoose.Schema;

//ar connection = mongoose.connect('mongodb://localhost/circledb');

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
    // for(var i = 0; i < this.resetCommands.length; i++) {
    //     //console.log(this.resetCommands[i]);
    //     //console.log(this.resetCommands[i].length);
        
    //     for(var j = 0; j < this.resetCommands[i].length; j++) {
    //         var commands = this.resetCommands[i].split(' ');
            
    //         switch(commands[0]) {
    //             case "*":  // Ignore
    //                 break;
    //             case "M":  // Mob
    //                 break;
    //         }
    //     }
    //}

    // console.log(this.world);
    
    for(var i = 0; i < this.resetCommands.length; i++) {
        executeZoneResetCommands(this.resetCommands[i], 0, this.world, null);
    }
};


function executeZoneResetCommands(commands, instructionNumber, world, lastNpcLoaded) {
    if(instructionNumber < commands.length) {
        var command = commands[instructionNumber].split(" ");
        
        // TODO: Determine if load would exceed global quota
        
        switch(command[0]) {
            case "*":  // ignore
                break;
            case "M":  // mobile
                var thisMob = new mob();
                //thisMob.id = commands[2];
                thisMob.load(command[2], afterMobLoaded, commands, world, instructionNumber);
                break;
        }
    }
}

function afterMobLoaded(mob, commands, world, instructionNumber) {
    // console.log('here');
    // console.log(mob);
    
    var command = commands[instructionNumber].split(" ");
    
    var roomId = command[4];
    console.log(roomId);
    world.getRoom(roomId).addCharacter(mob);

    executeZoneResetCommands(commands, world, (instructionNumber + 1), mob);
}


var zoneModel = mongoose.model('zone', zoneSchema);

exports.getZones = function getZones(callback) {
	zoneModel.find({}, function(err, docs) {
		callback(docs);
	});
};
