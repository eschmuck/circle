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
