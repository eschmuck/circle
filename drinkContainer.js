var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("./item").schema;

var drinkContainerSchema = itemSchema.extend({
    capacity: Number,
    containsLiquid: Number,
    isPoisoned: Boolean
});

var drinkContainerModel = mongoose.model('item', drinkContainerSchema);

module.exports = {
	schema: drinkContainerSchema,
	drinkContainer: drinkContainerModel
};

