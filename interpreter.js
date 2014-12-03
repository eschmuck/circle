var Character = require("./character");
var CharacterSchema = require("./character").character

// Object constructor
function Interpreter() {
    
}

// Constants
exports.SCMD_NORTH	= 1;
exports.SCMD_EAST	= 2;
exports.SCMD_SOUTH	= 3;
exports.SCMD_WEST	= 4;
exports.SCMD_UP		= 5;
exports.SCMD_DOWN	= 6;

// TODO: change do_move to an actual function
var do_move = 1;

var COMMAND_LIST = [
    
          { command: "north"    , minimumPosition: Character.POS_STANDING, functionPointer: do_move                    , minimumLevel: 0, subCommand: exports.SCMD_NORTH },
          { command: "east"     , minimumPosition: Character.POS_STANDING, functionPointer: do_move                    , minimumLevel: 0, subCommand: exports.SCMD_EAST },
          { command: "south"    , minimumPosition: Character.POS_STANDING, functionPointer: do_move                    , minimumLevel: 0, subCommand: exports.SCMD_SOUTH },
          { command: "west"     , minimumPosition: Character.POS_STANDING, functionPointer: do_move                    , minimumLevel: 0, subCommand: exports.SCMD_WEST },
          { command: "up"       , minimumPosition: Character.POS_STANDING, functionPointer: do_move                    , minimumLevel: 0, subCommand: exports.SCMD_UP },
          { command: "down"     , minimumPosition: Character.POS_STANDING, functionPointer: do_move                    , minimumLevel: 0, subCommand: exports.SCMD_DOWN },
          
          { command: "say"      , minimumPosition: Character.POS_RESTING , functionPointer: handle_say        , minimumLevel: 0, subCommand: 0 },
          { command: "'"        , minimumPosition: Character.POS_RESTING , functionPointer: handle_say        , minimumLevel: 0, subCommand: 0 },
          
    ];


Interpreter.prototype.cleanInput = function(input) {
    var cleanInput = input.trim().toLowerCase();
    
    var doubleSpaces = input.indexOf('  ');
    
    while(doubleSpaces > -1) {
            cleanInput = cleanInput.replace('  ', ' ');
            doubleSpaces = cleanInput.indexOf('  ');
        }

    return cleanInput;
};

Interpreter.prototype.tokenize = function(input) {
    var tokens = input.split(' ');
    return tokens;
};

Interpreter.prototype.getCommandToken = function(input) {
    
    if(input.length === 0) {
        return null;
    }
    
    var cleanedInput = this.cleanInput(input);
    var cleanedTokens = this.tokenize(cleanedInput);

    if(cleanedTokens.length < 1) {
        return null;
    }
    
    return cleanedTokens[0];
};

Interpreter.prototype.getCommand = function(input) {
    var commandToken = this.getCommandToken(input);
    
    if(commandToken === null || commandToken === " ") {
        return null;
    }
    
    var command = null;
    
    for(var i = 0; i < COMMAND_LIST.length; i++) {
        if(COMMAND_LIST[i].command.substr(0, commandToken.length) === commandToken) {
            command = COMMAND_LIST[i];
            break;
        }
    }
    
    return command;
};

Interpreter.prototype.handleInput = function(character, input) {
    var command = this.getCommand(input);
    
    console.log(command);
    
    if(command !== null) {
        command.functionPointer(character, input);
    }
};

function handle_say(character, input) {
    console.log(input);
    character.say(input);
}



















// Exports
module.exports = Interpreter;