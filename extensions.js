Array.prototype.findItem = function(index, keyword) {
	if(isNaN(index)) {
		return null;
	}
	
	var counter = 0;

	for(var i = 0; i < this.length; i++) {
		if(this[i] !== null && this[i] !== undefined) {
			for(var j = 0; j < this[i].keywords.length; j++) {
				if(this[i].keywords[j].toLowerCase().substr(0, keyword.length) === keyword.toLowerCase()) {
					counter++;
	
					if(counter === index) {
						return this[i];
					}
					else {
						break;
					}
				}
			}
		}
	}

	return null;
};

Array.prototype.findItems = function(keyword) {
	var items = [];
	
	if(keyword.toLowerCase().trim() === 'all') {
		for(var i = 0; i < this.length; i++) {
			if(this[i] !== null && this[i] !== undefined) {
				items.push(this[i]);
			}
		}
	}
	else {
		for(var i = 0; i < this.length; i++) {
			if(this[i] !== null && this[i] !== undefined) {
				for(var j = 0; j < this[i].keywords.length; j++) {
					if(this[i].keywords[j].toLowerCase().substr(0, keyword.length) === keyword.toLowerCase()) {
						items.push(this[i]);
						break;
					}
				}
			}
		}
	}

	return items;
};

Array.prototype.findItemById = function(id) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] !== null && this[i] !== undefined) {
			if(this[i].id === id) {
				return true;
			}
		}
	}
	
	return false;
}

String.prototype.indefiniteArticle = function() {
	if(this.length < 1) {
		return "a";
	}
	else {
		var firstChar = this.toLowerCase().substr(0, 1);
                
		switch(firstChar) {
			case 'a':
			case 'e':
			case 'i':
			case 'o':
			case 'u':
				return 'an';
			default:
				return 'a';
		}
	}
};

// Exports
module.exports = Array;
module.exports = String;