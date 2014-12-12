var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var character = require("./character");
var characterSchema = require("./character").schema;

var mobSchema = characterSchema.extend({
    id: Number,
	longDescription: String,
	detailedDescription: Number,
	thac0: Number,
	armorClass: Number,
	hitpointFormula: String,
	damRollFormula: String
});

mobSchema.methods.load = function(id, callback, commands, world, instructionNumber) {
	mobModel.find({ id: id }, function(err, docs) {
		callback(docs, commands, world, instructionNumber);
	});
};

mobSchema.methods.isNpc = function() {
	return true;
};

var mobModel = mongoose.model('mob', mobSchema);

module.exports = {
	schema: mobSchema,
	mob: mobModel
};

