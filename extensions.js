Array.prototype.findItem = function(index, keyword) {
	var counter = 0;

	for(var i = 0; i < this.length; i++) {
		for(var j = 0; j < this.contents[i].keywords.length; j++) {
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
	
	return null;
};