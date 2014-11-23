// Object constructor
// function Room() {
// 	this.people = [];
// }

// Public Properties
// Room.prototype.id;
// Room.prototype.title;
// Room.prototype.description;
// Room.prototype.people;

// Room.prototype.getType = function() {
// 	return "room";
// };

// Room.prototype.addCharacter = function(character) {
// 	this.people.push(character);
// };

// Room.prototype.removeCharacter = function(character) {
// 	this.people.splice(this.people.indexOf(character), 1);
// 	character.room = null;
// };

// // Exports
// module.exports = Room;

var mongoose = require('mongoose');
var schema = mongoose.Schema;


var roomSchema = new schema({
    id: Number,
    title: String,
    description: String
});

 var Room = mongoose.model('room', roomSchema);

exports.saveRooms = function saveRooms() {
	mongoose.connect('mongodb://localhost/circledb');

	console.log('here1');

 	var room1 = new Room({ id: '3001', title: 'Temple of Midgaard', description: 'You are here.'});
 	room1.save(function(err, xRoom1) {
 		if(err) { console.log(err); }
 		else { console.log(xRoom1); }
 	});
	
// 	var room2 = new Room({ id: '3000', title: 'Reading Room', description: 'You are here.'});
// 	room2.save();
	
// 	var room3 = new Room({ id: '3015', title: 'Temple Square', description: 'You are here.'});
// 	room3.save();
};


//function getRooms(callback) {
	// Room.find({}, function(err, docs) {
	// 	callback(docs);
	// });
//}


