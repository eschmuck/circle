var mongoose = require('mongoose');
var schema = mongoose.Schema;

var itemSchema = new schema({
    id: Number,
    keywords: [ String ],
    shortDescription: String,
    longDescription: String,
    isGlowing: Boolean
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

