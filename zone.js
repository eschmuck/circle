var mongoose = require('mongoose');
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
    age: Number
});

zoneSchema.methods.reset = function(rooms) {
    for(var i = 0; i < this.resetCommands.length; i++) {
        //console.log(this.resetCommands[i]);
        
        console.log(this.resetCommands[i].length);
    }
};

var zoneModel = mongoose.model('zone', zoneSchema);

exports.getZones = function getZones(callback) {
	zoneModel.find({}, function(err, docs) {
		callback(docs);
	});
};

// module.exports = {
// 	schema: zoneSchema,
// 	zone: zoneModel
// };
