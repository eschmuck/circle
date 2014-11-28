//var Player = require("../player");
var Player = require("../character").player;

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
