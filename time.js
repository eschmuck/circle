// Object constructor
function Time(hour, day, month, year, age) {
	this.hour = hour;
	this.day = day;
	this.month = month;
	this.year = year;
	this.age = age;
}

// Private members
var daysOfTheWeek = [
	"the Moon",
	"the Bull",
	"the Deception",
	"Thunder",
	"Freedom",
	"the Great Gods",
	"the Sun"
];

var monthNames = [
	"",
	"Winter",
	"the Winter Wolf",
	"the Frost Giant",
	"the Old Forces",
	"the Grand Struggle",
	"the Spring",
	"Nature",
	"Futility",
	"the Dragon",
	"the Sun",
	"the Heat",
	"the Battle",
	"the Dark Shades",
	"the Shadows",
	"the Long Shadows",
	"the Ancient Darkness",
	"the Great Evil"
];

// Getters
Time.prototype.getHour = function() {
	return this.hour;
};

Time.prototype.getDay = function() {
	return this.day;
};

Time.prototype.getMonth = function() {
	return this.month;
};

Time.prototype.getYear = function() {
	return this.year;
};

Time.prototype.getAge = function() {
	return this.age;
};

Time.prototype.getType = function() {
	return "Time";
};

// Functions
Time.prototype.anotherHour = function() {
	this.hour++;

	if(this.hour > 23) {
		this.hour = 0;
		this.day++;
	}
	
	if(this.day > 34) {
		this.day = 1;
		this.month++;
	}
	
	if(this.month > 17) {
		this.month = 1;
		this.year++;
	}
	
	if(this.year > 5000) {
		this.year = 1;
		this.age++;
	}
};

Time.prototype.getAmPm = function() {
	if(this.hour < 12) {
		return "AM"; 
	}
	else {
		return "PM";
	}
};

Time.prototype.getClockTime = function() {
	if(this.hour > 12) {
		return this.hour % 12;
	}
	
	if(this.hour === 0) {
		return 12;
	}
	
	return this.hour;
};

Time.prototype.getDayOfWeek = function() {
	var dayOfWeek = ((35 * (this.month - 1)) + this.day) % 7;
	return daysOfTheWeek[dayOfWeek];
};

Time.prototype.getMonthName = function() {
	return monthNames[this.month];
};

Time.prototype.getDigitSuffix = function(value) {
	var suffix = "th";

	if(value != 11 && value != 12)	{
		if(((value % 100) / 10) != 1) {
			switch(value % 10) {
				case 1:
					suffix = "st";
					break;
				case 2:
					suffix = "nd";
					break;
				case 3:
					suffix = "rd";
					break;
			}
		}
	}

	return suffix;
};

Time.prototype.getDisplayTime = function() {
	return "It is " + this.getClockTime() + " o'clock in the " + this.getAmPm() + " on the day of " + this.getDayOfWeek() + ".";
};

Time.prototype.getDisplayDate = function() {
	return "The " + this.day + this.getDigitSuffix(this.day) + " Day of the Month of " + this.getMonthName() + ", Year " + 
		this.year + " of the " + this.age + this.getDigitSuffix(this.age) + " Age.";
}

// Exports
module.exports = Time;
