var World = require('../world');
var Room = require('../room');

exports.world_has_no_rooms = function(test) {
	var myWorld = new World();
	test.equal(0, myWorld.rooms.length);
	test.done();
};

exports.world_has_no_zones = function(test) {
	var myWorld = new World();
	test.equal(0, myWorld.zones.length);
	test.done();
};

exports.world_can_have_rooms = function(test) {
	var myWorld = new World();
	
	var rooms = [];
	
	var mortalStartRoom = new Room();
	mortalStartRoom.id = 3001;
	mortalStartRoom.title = "The Temple of Midgaard";
	rooms.push(mortalStartRoom);
	
	var readingRoom = new Room();
	readingRoom.id = 3000;
	readingRoom.title = "The Reading Room";
	rooms.push(readingRoom);
	
	var templeSquareRoom = new Room();
	templeSquareRoom.id = 3005;
	templeSquareRoom.title = "The Temple Square";
	rooms.push(templeSquareRoom);
	
	myWorld.rooms = rooms;
	
	test.equal(3, myWorld.rooms.length);
	test.done();
};

exports.world_can_find_room = function(test) {
	var myWorld = new World();
	
	var rooms = [];
	
	var mortalStartRoom = new Room();
	mortalStartRoom.id = 3001;
	mortalStartRoom.title = "The Temple of Midgaard";
	rooms.push(mortalStartRoom);
	
	var readingRoom = new Room();
	readingRoom.id = 3000;
	readingRoom.title = "The Reading Room";
	rooms.push(readingRoom);

	myWorld.rooms = rooms;

	test.equal(mortalStartRoom, myWorld.getRoom(3001));
	test.done();
};

exports.world_cannot_find_room = function(test) {
	var myWorld = new World();
	
	var rooms = [];
	
	var mortalStartRoom = new Room();
	mortalStartRoom.id = 3001;
	mortalStartRoom.title = "The Temple of Midgaard";
	rooms.push(mortalStartRoom);
	
	var readingRoom = new Room();
	readingRoom.id = 3000;
	readingRoom.title = "The Reading Room";
	rooms.push(readingRoom);

	myWorld.rooms = rooms;

	test.equal(null, myWorld.getRoom(3005));
	test.done();	
};
