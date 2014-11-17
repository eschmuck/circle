var database = require("../database");
var room = require("../room");

// exports.loadAll_loads_rooms = function(test) {
//  	var myDatabase = new database();
//  	myDatabase.loadAll("Room", afterLoadAll);
//  	test.done();
// };

// function afterLoadAll(documents) {
// 	console.log(documents);
// }

// exports.loadOne_loads_3001 = function(test) {
//  	var myDatabase = new Database();
 	
//  	var myRoom = new Room();
//  	myRoom.Id = 3001;
 	
//  	myDatabase.loadOne(myRoom, afterLoadOne);
//  	test.done();
// };

// function afterLoadOne(document) {
// 	// Something would go here as the callback
// }

exports.save_saves_room = function(test) {
	var myDatabase = new database();
	var myRoom = new room();
	myRoom.id = 80;
	myRoom.title = "Insanity Closet";
	myRoom.description = "Bad stuff happens here.";
	
	myDatabase.insert(myRoom);
	test.done();
};
