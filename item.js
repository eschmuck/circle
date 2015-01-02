var mongoose = require('mongoose');
var schema = mongoose.Schema;

var itemSchema = new schema({
    id: Number,
    keywords: [ String ],
    shortDescription: String,
    longDescription: String,
    isGlowing: Boolean,
    canBeDonated: Boolean,
    canBeTaken: Boolean,
    type: String,
    wearSlots: [ Number ],
    
    capacity: Number,
    containsLiquid: Number,
    isPoisoned: Boolean
    
}, { discrimatorKey: 'type'});


global.ITEM_LIGHT = "Light";
global.ITEM_SCROLL = "Scroll";
global.ITEM_WAND = "Wand";
global.ITEM_STAFF = "Staff";
global.ITEM_WEAPON = "Weapon";
global.ITEM_TREASURE = "Treasure";
global.ITEM_ARMOR = "Armor";
global.ITEM_POTION = "Potion";
global.ITEM_OTHER = "Other";
global.ITEM_TRASH = "Trash";
global.ITEM_CONTAINER = "Container";
global.ITEM_NOTE = "Note";
global.ITEM_DRINKCONTAINER  = "DrinkContainer";
global.ITEM_KEY = "Key";
global.ITEM_FOOD  = "Food";
global.ITEM_MONEY = "Money";
global.ITEM_PEN = "Pen";
global.ITEM_BOAT = "Boat";
global.ITEM_FOUNTAIN = "Fountain";

global.MAX_WEARS = 17;

global.WEAR_LIGHT    =  0;
global.WEAR_FINGER_R =  1;
global.WEAR_FINGER_L =  2;
global.WEAR_NECK_1   =  3;
global.WEAR_NECK_2   =  4;
global.WEAR_BODY     =  5;
global.WEAR_HEAD     =  6;
global.WEAR_LEGS     =  7;
global.WEAR_FEET     =  8;
global.WEAR_HANDS    =  9;
global.WEAR_ARMS     = 10;
global.WEAR_SHIELD   = 11;
global.WEAR_ABOUT    = 12;
global.WEAR_WAIST    = 13;
global.WEAR_WRIST_R  = 14;
global.WEAR_WRIST_L  = 15;
global.WEAR_WIELD    = 16;
global.WEAR_HOLD     = 17;

global.WEAR_WHERE = [
    "  <used as light>      ",
    "  <worn on finger>     ",
    "  <worn on finger>     ",
    "  <worn around neck>   ",
    "  <worn around neck>   ",
    "  <worn on body>       ",
    "  <worn on head>       ",
    "  <worn on legs>       ",
    "  <worn on feet>       ",
    "  <worn on hands>      ",
    "  <worn on arms>       ",
    "  <worn as shield>     ",
    "  <worn about body>    ",
    "  <worn about waist>   ",
    "  <worn around wrist>  ",
    "  <worn around wrist>  ",
    "  <wielded>            ",
    "  <held>               "
  ];

global.DRINK_NAMES = [
  "water",
  "beer",
  "wine",
  "ale",
  "dark ale",
  "whisky",
  "lemonade",
  "firebreather",
  "local speciality",
  "slime mold juice",
  "milk",
  "tea",
  "coffee",
  "blood",
  "salt water",
  "clear water"
];

global.DRINK_AFFECTS = [
  { Drunkness: 0,  Fullness: 1, Thirst: 10 },
  { Drunkness: 3,  Fullness: 2, Thirst: 5 },
  { Drunkness: 5,  Fullness: 2, Thirst: 5 },
  { Drunkness: 2,  Fullness: 2, Thirst: 5 },
  { Drunkness: 1,  Fullness: 2, Thirst: 5 },
  { Drunkness: 6,  Fullness: 1, Thirst: 4 },
  { Drunkness: 0,  Fullness: 1, Thirst: 8 },
  { Drunkness: 10, Fullness: 0, Thirst: 0 },
  { Drunkness: 3,  Fullness: 3, Thirst: 3 },
  { Drunkness: 0,  Fullness: 4, Thirst: -8 },
  { Drunkness: 0,  Fullness: 3, Thirst: 6 },
  { Drunkness: 0,  Fullness: 1, Thirst: 6 },
  { Drunkness: 0,  Fullness: 1, Thirst: 6 },
  { Drunkness: 0,  Fullness: 2, Thirst: -1 },
  { Drunkness: 0,  Fullness: 1, Thirst: -2 },
  { Drunkness: 0,  Fullness: 0, Thirst: 13 }
];

itemSchema.statics.load = function(id, item, callback, commands, world, instructionNumber) {
 	this.find({ id: id }, function(err, docs) {
 		callback(docs, item, commands, world, instructionNumber);
 	});
};

var itemModel = mongoose.model('item', itemSchema);

module.exports = {
	schema: itemSchema,
	item: itemModel
};
