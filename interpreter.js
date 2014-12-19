var Character = require("./character");
var CharacterSchema = require("./character").character;

// Object constructor
function Interpreter() {
    
}

// Constants
exports.SCMD_NORTH	= 0;
exports.SCMD_EAST	= 1;
exports.SCMD_SOUTH	= 2;
exports.SCMD_WEST	= 3;
exports.SCMD_UP		= 4;
exports.SCMD_DOWN	= 5;

global.SCMD_HOLLER  = 0;
global.SCMD_SHOUT   = 1;
global.SCMD_GOSSIP  = 2;
global.SCMD_AUCTION = 3;
global.SCMD_GRATZ   = 4;

exports.SCMD_ACCUSE     = 0;
exports.SCMD_APPLAUD    = 1;
exports.SCMD_BEG        = 2;
exports.SCMD_BLEED      = 3;
exports.SCMD_BLUSH      = 4;
exports.SCMD_BOUNCE     = 5;
exports.SCMD_BOW        = 6;
exports.SCMD_BRB        = 7;
exports.SCMD_BURP       = 8;
exports.SCMD_CACKLE     = 9;
exports.SCMD_CHUCKLE    = 10;
exports.SCMD_CLAP       = 11;
exports.SCMD_COMB       = 12;
exports.SCMD_COMFORT    = 13;
exports.SCMD_COUGH      = 14;
exports.SCMD_CRINGE     = 15;
exports.SCMD_CRY        = 16;
exports.SCMD_CUDDLE     = 17;
exports.SCMD_CURSE      = 18;
exports.SCMD_CURTSEY    = 19;
exports.SCMD_DANCE      = 20;
exports.SCMD_DAYDREAM   = 21;
exports.SCMD_DROOL      = 22;
exports.SCMD_EMBRACE    = 23;
exports.SCMD_FART       = 24;
exports.SCMD_FLIP       = 25;
exports.SCMD_FLIRT      = 26;
exports.SCMD_FONDLE     = 27;
exports.SCMD_FRENCH     = 28;
exports.SCMD_FROWN      = 29;
exports.SCMD_FUME       = 30;
exports.SCMD_GASP       = 31;
exports.SCMD_GIGGLE     = 32;
exports.SCMD_GLARE      = 33;
exports.SCMD_GREET      = 34;
exports.SCMD_GRIN       = 35;
exports.SCMD_GROAN      = 36;
exports.SCMD_GROPE      = 37;
exports.SCMD_GROVEL     = 38;
exports.SCMD_GROWL      = 39;
exports.SCMD_HICCUP     = 40;
exports.SCMD_HUG        = 41;
exports.SCMD_KISS       = 42;
exports.SCMD_LAUGH      = 43;
exports.SCMD_LICK       = 44;
exports.SCMD_LOVE       = 45;
exports.SCMD_MASSAGE    = 46;
exports.SCMD_MOAN       = 47;
exports.SCMD_NIBBLE     = 48;
exports.SCMD_NOD        = 49;
exports.SCMD_NUDGE      = 50;
exports.SCMD_NUZZLE     = 51;
exports.SCMD_PAT        = 52;
exports.SCMD_PEER       = 53;
exports.SCMD_POINT      = 54;
exports.SCMD_POKE       = 55;
exports.SCMD_PONDER     = 56;
exports.SCMD_POUT       = 57;
exports.SCMD_PRAY       = 58;
exports.SCMD_PUKE       = 59;
exports.SCMD_PUNCH      = 60;
exports.SCMD_PURR       = 61;
exports.SCMD_ROLL       = 62;
exports.SCMD_RUFFLE     = 63;
exports.SCMD_SCREAM     = 64;
exports.SCMD_SHAKE      = 65;
exports.SCMD_SHIVER     = 66;
exports.SCMD_SHRUG      = 67;
exports.SCMD_SIGH       = 68;
exports.SCMD_SING       = 69;
exports.SCMD_SLAP       = 70;
exports.SCMD_SMILE      = 71;
exports.SCMD_SMIRK      = 72;
exports.SCMD_SNAP       = 73;
exports.SCMD_SNARL      = 74;
exports.SCMD_SNEEZE     = 75;
exports.SCMD_SNICKER    = 76;
exports.SCMD_SNIFF      = 77;
exports.SCMD_SNORE      = 78;
exports.SCMD_SNOWBALL   = 79;
exports.SCMD_SNUGGLE    = 80;
exports.SCMD_SPANK      = 81;
exports.SCMD_SPIT       = 82;
exports.SCMD_SQUEEZE    = 83;
exports.SCMD_STARE      = 84;
exports.SCMD_STEAM      = 85;
exports.SCMD_STROKE     = 86;
exports.SCMD_STRUT      = 87;
exports.SCMD_SULK       = 88;
exports.SCMD_TACKLE     = 89;
exports.SCMD_TANGO      = 90;
exports.SCMD_TAUNT      = 91;
exports.SCMD_THANK      = 92;
exports.SCMD_THINK      = 93;
exports.SCMD_TICKLE     = 94;
exports.SCMD_TWIDDLE    = 95;

var SCMD_EAT   = 0;
var SCMD_TASTE = 1;
global.SCMD_EAT    = SCMD_EAT;
global.SCMD_TASTE  = SCMD_TASTE;

var SCMD_DRINK = 0;
var SCMD_SIP   = 1;
global.SCMD_DRINK = SCMD_DRINK;
global.SCMD_SIP   = SCMD_SIP;

