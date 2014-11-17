var Room = require('../room');

exports.room_has_no_people = function(test) {
	var myRoom = new Room();
	myRoom.id = 3001;
	myRoom.title = "The Temple of Midgaard";

	test.equal(0, myRoom.people.length);

	test.done();
};

