var mongoose = require('mongoose');
var schema = mongoose.Schema;

var itemSchema = new schema({
    id: Number,
    keywords: [ String ],
    shortDescription: String,
    longDescription: String,
    isGlowing: Boolean,
    type: String
});


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

global.DRINK_NAMES =[
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
