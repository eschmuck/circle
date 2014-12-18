Array.prototype.findItem = function(index, keyword) {
	
	if(isNaN(index)) {
		return null;
	}
	
	var counter = 0;

	for(var i = 0; i < this.length; i++) {
		for(var j = 0; j < this[i].keywords.length; j++) {
			if(this[i].keywords[j].toLowerCase().substr(0, keyword.length) === keyword.toLowerCase()) {
				counter++;
				
				console.log("keyword match");
				console.log(counter);
				console.log(index);
				
				if(counter === index) {
					
					console.log("counter = index");
					
					return this[i];
				}
				else {
					break;
				}
			}
		}
	}
	
	console.log("not found");
	
	return null;
};

Array.prototype.findItems = function(keyword) {
	var items = [];
	
	if(keyword.toLowerCase().trim() === 'all') {
		for(var i = 0; i < this.length; i++) {
			items.push(this[i]);
		}
	}
	else {
		for(var i = 0; i < this.length; i++) {
			for(var j = 0; j < this[i].keywords.length; j++) {
				if(this[i].keywords[j].toLowerCase().substr(0, keyword.length) === keyword.toLowerCase()) {
					items.push(this[i]);
					break;
				}
			}
		}
	}

	return items;
};


// Exports
module.exports = Array;