var COMMAND_LIST = [
    
          { command: "north"    , minimumPosition: Character.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: exports.SCMD_NORTH },
          { command: "east"     , minimumPosition: Character.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: exports.SCMD_EAST },
          { command: "south"    , minimumPosition: Character.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: exports.SCMD_SOUTH },
          { command: "west"     , minimumPosition: Character.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: exports.SCMD_WEST },
          { command: "up"       , minimumPosition: Character.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: exports.SCMD_UP },
          { command: "down"     , minimumPosition: Character.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: exports.SCMD_DOWN },

          { command: "accuse"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_ACCUSE },
          { command: "applaud"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_APPLAUD },
          { command: "auction"  , minimumPosition: Character.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_AUCTION },

          { command: "beg"      , minimumPosition: Character.POS_RESTING,  functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_BEG },
          { command: "bleed"    , minimumPosition: Character.POS_RESTING,  functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_BLEED },
          { command: "blush"    , minimumPosition: Character.POS_RESTING,  functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_BLUSH },
          { command: "bounce"   , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_BOUNCE },
          { command: "bow"      , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_BOW },
          { command: "brb"      , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_BRB },
          { command: "burp"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_BURP },
          
          { command: "cackle"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CACKLE },
          { command: "chuckle"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CHUCKLE },
          { command: "clap"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CLAP },
          { command: "comb"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_COMB },
          { command: "comfort"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_COMFORT },
          { command: "cough"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_COUGH },
          { command: "cringe"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CRINGE },
          { command: "cry"      , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CRY },
          { command: "cuddle"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CUDDLE },
          { command: "curse"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CURSE },
          { command: "curtsey"  , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_CURTSEY },
          
          { command: "dance"    , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_DANCE },
          { command: "daydream" , minimumPosition: Character.POS_SLEEPING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_DAYDREAM },
          { command: "drink"    , minimumPosition: Character.POS_RESTING , functionPointer: do_drink      , minimumLevel: 0, subCommand: exports.SCMD_DRINK },
          { command: "donate"   , minimumPosition: Character.POS_RESTING , functionPointer: do_donate     , minimumLevel: 0, subCommand: 0 },
          { command: "drop"     , minimumPosition: Character.POS_RESTING , functionPointer: do_drop       , minimumLevel: 0, subCommand: 0 },
          { command: "drool"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_DROOL },

          { command: "eat"      , minimumPosition: Character.POS_RESTING , functionPointer: do_eat        , minimumLevel: 0, subCommand: exports.SCMD_EAT },
          { command: "embrace"  , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_EMBRACE },

          { command: "fart"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_FART },
          { command: "flip"     , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_FLIP },
          { command: "flirt"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_FLIRT },
          { command: "fondle"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_FONDLE },
          { command: "french"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_FRENCH },
          { command: "frown"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_FROWN },
          { command: "fume"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_FUME },

          { command: "gasp"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GASP },
          { command: "get"      , minimumPosition: Character.POS_RESTING , functionPointer: do_take       , minimumLevel: 0, subCommand: 0 },          
          { command: "giggle"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GIGGLE },
          { command: "glare"    , minimumPosition: Character.POS_RESTING,  functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GLARE },
          { command: "gossip"   , minimumPosition: Character.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GOSSIP },
          { command: "gratz"    , minimumPosition: Character.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GRATZ },
          { command: "greet"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GREET },
          { command: "grin"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GRIN },
          { command: "groan"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GROAN },
          { command: "grope"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GROPE },
          { command: "grovel"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GROVEL },
          { command: "growl"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_GROWL },

          { command: "hiccup"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_HICCUP },
          { command: "holler"   , minimumPosition: Character.POS_RESTING,  functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_HOLLER },
          { command: "hug"      , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_HUG },

          { command: "inventory", minimumPosition: Character.POS_DEAD    , functionPointer: do_inventory  , minimumLevel: 0, subCommand: 0 },


          { command: "junk"     , minimumPosition: Character.POS_RESTING , functionPointer: do_junk       , minimumLevel: 0, subCommand: 0 },

          { command: "kiss"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_KISS },

          { command: "laugh"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_LAUGH },
          { command: "lick"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_LICK },
          { command: "love"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_LOVE },

          { command: "massage"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_MASSAGE },
          { command: "moan"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_MOAN },

          { command: "nibble"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_NIBBLE },
          { command: "nod"      , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_NOD },
          { command: "nudge"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_NUDGE },
          { command: "nuzzle"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_NUZZLE },

          { command: "pat"      , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_PAT },
          { command: "peer"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_PEER },
          { command: "point"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_POINT },
          { command: "poke"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_POKE },
          { command: "ponder"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_PONDER },
          { command: "pout"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_POUT },
          { command: "pray"     , minimumPosition: Character.POS_SITTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_PRAY },
          { command: "puke"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_PUKE },
          { command: "punch"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_PUNCH },
          { command: "purr"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_PURR },

          { command: "rest"     , minimumPosition: Character.POS_RESTING , functionPointer: do_rest       , minimumLevel: 0, subCommand: 0 },
          { command: "roll"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_ROLL },
          { command: "ruffle"   , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_RUFFLE },

          { command: "'"        , minimumPosition: Character.POS_RESTING , functionPointer: do_say        , minimumLevel: 0, subCommand: 0 },
          { command: "say"      , minimumPosition: Character.POS_RESTING , functionPointer: do_say        , minimumLevel: 0, subCommand: 0 },
          { command: "score"    , minimumPosition: Character.POS_DEAD    , functionPointer: do_score      , minimumLevel: 0, subCommand: 0 },
          { command: "scream"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SCREAM },
          { command: "shake"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SHAKE },
          { command: "shiver"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SHIVER },
          { command: "sigh"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SIGH },
          { command: "shrug"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SHRUG },
          { command: "shout"    , minimumPosition: Character.POS_RESTING,  functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_SHOUT },
          { command: "sing"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SING },
          { command: "sip"    , minimumPosition: Character.POS_RESTING , functionPointer: do_drink        , minimumLevel: 0, subCommand: exports.SCMD_SIP },
          { command: "sit"      , minimumPosition: Character.POS_RESTING , functionPointer: do_sit        , minimumLevel: 0, subCommand: 0 },
          { command: "slap"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SLAP },
          { command: "sleep"    , minimumPosition: Character.POS_SLEEPING, functionPointer: do_sleep      , minimumLevel: 0, subCommand: 0 },
          { command: "smile"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SMILE },
          { command: "smirk"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SMIRK },
          { command: "snap"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNAP },
          { command: "snarl"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNARL },
          { command: "sneeze"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNEEZE },
          { command: "snicker"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNICKER },
          { command: "sniff"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNIFF },
          { command: "snore"    , minimumPosition: Character.POS_SLEEPING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNORE },
          { command: "snowball" , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNOWBALL },
          { command: "snuggle"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SNUGGLE },
          { command: "spank"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SPANK },
          { command: "spit"     , minimumPosition: Character.POS_SITTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SPIT },
          { command: "stand"    , minimumPosition: Character.POS_RESTING , functionPointer: do_stand      , minimumLevel: 0, subCommand: 0 },
          { command: "stare"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_STARE },
          { command: "steam"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_STEAM },
          { command: "stroke"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_STROKE },
          { command: "strut"    , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_STRUT},
          { command: "sulk"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_SULK },

          { command: "tackle"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_TACKLE },
          { command: "take"     , minimumPosition: Character.POS_RESTING , functionPointer: do_take       , minimumLevel: 0, subCommand: 0 },
          { command: "tango"    , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_TANGO },
          { command: "taste"    , minimumPosition: Character.POS_RESTING , functionPointer: do_eat        , minimumLevel: 0, subCommand: exports.SCMD_TASTE },
          { command: "taunt"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_TAUNT },
          { command: "tell"     , minimumPosition: Character.POS_DEAD    , functionPointer: do_tell       , minimumLevel: 0, subCommand: 0 },
          { command: "thank"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_THANK },
          { command: "think"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_THINK },
          { command: "tickle"   , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_TICKLE },
          { command: "twiddle"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_TWIDDLE },

          { command: "wave"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_WAVE },
          { command: "whine"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_WHINE },
          { command: "whistle"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_WHISTLE },
          { command: "wiggle"   , minimumPosition: Character.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_WIGGLE},
          { command: "wink"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_WINK},
          { command: "worship"  , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_WORSHIP },

          { command: "yawn"     , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_YAWN },
          { command: "yodel"    , minimumPosition: Character.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: exports.SCMD_YODEL },
    ];

