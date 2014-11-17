// Object constructor
function Weather(pressure, sky, change) {
	this.pressure = pressure;
	this.sky = sky;
	this.change = change;
}

// Constants
var SKY_CLOUDLESS = 0;
var SKY_CLOUDY    = 1;
var SKY_RAINING   = 2;
var SKY_LIGHTNING = 3;

// Getters
Weather.prototype.getPressure = function() {
	return this.pressure;
};

Weather.prototype.getSky = function() {
	return this.sky;
};

Weather.prototype.getChange = function() {
	return this.change;
};

Weather.prototype.getDiff = function(month) {
	if(month >= 9 && month <= 16) {
		return (this.pressure > 985 ? -2 : 2);
	}
	else {
		return (this.pressure > 1015 ? -2 : 2);
	}
};

Weather.prototype.calculateChange = function(month, random1, random2, random3) {
	var diff = this.getDiff(month);
	
	this.change = random1 * diff + random2 - random3;

	this.change = Math.min(this.change, 12);
	this.change = Math.max(this.change, -12);
	
	this.pressure += this.change;
};

Weather.prototype.getWeatherChange = function(random) {
	var weatherChange = 0;
	
	switch(this.sky) {
		case SKY_CLOUDLESS:
			weatherChange = this.CloudlessSkyChange(random);
			break;
		case SKY_CLOUDY:
			weatherChange = this.CloudySkyChange(random);
			break;
		case SKY_RAINING:
			weatherChange = this.RainingSkyChange(random);
			break;
		case SKY_LIGHTNING:
			weatherChange = this.LightningSkyChange(random);
			break;
	}
};

Weather.prototype.cloudlessSkyChange = function(random) {
	if(this.pressure < 990) {
		return 1;
	}
	else if(this.pressure < 1010) {
		if(random == 1) {
			return 1;
		}
	}
	
	return 0;
}

Weather.prototype.cloudySkyChange = function(random) {
	if(this.pressure < 970) {
		return 2;
	}
	else if(this.pressure < 990) {
		if(random == 1) {
			return 2;
		}
	}
	else if(this.pressure > 1030) {
		if(random == 1) {
			return 3;
		}
	}
	
	return 0;
}

Weather.prototype.rainingSkyChange = function(random) {
	if(this.pressure < 970) {
		if(random == 1) {
			return 4;
		}
	}
	else if(this.pressure > 1030) {
		return 5;
	}
	else if(this.pressure > 1010) {
		if(random == 1) {
			return 5;
		}
	}

	return 0;
};

Weather.prototype.lightningSkyChange = function(random) {
	if(this.pressure > 1010) {
		return 6;
	}
	else if(this.pressure > 990) {
		if(random == 1) {
			return 6;
		}
	}
	
	return 0;
};

Weather.prototype.updateWeather = function(weatherChange) {
	switch(weatherChange) {
		case 0:
			break;
		case 1:
			// "The sky starts to get cloudy."
			this.sky = SKY_CLOUDY;
			break;
		case 2:
			// "It starts to rain."
			this.sky = SKY_RAINING;
			break;
		case 3:
			// "The clouds disappear."
			this.sky = SKY_CLOUDLESS;
			break;
		case 4:
			// "Lightning starts to show in the sky."
			this.sky = SKY_LIGHTNING;
			break;
		case 5:
			// "The rain stops."
			this.sky = SKY_CLOUDY;
			break;
		case 6:
			// "The lightning stops.
			this.sky = SKY_RAINING;
			break;
			
	}
};

Weather.prototype.update = function(month) {
	this.calculateChange(month, 2, 4, 4);
	var weatherChange = this.getWeatherChange(4);
	this.updateWeather(weatherChange);
};

// Exports
module.exports = Weather;
