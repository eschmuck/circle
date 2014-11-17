var Character = require("../character");

exports.name_works = function(test) {
	var myCharacter = new Character();
	myCharacter.name = "Apok";
	test.equal("Apok", myCharacter.name);
	test.done();
};

exports.hitpoints_works = function(test) {
	var myCharacter = new Character();
	myCharacter.hitpoints = 400;
	test.equal(400, myCharacter.hitpoints);
	test.done();
};

exports.maximum_hitpoints_works = function(test) {
	var myCharacter = new Character();
	myCharacter.maximumHitpoints = 300;
	test.equal(300, myCharacter.maximumHitpoints);
	test.done();
};

exports.manapoints_works = function(test) {
	var myCharacter = new Character();
	myCharacter.manapoints = 82;
	test.equal(82, myCharacter.manapoints);
	test.done();
};

exports.maximum_manapoints_works = function(test) {
	var myCharacter = new Character();
	myCharacter.maximumManapoints = 1144;
	test.equal(1144, myCharacter.maximumManapoints);
	test.done();
};

exports.movepoints_works = function(test) {
	var myCharacter = new Character();
	myCharacter.movepoints = 15;
	test.equal(15, myCharacter.movepoints);
	test.done();
};

exports.maximum_movepoints_works = function(test) {
	var myCharacter = new Character();
	myCharacter.maximumMovepoints = 66;
	test.equal(66, myCharacter.maximumMovepoints);
	test.done();
};

exports.gender_works = function(test) {
	var myCharacter = new Character();
	myCharacter.gender = Character.GENDER_MALE;
	test.equal(Character.GENDER_MALE, myCharacter.gender);
	test.done();
};

exports.gold_works = function(test) {
	var myCharacter = new Character();
	myCharacter.gold = 999999999999999;
	test.equal(999999999999999, myCharacter.gold);
	test.done();
};

exports.experience_works = function(test) {
	var myCharacter = new Character();
	myCharacter.experience = 751;
	test.equal(751, myCharacter.experience);
	test.done();
};

