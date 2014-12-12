var Mob = require("../mob").mob;

exports.blah_works = function(test) {
	var npc = new Mob();
	test.equal('blah', npc.blah());
	test.done();
};

exports.isNpc_works = function(test) {
	var npc = new Mob();
	test.equal(true, npc.isNpc());
	test.done();
};