var SOCIALS = [
          { social: "accuse", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "Accuse who??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You look accusingly at VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME looks accusingly at VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME looks accusingly at you.", toPlayer_VictimNotFound: "Accuse somebody who's not even there??", toPlayer_VictimIsSelf: "You accuse yourself.", toRoom_VictimIsSelf: "PLAYER_NAME seems to have a bad conscience." }, 
          { social: "applaud", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Clap, clap, clap.", toRoom_NoVictimSpecified: "PLAYER_NAME gives a round of applause.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "beg", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You beg the gods for mercy.  (No way you're gonna get it! :-))", toRoom_NoVictimSpecified: "The gods fall down laughing at PLAYER_NAME's request for mercy.", toPlayer_VictimFound: "You desperately try to squeeze a few coins from VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME begs you for money.  You gratiously let PLAYER_PRONOUN_OBJECT peep at your fortune.", toVictim_VictimFound: "PLAYER_NAME begs VICTIM_NAME for a dime or two -- or twenty!", toPlayer_VictimNotFound: "Your money-lender seems to be out for the moment.", toPlayer_VictimIsSelf: "How? - begging yourself for money doesn't help.", toRoom_VictimIsSelf: "#" }, 
          { social: "bleed", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You bleed profusely, making an awful mess...", toRoom_NoVictimSpecified: "PLAYER_NAME bleeds profusely, making an awful mess...", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "blush", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Your cheeks are burning.", toRoom_NoVictimSpecified: "PLAYER_NAME blushes.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "bounce", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "BOIINNNNNNGG!", toRoom_NoVictimSpecified: "PLAYER_NAME bounces around.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "bow", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "You bow deeply.", toRoom_NoVictimSpecified: "PLAYER_NAME bows deeply.", toPlayer_VictimFound: "You bow before VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME bows before VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME bows before you.", toPlayer_VictimNotFound: "Who's that?", toPlayer_VictimIsSelf: "You kiss your toes.", toRoom_VictimIsSelf: "PLAYER_NAME folds up like a jacknife and kisses PLAYER_PRONOUN_POSSESSIVE own toes." }, 
          { social: "brb", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Come back soon!", toRoom_NoVictimSpecified: "PLAYER_NAME will be right back!", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "burp", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You burp loudly.", toRoom_NoVictimSpecified: "PLAYER_NAME burps loudly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "cackle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You cackle gleefully.", toRoom_NoVictimSpecified: "PLAYER_NAME throws back PLAYER_PRONOUN_POSSESSIVE head and cackles with insane glee!", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "chuckle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You chuckle politely.", toRoom_NoVictimSpecified: "PLAYER_NAME chuckles politely.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "clap", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You clap your small hands together.", toRoom_NoVictimSpecified: "PLAYER_NAME shows PLAYER_PRONOUN_POSSESSIVE approval by clapping PLAYER_PRONOUN_POSSESSIVE small hands together.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "comb", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You comb your hair -- perfect.", toRoom_NoVictimSpecified: "PLAYER_NAME combs PLAYER_PRONOUN_POSSESSIVE hair, what a dashing specimen!", toPlayer_VictimFound: "You patiently untangle VICTIM_NAME's hair -- what a mess!", toRoom_VictimFound: "PLAYER_NAME tries patiently to untangle VICTIM_NAME's hair.", toVictim_VictimFound: "PLAYER_NAME pulls your hair in an attempt to comb it.", toPlayer_VictimNotFound: "That person is not here.", toPlayer_VictimIsSelf: "You pull your hair, but it will not be combed.", toRoom_VictimIsSelf: "PLAYER_NAME tries to comb PLAYER_PRONOUN_POSSESSIVE tangled hair." }, 
          { social: "comfort", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "Do you feel uncomfortable?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You comfort VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME comforts VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME comforts you.", toPlayer_VictimNotFound: "Comfort who?", toPlayer_VictimIsSelf: "You make a vain attempt to comfort yourself.", toRoom_VictimIsSelf: "#" }, 
          { social: "cough", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Yuck, try to cover your mouth next time!", toRoom_NoVictimSpecified: "PLAYER_NAME coughs loudly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "cringe", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You cringe in terror.", toRoom_NoVictimSpecified: "PLAYER_NAME cringes in terror!", toPlayer_VictimFound: "You cringe away from VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME cringes away from VICTIM_NAME in mortal terror.", toVictim_VictimFound: "PLAYER_NAME cringes away from you.", toPlayer_VictimNotFound: "I don't see anyone by that name here.. what are you afraid of?", toPlayer_VictimIsSelf: "I beg your pardon?", toRoom_VictimIsSelf: "#" }, 
          { social: "cry", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "Waaaaah..", toRoom_NoVictimSpecified: "PLAYER_NAME bursts into tears.", toPlayer_VictimFound: "You cry on VICTIM_PRONOUN_POSSESSIVE shoulder.", toRoom_VictimFound: "PLAYER_NAME cries on VICTIM_NAME's shoulder.", toVictim_VictimFound: "PLAYER_NAME cries on your shoulder.", toPlayer_VictimNotFound: "Who's that?", toPlayer_VictimIsSelf: "You cry to yourself.", toRoom_VictimIsSelf: "PLAYER_NAME sobs quietly to PLAYER_PRONOUN_OBJECTself." }, 
          { social: "cuddle", minimumVictimPosition: Character.POS_RESTING, hideFlag: true, toPlayer_NoVictimSpecified: "Who do you feel like cuddling today?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You cuddle VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME cuddles VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME cuddles you.", toPlayer_VictimNotFound: "They aren't here.", toPlayer_VictimIsSelf: "You must feel very cuddly indeed.  :)", toRoom_VictimIsSelf: "#" }, 
          { social: "curse", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You swear loudly for a long time.", toRoom_NoVictimSpecified: "PLAYER_NAME swears: #@*%%*&^$$%@*&!!!!!!", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "curtsey", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You curtsey to your audience.", toRoom_NoVictimSpecified: "PLAYER_NAME curtseys gracefully.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "dance", minimumVictimPosition: Character.POS_STANDING, hideFlag: true, toPlayer_NoVictimSpecified: "Feels silly, doesn't it?", toRoom_NoVictimSpecified: "PLAYER_NAME tries to dance breakdance but nearly breaks PLAYER_PRONOUN_POSSESSIVE neck!", toPlayer_VictimFound: "You lead VICTIM_PRONOUN_OBJECT to the dancefloor.", toRoom_VictimFound: "PLAYER_NAME sends VICTIM_NAME across the dancefloor.", toVictim_VictimFound: "PLAYER_NAME sends you across the dancefloor.", toPlayer_VictimNotFound: "Eh, WHO?", toPlayer_VictimIsSelf: "You skip and dance around by yourself.", toRoom_VictimIsSelf: "PLAYER_NAME skips a light Fandango." }, 
          { social: "daydream", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You dream of better times.", toRoom_NoVictimSpecified: "PLAYER_NAME looks absent-minded, PLAYER_PRONOUN_POSSESSIVE eyes staring into space.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "drool", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You start to drool.", toRoom_NoVictimSpecified: "PLAYER_NAME starts to drool.", toPlayer_VictimFound: "You drool all over VICTIM_NAME.", toRoom_VictimFound: "PLAYER_NAME drools all over VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME drools all over you.", toPlayer_VictimNotFound: "Pardon??", toPlayer_VictimIsSelf: "Sure, go ahead and drool...yuk!", toRoom_VictimIsSelf: "PLAYER_NAME drools on PLAYER_PRONOUN_OBJECTself.  What a sight." }, 
          { social: "embrace", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You reach but come away empty.  :(", toRoom_NoVictimSpecified: "PLAYER_NAME reaches out for an embrace, but no one is there.", toPlayer_VictimFound: "You embrace VICTIM_PRONOUN_OBJECT warmly.", toRoom_VictimFound: "PLAYER_NAME embraces VICTIM_NAME warmly.", toVictim_VictimFound: "PLAYER_NAME embraces you warmly.", toPlayer_VictimNotFound: "Alas, your embracee is not here.", toPlayer_VictimIsSelf: "You embrace yourself??", toRoom_VictimIsSelf: "PLAYER_NAME wraps his arms around himself for a warm self-embrace." }, 
          { social: "fart", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Where are your manners?", toRoom_NoVictimSpecified: "PLAYER_NAME lets off a real rip-roarer!", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "flip", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You flip head over heels.", toRoom_NoVictimSpecified: "PLAYER_NAME flips head over heels.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "flirt", minimumVictimPosition: Character.POS_RESTING, hideFlag: true, toPlayer_NoVictimSpecified: "You flirt outrageously.", toRoom_NoVictimSpecified: "PLAYER_NAME flirts outragously.", toPlayer_VictimFound: "You flirt outrageously with VICTIM_NAME.", toRoom_VictimFound: "PLAYER_NAME flirts outrageously with VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME flirts outrageously with you.", toPlayer_VictimNotFound: "Sorry, your dearly beloved is not around.", toPlayer_VictimIsSelf: "You flirt with yourself.  Must look stupid.", toRoom_VictimIsSelf: "PLAYER_NAME thinks PLAYER_PRONOUN_SUBJECT is the most wonderful person in the world." }, 
          { social: "fondle", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "Who needs to be fondled?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You fondly fondle VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME fondly fondles VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME fondly fondles you.", toPlayer_VictimNotFound: "You fondly try to fondle someone not in the room, but who cares.", toPlayer_VictimIsSelf: "You fondly fondle yourself, feels funny doesn't it?", toRoom_VictimIsSelf: "PLAYER_NAME fondly fondles PLAYER_PRONOUN_OBJECTself -- this is going too far!!" }, 
          { social: "french", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "French whom??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You give VICTIM_NAME a long and passionate kiss, it seems to take forever...", toRoom_VictimFound: "PLAYER_NAME kisses VICTIM_NAME passionately.", toVictim_VictimFound: "PLAYER_NAME gives you a long and passionate kiss, it seems to take forever...", toPlayer_VictimNotFound: "Your heart is filled with despair as that person is not here.", toPlayer_VictimIsSelf: "You gather yourself in your arms and try to kiss yourself.", toRoom_VictimIsSelf: "PLAYER_NAME makes an attempt at kissing PLAYER_PRONOUN_OBJECTself." }, 
          { social: "frown", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "What's bothering you?", toRoom_NoVictimSpecified: "PLAYER_NAME frowns.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "fume", minimumVictimPosition: Character.POS_RESTING, hideFlag: true, toPlayer_NoVictimSpecified: "Take it easy now!  Count to ten, very slowly.", toRoom_NoVictimSpecified: "PLAYER_NAME grits PLAYER_PRONOUN_POSSESSIVE teeth and fumes with rage.", toPlayer_VictimFound: "You stare at VICTIM_PRONOUN_OBJECT, fuming.", toRoom_VictimFound: "PLAYER_NAME stares at VICTIM_NAME, fuming with rage.", toVictim_VictimFound: "PLAYER_NAME stares at you, fuming with rage!", toPlayer_VictimNotFound: "Fume away.. they ain't here.", toPlayer_VictimIsSelf: "That's right - hate yourself!", toRoom_VictimIsSelf: "PLAYER_NAME clenches PLAYER_PRONOUN_POSSESSIVE fists and stomps his feet, fuming with anger." }, 
          { social: "gasp", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You gasp in astonishment.", toRoom_NoVictimSpecified: "PLAYER_NAME gasps in astonishment.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "giggle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You giggle.", toRoom_NoVictimSpecified: "PLAYER_NAME giggles.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "glare", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "You glare at nothing in particular.", toRoom_NoVictimSpecified: "PLAYER_NAME glares around PLAYER_PRONOUN_OBJECT.", toPlayer_VictimFound: "You glare icily at VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME glares at VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME glares icily at you, you feel cold to your bones.", toPlayer_VictimNotFound: "You try to glare at somebody who is not present.", toPlayer_VictimIsSelf: "You glare icily at your feet, they are suddenly very cold.", toRoom_VictimIsSelf: "PLAYER_NAME glares at PLAYER_PRONOUN_POSSESSIVE feet, what is bothering PLAYER_PRONOUN_OBJECT?" }, 
          { social: "greet", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Greet Who?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You greet PLAYER_PRONOUN_OBJECT with a light kiss on his cheek.", toRoom_VictimFound: "PLAYER_NAME greets VICTIM_NAME with a light kiss on its cheek.", toVictim_VictimFound: "PLAYER_NAME greets you with a light kiss on your cheek.", toPlayer_VictimNotFound: "Please -- try someone who is here?", toPlayer_VictimIsSelf: "So, you've finally discovered yourself!", toRoom_VictimIsSelf: "PLAYER_NAME greets PLAYER_PRONOUN_OBJECTself.. PLAYER_PRONOUN_SUBJECT always was a strange one." }, 
          { social: "grin", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You grin evilly.", toRoom_NoVictimSpecified: "PLAYER_NAME grins evilly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "groan", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You groan loudly.", toRoom_NoVictimSpecified: "PLAYER_NAME groans loudly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "grope", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "Whom do you wish to grope??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "Well, what sort of noise do you expect here?", toRoom_VictimFound: "PLAYER_NAME gropes VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME gropes you.", toPlayer_VictimNotFound: "Try someone who's here.", toPlayer_VictimIsSelf: "You grope yourself -- YUCK.", toRoom_VictimIsSelf: "PLAYER_NAME gropes PLAYER_PRONOUN_OBJECTself -- YUCK." }, 
          { social: "grovel", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You grovel in the dirt.", toRoom_NoVictimSpecified: "PLAYER_NAME grovels in the dirt.", toPlayer_VictimFound: "You grovel before VICTIM_PRONOUN_OBJECT", toRoom_VictimFound: "PLAYER_NAME grovels in the dirt before VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME grovels in the dirt before you.", toPlayer_VictimNotFound: "Who?", toPlayer_VictimIsSelf: "That seems a little silly to me..", toRoom_VictimIsSelf: "#" }, 
          { social: "growl", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Grrrrrrrrrr...", toRoom_NoVictimSpecified: "PLAYER_NAME growls.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "hiccup", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "*HIC*", toRoom_NoVictimSpecified: "PLAYER_NAME hiccups.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "hug", minimumVictimPosition: Character.POS_RESTING, hideFlag: true, toPlayer_NoVictimSpecified: "Hug who?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You hug VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME hugs VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME hugs you.", toPlayer_VictimNotFound: "Sorry, friend, I can't see that person here.", toPlayer_VictimIsSelf: "You hug yourself.", toRoom_VictimIsSelf: "PLAYER_NAME hugs PLAYER_PRONOUN_OBJECTself." }, 
          { social: "kiss", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Isn't there someone you want to kiss?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You kiss VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME kisses VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME kisses you.", toPlayer_VictimNotFound: "Never around when required.", toPlayer_VictimIsSelf: "All the lonely people :(", toRoom_VictimIsSelf: "#" }, 
          { social: "laugh", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You fall down laughing.", toRoom_NoVictimSpecified: "PLAYER_NAME falls down laughing.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "lick", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You lick your mouth and smile.", toRoom_NoVictimSpecified: "PLAYER_NAME licks PLAYER_PRONOUN_POSSESSIVE mouth and smiles.", toPlayer_VictimFound: "You lick VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME licks VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME licks you.", toPlayer_VictimNotFound: "Lick away, nobody's here with that name.", toPlayer_VictimIsSelf: "You lick yourself.", toRoom_VictimIsSelf: "PLAYER_NAME licks PLAYER_PRONOUN_OBJECTself -- YUCK." }, 
          { social: "love", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You love the whole world.", toRoom_NoVictimSpecified: "PLAYER_NAME loves everybody in the world.", toPlayer_VictimFound: "You tell your true feelings to VICTIM_NAME.", toRoom_VictimFound: "PLAYER_NAME whispers softly to VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME whispers to you sweet words of love.", toPlayer_VictimNotFound: "Alas, your love is not present...", toPlayer_VictimIsSelf: "Well, we already know you love yourself (lucky someone does!)", toRoom_VictimIsSelf: "PLAYER_NAME loves PLAYER_PRONOUN_OBJECTself, can you believe it?" }, 
          { social: "massage", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Massage what, thin air?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You gently massage VICTIM_NAME's shoulders.", toRoom_VictimFound: "PLAYER_NAME massages VICTIM_NAME's shoulders.", toVictim_VictimFound: "PLAYER_NAME gently massages your shoulders...ahhhhhhhhhh...", toPlayer_VictimNotFound: "You can only massage someone in the same room as you.", toPlayer_VictimIsSelf: "You practise yoga as you try to massage yourself.", toRoom_VictimIsSelf: "PLAYER_NAME gives a show on yoga-positions, trying to massage PLAYER_PRONOUN_OBJECTself." }, 
          { social: "moan", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You start to moan.", toRoom_NoVictimSpecified: "PLAYER_NAME starts moaning.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "nibble", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Nibble on who?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You nibble on VICTIM_NAME's ear.", toRoom_VictimFound: "PLAYER_NAME nibbles on VICTIM_NAME's ear.", toVictim_VictimFound: "PLAYER_NAME nibbles on your ear.", toPlayer_VictimNotFound: "Sorry, not here, better go back to dreaming about it.", toPlayer_VictimIsSelf: "You nibble on your OWN ear???????????????????", toRoom_VictimIsSelf: "PLAYER_NAME nibbles on PLAYER_PRONOUN_POSSESSIVE OWN ear (I wonder how it is done!!)." }, 
          { social: "nod", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You nod solemnly.", toRoom_NoVictimSpecified: "PLAYER_NAME nods solemnly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "nudge", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Nudge?  Nudge???  The HELL you say!!!!", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You nudge VICTIM_PRONOUN_OBJECT with your elbow.", toRoom_VictimFound: "PLAYER_NAME nudges VICTIM_NAME suggestively with PLAYER_PRONOUN_POSSESSIVE elbow.", toVictim_VictimFound: "PLAYER_NAME nudges you suggestively.  You two have an understanding.", toPlayer_VictimNotFound: "Eh?  That person isn't here, you know.", toPlayer_VictimIsSelf: "Well, just nudge yourself, but how do you get your elbow in that position?", toRoom_VictimIsSelf: "PLAYER_NAME nudges PLAYER_PRONOUN_OBJECTself with PLAYER_PRONOUN_POSSESSIVE elbows, making PLAYER_PRONOUN_OBJECT look like a large chicken." }, 
          { social: "nuzzle", minimumVictimPosition: Character.POS_RESTING, hideFlag: true, toPlayer_NoVictimSpecified: "Nuzzle who??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You nuzzle VICTIM_PRONOUN_POSSESSIVE neck softly.", toRoom_VictimFound: "PLAYER_NAME softly nuzzles VICTIM_NAME's neck.", toVictim_VictimFound: "PLAYER_NAME softly nuzzles your neck.", toPlayer_VictimNotFound: "No.. they aren't here..", toPlayer_VictimIsSelf: "I'm sorry, friend, but that's impossible.", toRoom_VictimIsSelf: "#" }, 
          { social: "pat", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Pat who??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You pat VICTIM_NAME on VICTIM_PRONOUN_POSSESSIVE head.", toRoom_VictimFound: "PLAYER_NAME pats VICTIM_NAME on VICTIM_PRONOUN_POSSESSIVE head.", toVictim_VictimFound: "PLAYER_NAME pats you on your head.", toPlayer_VictimNotFound: "Who, where, what??", toPlayer_VictimIsSelf: "You pat yourself on your head, very reassuring.", toRoom_VictimIsSelf: "PLAYER_NAME pats PLAYER_PRONOUN_OBJECTself on the head." }, 
          { social: "peer", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You peer around you, uncertain that what you see is actually true.", toRoom_NoVictimSpecified: "PLAYER_NAME peers around, looking as if PLAYER_PRONOUN_SUBJECT has trouble seeing everything clearly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "point", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You point whereto?", toRoom_NoVictimSpecified: "PLAYER_NAME points in all directions, seemingly confused.", toPlayer_VictimFound: "You point at VICTIM_PRONOUN_OBJECT -- VICTIM_PRONOUN_SUBJECT DOES look funny.", toRoom_VictimFound: "PLAYER_NAME muffles a laugh, pointing at VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME points at you... how rude!", toPlayer_VictimNotFound: "You must have a VERY long index-finger...", toPlayer_VictimIsSelf: "You point at yourself.  Insinuating something?", toRoom_VictimIsSelf: "PLAYER_NAME points at PLAYER_PRONOUN_OBJECTself, suggesting that the center of matters is PLAYER_PRONOUN_SUBJECT." }, 
          { social: "poke", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Poke who??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You poke VICTIM_PRONOUN_OBJECT in the ribs.", toRoom_VictimFound: "PLAYER_NAME pokes VICTIM_NAME in the ribs.", toVictim_VictimFound: "PLAYER_NAME pokes you in the ribs.", toPlayer_VictimNotFound: "You can't poke someone who's not here!", toPlayer_VictimIsSelf: "You poke yourself in the ribs, feeling very silly.", toRoom_VictimIsSelf: "PLAYER_NAME pokes PLAYER_PRONOUN_OBJECTself in the ribs, looking very sheepish." }, 
          { social: "ponder", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You ponder over matters as they appear to you at this moment.", toRoom_NoVictimSpecified: "PLAYER_NAME sinks deeply into PLAYER_PRONOUN_POSSESSIVE own thoughts.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "pout", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Ah, don't take it so hard.", toRoom_NoVictimSpecified: "PLAYER_NAME pouts.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "pray", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You feel righteous, and maybe a little foolish.", toRoom_NoVictimSpecified: "PLAYER_NAME begs and grovels to the powers that be.", toPlayer_VictimFound: "You crawl in the dust before VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME falls down and grovels in the dirt before VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME kisses the dirt at your feet.", toPlayer_VictimNotFound: "No such person around; your prayers vanish into the endless voids.", toPlayer_VictimIsSelf: "Talk about narcissism...", toRoom_VictimIsSelf: "PLAYER_NAME performs some strange yoga-exercises and mumbles a prayer to PLAYER_PRONOUN_OBJECTself." }, 
          { social: "puke", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You puke.", toRoom_NoVictimSpecified: "PLAYER_NAME pukes.", toPlayer_VictimFound: "You puke on VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME pukes on VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME pukes on your clothes!", toPlayer_VictimNotFound: "Once again?", toPlayer_VictimIsSelf: "You puke on yourself.", toRoom_VictimIsSelf: "PLAYER_NAME pukes on PLAYER_PRONOUN_POSSESSIVE clothes." }, 
          { social: "punch", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Punch the air?  Sure, go ahead, fine by me...", toRoom_NoVictimSpecified: "PLAYER_NAME starts shadow-boxing.", toPlayer_VictimFound: "You punch VICTIM_PRONOUN_OBJECT right in the face!  Yuck, the BLOOD!", toRoom_VictimFound: "PLAYER_NAME punches weakly at VICTIM_NAME, missing by miles.", toVictim_VictimFound: "PLAYER_NAME tries a punch at you but misses by a good quarter-mile...", toPlayer_VictimNotFound: "Punch who?", toPlayer_VictimIsSelf: "You punch yourself in the face resulting in your own nose being bloodied.", toRoom_VictimIsSelf: "PLAYER_NAME punches PLAYER_PRONOUN_OBJECTself in the face, looking kind of stupid." }, 
          { social: "purr", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "MMMMEEEEEEEEOOOOOOOOOWWWWWWWWWWWW.", toRoom_NoVictimSpecified: "PLAYER_NAME purrs contentedly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "roll", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You roll your eyes in disgust.", toRoom_NoVictimSpecified: "PLAYER_NAME rolls PLAYER_PRONOUN_POSSESSIVE eyes in disgust.", toPlayer_VictimFound: "You look at VICTIM_PRONOUN_OBJECT and roll your eyes in disgust.", toRoom_VictimFound: "PLAYER_NAME looks at VICTIM_NAME in contempt and rolls PLAYER_PRONOUN_POSSESSIVE eyes with disgust.", toVictim_VictimFound: "PLAYER_NAME stares at you and rolls PLAYER_PRONOUN_POSSESSIVE eyes in digust.", toPlayer_VictimNotFound: "Um... who?", toPlayer_VictimIsSelf: "You roll your eyes, disgusted with your own incompetence.", toRoom_VictimIsSelf: "PLAYER_NAME rolls PLAYER_PRONOUN_POSSESSIVE eyes, disgusted with PLAYER_PRONOUN_OBJECTself." }, 
          { social: "ruffle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You've got to ruffle SOMEONE.", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You ruffle VICTIM_NAME's hair playfully.", toRoom_VictimFound: "PLAYER_NAME ruffles VICTIM_NAME's hair playfully.", toVictim_VictimFound: "PLAYER_NAME ruffles your hair playfully.", toPlayer_VictimNotFound: "Might be a bit difficult.", toPlayer_VictimIsSelf: "You ruffle your hair, wondering how far you can go before the rest think you're crazy.", toRoom_VictimIsSelf: "PLAYER_NAME ruffles PLAYER_PRONOUN_POSSESSIVE hair -- weirdo!" }, 
          { social: "scream", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "ARRRRRRRRRRGH!!!!!", toRoom_NoVictimSpecified: "PLAYER_NAME screams loudly!", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "shake", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "You shake your head.", toRoom_NoVictimSpecified: "PLAYER_NAME shakes PLAYER_PRONOUN_POSSESSIVE head.", toPlayer_VictimFound: "You shake VICTIM_PRONOUN_POSSESSIVE hand.", toRoom_VictimFound: "PLAYER_NAME shakes VICTIM_NAME's hand.", toVictim_VictimFound: "PLAYER_NAME shakes your hand.", toPlayer_VictimNotFound: "Sorry good buddy, but that person doesn't seem to be here.", toPlayer_VictimIsSelf: "You are shaken by yourself.", toRoom_VictimIsSelf: "PLAYER_NAME shakes and quivers like a bowlful of jelly." }, 
          { social: "shiver", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Brrrrrrrrr.", toRoom_NoVictimSpecified: "PLAYER_NAME shivers uncomfortably.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "shrug", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You shrug.", toRoom_NoVictimSpecified: "PLAYER_NAME shrugs helplessly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "sigh", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You sigh.", toRoom_NoVictimSpecified: "PLAYER_NAME sighs loudly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "sing", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You raise your clear (?) voice towards the sky.", toRoom_NoVictimSpecified: "SEEK SHELTER AT ONCE!  PLAYER_NAME has begun to sing.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "slap", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Normally you slap SOMEBODY.", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You slap VICTIM_NAME.", toRoom_VictimFound: "PLAYER_NAME slaps VICTIM_NAME.", toVictim_VictimFound: "You are slapped by PLAYER_NAME.", toPlayer_VictimNotFound: "How about slapping someone in the same room as you??", toPlayer_VictimIsSelf: "You slap yourself, silly you.", toRoom_VictimIsSelf: "PLAYER_NAME slaps PLAYER_PRONOUN_OBJECTself, really strange..." }, 
          { social: "smile", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You smile happily.", toRoom_NoVictimSpecified: "PLAYER_NAME smiles happily.", toPlayer_VictimFound: "You smile at VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME beams a smile at VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME smiles at you.", toPlayer_VictimNotFound: "There's no one by that name around.", toPlayer_VictimIsSelf: "You smile at yourself.", toRoom_VictimIsSelf: "PLAYER_NAME smiles at PLAYER_PRONOUN_OBJECTself." }, 
          { social: "smirk", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You smirk.", toRoom_NoVictimSpecified: "PLAYER_NAME smirks.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "snap", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "PRONTO!  You snap your fingers.", toRoom_NoVictimSpecified: "PLAYER_NAME snaps PLAYER_PRONOUN_POSSESSIVE fingers.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "snarl", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You snarl like a viscious animal.", toRoom_NoVictimSpecified: "PLAYER_NAME snarls like a cornered, viscious animal.", toPlayer_VictimFound: "You snarl at VICTIM_PRONOUN_OBJECT angrily.  Control yourself!", toRoom_VictimFound: "PLAYER_NAME snarls angrily at VICTIM_NAME.  PLAYER_PRONOUN_SUBJECT$u seems incapable of controlling PLAYER_PRONOUN_OBJECTself.", toVictim_VictimFound: "PLAYER_NAME snarls viciously at you.  $UPLAYER_PRONOUN_POSSESSIVE self-control seems to have gone bananas.", toPlayer_VictimNotFound: "Eh?  Who?  Not here, my friend.", toPlayer_VictimIsSelf: "You snarl at yourself, obviously suffering from schizophrenia.", toRoom_VictimIsSelf: "PLAYER_NAME snarls at PLAYER_PRONOUN_OBJECTself, and suddenly looks very frightened." }, 
          { social: "sneeze", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Gesundheit!", toRoom_NoVictimSpecified: "PLAYER_NAME sneezes.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "snicker", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You snicker softly.", toRoom_NoVictimSpecified: "PLAYER_NAME snickers softly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "sniff", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You sniff sadly.  *SNIFF*", toRoom_NoVictimSpecified: "PLAYER_NAME sniffs sadly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "snore", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Zzzzzzzzzzzzzzzzz.", toRoom_NoVictimSpecified: "PLAYER_NAME snores loudly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "snowball", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Who do you want to throw a snowball at??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You throw a snowball in VICTIM_NAME's face.", toRoom_VictimFound: "PLAYER_NAME conjures a snowball from thin air and throws it at VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME conjures a snowball from thin air and throws it at you.", toPlayer_VictimNotFound: "You stand with the snowball in your hand because your victim is not here.", toPlayer_VictimIsSelf: "You conjure a snowball from thin air and throw it at yourself.", toRoom_VictimIsSelf: "PLAYER_NAME conjures a snowball out of the thin air and throws it at PLAYER_PRONOUN_OBJECTself." }, 
          { social: "snuggle", minimumVictimPosition: Character.POS_RESTING, hideFlag: true, toPlayer_NoVictimSpecified: "Who?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "you snuggle VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME snuggles up to VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME snuggles up to you.", toPlayer_VictimNotFound: "They aren't here.", toPlayer_VictimIsSelf: "Hmmm...", toRoom_VictimIsSelf: "#" }, 
          { social: "spank", minimumVictimPosition: Character.POS_STANDING, hideFlag: false, toPlayer_NoVictimSpecified: "You spank WHO?  Eh?  How?  Naaah, you'd never.", toRoom_NoVictimSpecified: "PLAYER_NAME spanks the thin air with a flat hand.", toPlayer_VictimFound: "You spank VICTIM_PRONOUN_OBJECT vigorously, long and hard.  Your hand hurts.", toRoom_VictimFound: "PLAYER_NAME spanks VICTIM_NAME over PLAYER_PRONOUN_POSSESSIVE knee.  It hurts to even watch.", toVictim_VictimFound: "PLAYER_NAME spanks you long and hard.  You feel like a naughty child.", toPlayer_VictimNotFound: "Are you sure about this?  I mean, that person isn't even here!", toPlayer_VictimIsSelf: "Hmm, not likely.", toRoom_VictimIsSelf: "#" }, 
          { social: "spit", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You spit over your left shoulder.", toRoom_NoVictimSpecified: "PLAYER_NAME spits over PLAYER_PRONOUN_POSSESSIVE left shoulder.", toPlayer_VictimFound: "You spit on VICTIM_PRONOUN_OBJECT.", toRoom_VictimFound: "PLAYER_NAME spits in VICTIM_NAME's face.", toVictim_VictimFound: "PLAYER_NAME spits in your face.", toPlayer_VictimNotFound: "Can you spit that far?", toPlayer_VictimIsSelf: "You drool down your front.", toRoom_VictimIsSelf: "PLAYER_NAME drools down PLAYER_PRONOUN_POSSESSIVE front." }, 
          { social: "squeeze", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Where, what, how, WHO???", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You squeeze VICTIM_PRONOUN_OBJECT fondly.", toRoom_VictimFound: "PLAYER_NAME squeezes VICTIM_NAME fondly.", toVictim_VictimFound: "PLAYER_NAME squeezes you fondly.", toPlayer_VictimNotFound: "Where, what, how, WHO???", toPlayer_VictimIsSelf: "You squeeze yourself -- try to relax a little!", toRoom_VictimIsSelf: "PLAYER_NAME squeezes PLAYER_PRONOUN_OBJECTself." }, 
          { social: "stare", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "You stare at the sky.", toRoom_NoVictimSpecified: "PLAYER_NAME stares at the sky.", toPlayer_VictimFound: "You stare dreamily at VICTIM_NAME, completely lost in VICTIM_PRONOUN_POSSESSIVE eyes..", toRoom_VictimFound: "PLAYER_NAME stares dreamily at VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME stares dreamily at you, completely lost in your eyes.", toPlayer_VictimNotFound: "You stare and stare but can't see that person anywhere...", toPlayer_VictimIsSelf: "You stare dreamily at yourself - enough narcissism for now.", toRoom_VictimIsSelf: "PLAYER_NAME stares dreamily at PLAYER_PRONOUN_OBJECTself - NARCISSIST!" }, 
          { social: "steam", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You let out some steam, much to the others' relief (and your own!)", toRoom_NoVictimSpecified: "PLAYER_NAME lets out a lot of steam, much to your relief.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "stroke", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Whose thigh would you like to stroke?", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You gently stroke VICTIM_PRONOUN_POSSESSIVE inner thigh.", toRoom_VictimFound: "PLAYER_NAME gently strokes VICTIM_NAME's inner thigh... hmm...", toVictim_VictimFound: "PLAYER_NAME gently strokes your inner thigh with feathery touches.", toPlayer_VictimNotFound: "That person is not within reach.", toPlayer_VictimIsSelf: "You are about to do something you would rather not be caught doing.", toRoom_VictimIsSelf: "PLAYER_NAME starts to do something disgusting and then stops." }, 
          { social: "strut", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Strut your stuff.", toRoom_NoVictimSpecified: "PLAYER_NAME struts proudly.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "sulk", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You sulk.", toRoom_NoVictimSpecified: "PLAYER_NAME sulks in the corner.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "tackle", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "You tackle the air.  It stands not a chance.", toRoom_NoVictimSpecified: "PLAYER_NAME starts running around PLAYER_PRONOUN_OBJECTself in a desparate attempt to tackle the air.", toPlayer_VictimFound: "You ruthlessly tackle VICTIM_PRONOUN_OBJECT to the ground.", toRoom_VictimFound: "PLAYER_NAME ruthlessly tackles VICTIM_NAME, pinning VICTIM_PRONOUN_OBJECT to the ground.", toVictim_VictimFound: "PLAYER_NAME suddenly lunges at you and tackles you to the ground!", toPlayer_VictimNotFound: "That person isn't here (luck for them, it would seem...)", toPlayer_VictimIsSelf: "Tackle yourself?  Yeah, right....", toRoom_VictimIsSelf: "PLAYER_NAME makes a dextrous move and kicks PLAYER_PRONOUN_POSSESSIVE left leg away with PLAYER_PRONOUN_POSSESSIVE right." }, 
          { social: "tango", minimumVictimPosition: Character.POS_STANDING, hideFlag: false, toPlayer_NoVictimSpecified: "With whom would you like to tango?", toRoom_NoVictimSpecified: "PLAYER_NAME puts a rose between PLAYER_PRONOUN_POSSESSIVE teeth, but takes out it since noone joins PLAYER_PRONOUN_OBJECT.", toPlayer_VictimFound: "You put a rose between your teeth and tango with VICTIM_PRONOUN_OBJECT seductively.", toRoom_VictimFound: "PLAYER_NAME puts a rose between PLAYER_PRONOUN_POSSESSIVE teeth and tangos with VICTIM_NAME seductively.", toVictim_VictimFound: "PLAYER_NAME puts a rose between PLAYER_PRONOUN_POSSESSIVE teeth and tangos with you seductively.", toPlayer_VictimNotFound: "That person isn't around.  Better sit this one out.", toPlayer_VictimIsSelf: "Feels rather stupid, doesn't it?", toRoom_VictimIsSelf: "PLAYER_NAME puts a rose between PLAYER_PRONOUN_POSSESSIVE teeth and tries to tango with PLAYER_PRONOUN_OBJECTself." }, 
          { social: "taunt", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You taunt the nothing in front of you.", toRoom_NoVictimSpecified: "PLAYER_NAME taunts something that seems to be right in front of PLAYER_PRONOUN_OBJECT.", toPlayer_VictimFound: "You taunt VICTIM_PRONOUN_OBJECT, to your own delight.", toRoom_VictimFound: "PLAYER_NAME taunts VICTIM_NAME rather insultingly.  $UPLAYER_NAME seems to enjoy it tremendously.", toVictim_VictimFound: "PLAYER_NAME taunts you.  It really hurts your feelings.", toPlayer_VictimNotFound: "Hmmmmmmm.....nope, no one by that name here.", toPlayer_VictimIsSelf: "You taunt yourself, almost making you cry...:(", toRoom_VictimIsSelf: "PLAYER_NAME taunts PLAYER_PRONOUN_OBJECTself to tears." }, 
          { social: "thank", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "Thank you too.", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You thank VICTIM_NAME heartily.", toRoom_VictimFound: "PLAYER_NAME thanks VICTIM_NAME heartily.", toVictim_VictimFound: "PLAYER_NAME thanks you heartily.", toPlayer_VictimNotFound: "No one answers to that name here.", toPlayer_VictimIsSelf: "You thank yourself since nobody else wants to!", toRoom_VictimIsSelf: "PLAYER_NAME thanks PLAYER_PRONOUN_OBJECTself since you won't." }, 
          { social: "think", minimumVictimPosition: Character.POS_DEAD, hideFlag: true, toPlayer_NoVictimSpecified: "You think about life, the universe and everything.", toRoom_NoVictimSpecified: "PLAYER_NAME sinks deeply into thought about the meaning of life.", toPlayer_VictimFound: "You think about what purpose VICTIM_PRONOUN_SUBJECT has in relation to your part of life.", toRoom_VictimFound: "PLAYER_NAME stops and thinks about VICTIM_NAME, completely lost in thought.", toVictim_VictimFound: "Your ears burn as PLAYER_NAME thinks about you.. you wonder what about.", toPlayer_VictimNotFound: "You'd better think harder, if you hope to make contact!", toPlayer_VictimIsSelf: "You think about yourself (for once).", toRoom_VictimIsSelf: "PLAYER_NAME thinks about PLAYER_PRONOUN_OBJECTself for a change.....(?)" }, 
          { social: "tickle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Who do you want to tickle??", toRoom_NoVictimSpecified: "#", toPlayer_VictimFound: "You tickle VICTIM_NAME.", toRoom_VictimFound: "PLAYER_NAME tickles VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME tickles you - hee hee hee.", toPlayer_VictimNotFound: "Who is that??", toPlayer_VictimIsSelf: "You tickle yourself, how funny!", toRoom_VictimIsSelf: "PLAYER_NAME tickles PLAYER_PRONOUN_OBJECTself." }, 
          { social: "twiddle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You patiently twiddle your thumbs.", toRoom_NoVictimSpecified: "PLAYER_NAME patiently twiddles PLAYER_PRONOUN_POSSESSIVE thumbs.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "wave", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You wave.", toRoom_NoVictimSpecified: "PLAYER_NAME waves happily.", toPlayer_VictimFound: "You wave goodbye to VICTIM_NAME.", toRoom_VictimFound: "PLAYER_NAME waves goodbye to VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME waves goodbye to you.  Have a good journey.", toPlayer_VictimNotFound: "They didn't wait for you to wave goodbye.", toPlayer_VictimIsSelf: "Are you going on adventures as well??", toRoom_VictimIsSelf: "PLAYER_NAME waves goodbye to PLAYER_PRONOUN_OBJECTself." }, 
          { social: "whine", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You whine pitifully.", toRoom_NoVictimSpecified: "PLAYER_NAME whines pitifully about the whole situation.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "whistle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You whistle appreciatively.", toRoom_NoVictimSpecified: "PLAYER_NAME whistles appreciatively.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "wiggle", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Your wiggle your bottom.", toRoom_NoVictimSpecified: "PLAYER_NAME wiggles PLAYER_PRONOUN_POSSESSIVE bottom.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "wink", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "Have you got something in your eye?", toRoom_NoVictimSpecified: "PLAYER_NAME winks suggestively.", toPlayer_VictimFound: "You wink suggestively at VICTIM_NAME.", toRoom_VictimFound: "PLAYER_NAME winks at VICTIM_NAME.", toVictim_VictimFound: "PLAYER_NAME winks suggestively at you.", toPlayer_VictimNotFound: "No one with that name is present.", toPlayer_VictimIsSelf: "You wink at yourself?? -- what are you up to?", toRoom_VictimIsSelf: "PLAYER_NAME winks at PLAYER_PRONOUN_OBJECTself -- something strange is going on..." }, 
          { social: "worship", minimumVictimPosition: Character.POS_RESTING, hideFlag: false, toPlayer_NoVictimSpecified: "You find yourself head-down in the dirt, worshipping.", toRoom_NoVictimSpecified: "PLAYER_NAME starts worshipping nothing at all.", toPlayer_VictimFound: "You fall to your knees and worship VICTIM_PRONOUN_OBJECT deeply.", toRoom_VictimFound: "PLAYER_NAME falls to PLAYER_PRONOUN_POSSESSIVE knees, worshipping VICTIM_NAME with uncanny dedication.", toVictim_VictimFound: "PLAYER_NAME kneels before you in solemn worship.", toPlayer_VictimNotFound: "Uh.. who?  They're not here, pal.", toPlayer_VictimIsSelf: "You seem sure to have found a true deity.....", toRoom_VictimIsSelf: "PLAYER_NAME falls to PLAYER_PRONOUN_POSSESSIVE knees and humbly worships PLAYER_PRONOUN_OBJECTself." }, 
          { social: "yawn", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "Gosh, will you trade those teeth for mine?? -- you get my glasseyes in the bargain too!", toRoom_NoVictimSpecified: "PLAYER_NAME yawns.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
          { social: "yodel", minimumVictimPosition: Character.POS_DEAD, hideFlag: false, toPlayer_NoVictimSpecified: "You start yodelling loudly and rather beautifully in your own ears.", toRoom_NoVictimSpecified: "PLAYER_NAME starts a yodelling session that goes right to the bone.", toPlayer_VictimFound: "", toRoom_VictimFound: "", toVictim_VictimFound: "", toPlayer_VictimNotFound: "", toPlayer_VictimIsSelf: "", toRoom_VictimIsSelf: "" }, 
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

Interpreter.prototype.getCommand = function(input) {
    if(input.length === 0) {
        return null;
    }    
    
    var cleanedInput = this.cleanInput(input);
    var cleanedTokens = this.tokenize(cleanedInput);

    if(cleanedTokens.length < 1) {
        return null;
    }
    
    var commandToken = cleanedTokens[0];
    
    if(commandToken === null || commandToken === " ") {
        return null;
    }
    
    var command = null;
    
    for(var i = 0; i < COMMAND_LIST.length; i++) {
        if(COMMAND_LIST[i].command.substr(0, commandToken.length) === commandToken) {
            command = COMMAND_LIST[i];
            command.subInput = input.replace(commandToken, '').trim();
            break;
        }
    }

    if(command !== null) {
        if(cleanedTokens.length > 1) {
            command.tokens = cleanedTokens.slice(1);
        }
        else {
            command.tokens = [];
        }
    }

    return command;
};

Interpreter.prototype.handleInput = function(character, input) {
    var command = this.getCommand(input);

    if(command === null) {
        if(character.socket !== undefined) {
            character.socket.emit('message', { message: "Huh?!?"});
        }
    }
    else {
        if(character.position < command.minimumPosition) {
            switch(character.position) {
                case Character.POS_DEAD:
                    character.emitMessage("Lie still; you are DEAD!!! :-(" );
                    break;
                case Character.POS_INCAP:
                case Character.POS_MORTALLYW:
                    character.emitMessage("You are in a pretty bad shape, unable to do anything!");
                    break;
                case Character.POS_STUNNED:
                    character.emitMessage("All you can do right now is think about the stars!");
                    break;
                case Character.POS_SLEEPING:
                    character.emitMessage("In your dreams, or what?");
                    break;
                case Character.POS_RESTING:
                    character.emitMessage("Nah... You feel too relaxed to do that...");
                    break;
                case Character.POS_SITTING:
                    character.emitMessage("Maybe you should get on your feet first?");
                    break;
                case Character.POS_FIGHTING:
                    character.emitMessage("No way!  You're fighting for your life!");
                    break;                    
            }
        }
        else {
            command.functionPointer(character, command);
        }
    }
    
    if(!character.isNpc()) {
        character.save(function(err) {
           // TODO: Log error?
        });
    }
};

function do_say(character, command) {
    character.say(command.subInput.trim());
}

function do_gen_comm(character, command) {
    character.generalCommunication(command.subCommand, command.subInput.trim());
}

function do_move(character, command) {
    character.move(command.subCommand);
}

function do_action(character, command) {
    var action = SOCIALS[command.subCommand];
    character.social(action, command.subInput.trim());
}

function do_stand(character) {
    character.stand();
}

function do_sit(character) {
    character.sit();
}

function do_rest(character) {
    character.rest();
}

function do_sleep(character) {
    character.sleep();
}

function do_take(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage('Take what?');
    }
    else {
        character.takeItem(command.tokens[0]);
    }
}

function do_donate(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage('Donate what?');
    }
    else {
        character.donateItem(command.tokens[0]);
    }
}

function do_drop(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage('Drop what?');
    }
    else {
        character.dropItem(command.tokens[0]);
    }
}

function do_junk(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage('Junk what?');
    }
    else {
        character.junkItem(command.tokens[0]);
    }
}

function do_eat(character, command) {
    if(command.tokens.length === 0) {
        if(command.subCommand === SCMD_EAT) {
            character.emitMessage('Eat what?');
        }
        else if(command.subCommand === SCMD_TASTE) {
            character.emitMessage('Taste what?');
        }
    }
    else {
        
        console.log(command.subCommand);
        
        character.eatItem(command.tokens[0], command.subCommand);
    }
}


function do_drink(character, command) {
    if(command.tokens.length === 0) {
        if(command.subCommand === SCMD_DRINK) {
            character.emitMessage('Drink what?');
        }
        else if(command.subCommand === SCMD_SIP) {
            character.emitMessage('Sip what?');
        }
    }
    else {
        if(command.tokens[0].toLowerCase() === 'from') {
            character.drinkItem(command.tokens[1], command.subCommand);
        }
        else {
            character.drinkItem(command.tokens[0], command.subCommand);
        }
    }
}

function do_score(character) {
    character.listScore();
}

function do_inventory(character) {
    character.listInventory();
}

function do_tell(character, command) {
    if(command.tokens.length > 0) {
        character.tell(command.tokens[0], command.subInput.replace(command.tokens[0], '').trim());
    }
    else {
        character.emitMessage('Tell what to who?');
    }
}











// Exports
module.exports = Interpreter;