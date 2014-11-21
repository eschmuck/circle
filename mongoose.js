// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var kittySchema = new Schema({
//   name: String
// });


// var Kitten = mongoose.model('Kitten', kittySchema);

// var merve = new Kitten({ name: 'Merve' });

// console.log(merve.name);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/circledb');

var roomSchema = new Schema({
    description: String,
    id: Number,
    title: String
});

var Room = mongoose.model('Room', roomSchema);

Room.find(function(err, rooms) {
    console.log(rooms);
});
