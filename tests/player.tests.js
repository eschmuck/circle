var Player = require("../player");

exports.blah = function(test) {
	var thisPlayer = new Player();
	thisPlayer.name = "Warrax";
	test.equal("Warrax", thisPlayer.name);
	test.done();
}
