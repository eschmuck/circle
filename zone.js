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
        this.executeZoneResetCommands(this.resetCommands[i], 0, null);
    }
};


//function executeZoneResetCommands(commands, instructionNumber, lastNpcLoaded) {
zoneSchema.methods.executeZoneResetCommands = function(commands, instructionNumber, lastNpcLoaded) {
    if(instructionNumber < commands.length) {
        var command = commands[instructionNumber].split(" ");
        
        // TODO: Determine if load would exceed global quota
        
        switch(command[0]) {
            case "*":  // ignore
                break;
            case "M":  // mobile
                var thisMob = new mob();
                //thisMob.id = commands[2];
                thisMob.load(command[2], this.afterMobLoaded, commands, instructionNumber);
                break;
        }
    }
};

//function afterMobLoaded(mob, commands, instructionNumber) {
zoneSchema.methods.afterMobLoaded = function(mob, commands, instructionNumber) {
    // console.log('here');
    // console.log(mob);
    
    var command = commands[instructionNumber].split(" ");
    
    
    //this.world.getRoom(command[4]).addCharacter(mob);

    this.executeZoneResetCommands(commands, (instructionNumber + 1), mob);
};


var zoneModel = mongoose.model('zone', zoneSchema);

exports.getZones = function getZones(callback) {
	zoneModel.find({}, function(err, docs) {
		callback(docs);
	});
};
