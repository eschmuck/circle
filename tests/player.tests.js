//var Player = require("../player");
var Player = require("../player").player;

// exports.player_name_works = function(test) {
// 	var thisPlayer = new Player("Warrax");
// 	test.equal("Warrax", thisPlayer.name);
// 	test.done();
// };


exports.meh_works = function(test) {
	var thisPlayer = new Player();
	test.equal('meh', thisPlayer.meh());
	test.done();
};

exports.blah_works = function(test) {
	var thisPlayer = new Player();
	test.equal('blah', thisPlayer.blah());
	test.done();
};

exports.start_works = function(test) {
	var thisPlayer = new Player();
	thisPlayer.start();
	test.equal(1, thisPlayer.level);
	test.equal(1, thisPlayer.experience);
	test.equal(10, thisPlayer.maximumHitpoints);
	test.equal(100, thisPlayer.maximumManapoints);
	test.equal(82, thisPlayer.maximumMovepoints);
	test.equal(24, thisPlayer.hunger);
	test.equal(24, thisPlayer.thirst);
	test.done();
};