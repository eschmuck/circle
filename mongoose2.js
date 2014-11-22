var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/circledb');

var roomSchema = new Schema({
    description: String,
    id: Number,
    title: String
});

var room = mongoose.model('room', roomSchema);

room.findOne( { id: 3001 }, function(err, templeOfMidgaard) {
    if(err) { console.log(err); return; }
    console.log(templeOfMidgaard);
});
