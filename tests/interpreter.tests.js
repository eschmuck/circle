var Interpreter = require("../interpreter");

exports.interpreter_clean_makes_input_lowercase = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "ALL CAPS INPUT";
    test.equal("all caps input", thisIntepreter.cleanInput(dirtyInput));	
	test.done();
};

exports.interpreter_clean_removes_leading_spaces = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "    tell apok hi";
    test.equal("tell apok hi", thisIntepreter.cleanInput(dirtyInput));	
	test.done();
};

exports.interpreter_clean_removes_trailing_spaces = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "tell strat hi                     ";
    test.equal("tell strat hi", thisIntepreter.cleanInput(dirtyInput));	
	test.done();
};

exports.interpreter_clean_removes_double_spaces = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "tell     strat  hi      there";
    test.equal("tell strat hi there", thisIntepreter.cleanInput(dirtyInput));	
	test.done();
};

exports.interpreter_tokenize_works = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "tell strat hi";
	
	var expectedTokens = ["tell", "strat", "hi"];
	var actualTokens = thisIntepreter.tokenize(input);
    test.equal(expectedTokens[0], actualTokens[0]);
    test.equal(expectedTokens[1], actualTokens[1]);
    test.equal(expectedTokens[2], actualTokens[2]);
	test.done();
};

exports.interpreter_getCommandToken_works = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "tell strat hi";
	
    test.equal("tell", thisIntepreter.getCommandToken(input));
	test.done();
};

exports.interpreter_getCommandToken_handles_uppercase = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "STEAL sword from apok";
	
    test.equal("steal", thisIntepreter.getCommandToken(input));
	test.done();
};

exports.interpreter_getCommandToken_handles_no_tokens = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "";
	
    test.equal(null, thisIntepreter.getCommandToken(input));
	test.done();
};

exports.interpreter_getCommandToken_handles_empty_input = function(test) {
	var thisIntepreter = new Interpreter();
	var input = " ";
	
    test.equal("", thisIntepreter.getCommandToken(input));
	test.done();
};

exports.interpreter_getCommand_finds_command_1 = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "n";
	
	var result = thisIntepreter.getCommand(input);
    test.notEqual(null, result);
    test.equal("north", result.command);
	test.done();
};

exports.interpreter_getCommand_finds_command_2 = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "nort";
	
	var result = thisIntepreter.getCommand(input);
    test.notEqual(null, result);
    test.equal("north", result.command);
	test.done();
};

exports.interpreter_getCommand_finds_command_3 = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "u";
	
	var result = thisIntepreter.getCommand(input);
    test.notEqual(null, result);
    test.equal("up", result.command);
	test.done();
};

exports.interpreter_getCommand_returns_null = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "fjdkalnfdsaoinfew";
	
    test.equal(null, thisIntepreter.getCommand(input));
	test.done();
};