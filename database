var MongoClient = require("mongodb").MongoClient;
var MongoServer = require("mongodb").Server;
var mongoClient = new MongoClient(new MongoServer('localhost', 27017));
var database = "CircleDB";

// Object constructor
function Database() {
}

Database.prototype.save = function(object) {
	mongoClient.open(function(err, mongoClient) {
		var db = mongoClient.db(database);
		var collection = db.collection(object.getType());
		collection.update({ _id : object._id }, object, {w:1}, function(err, result) { console.log(err); });
		mongoClient.close();
	});
};


Database.prototype.insert = function(object) {
	mongoClient.open(function(err, mongoClient) {
		var db = mongoClient.db(database);
		var collection = db.collection(object.getType());
	 	collection.insert(object, {w:1}, 
	 		function(err, result) { console.log(err);  console.log(result);
			 	mongoClient.close();
				db.close();
	 		});
	});
};


Database.prototype.loadAll = function(type, callback) {
	mongoClient.open(function(err, mongoClient) {
		var db = mongoClient.db(database);
		var collection = db.collection(type);

		collection.find({}).toArray(function(err, documents) {
			db.close();
			mongoClient.close();
			callback(documents);
		});
	});
};

Database.prototype.loadOne = function(object, callback) {
	mongoClient.open(function(err, mongoClient) {
		var db = mongoClient.db(database);
		var collection = db.collection(object.getType());

		if(object._id !== undefined) {
			collection.findOne({ _id : object._id }, function(err, document) {
				db.close();
				mongoClient.close();
				callback(document);
			});	
		} else if(object.id !== undefined) {
			collection.findOne({ id : object.id }, function(err, document) {
				db.close();
				mongoClient.close();
				callback(document);
			});
		} else if(object.name !== undefined) {
			collection.findOne({ name : object.name }, function(err, document) {
				db.close();
				mongoClient.close();
				callback(document);
			});			
		} else {
			collection.findOne({ }, function(err, document) {
				db.close();
				mongoClient.close();
				callback(document);
			});
		}
	});
};

// Exports
module.exports = Database;
