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
global.ITEM_FOOD  = "Food";