var Player = require("../player");

exports.player_name_works = function(test) {
	var thisPlayer = new Player("Warrax");
	test.equal("Warrax", thisPlayer.name);
	test.done();
}
