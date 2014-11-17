var Time = require("../time");

exports.time_hour_works = function(test) {
	var currentTime = new Time(15, 1, 1, 1, 1);
	test.equal(15, currentTime.getHour());
	test.done();
};

exports.time_day_works = function(test) {
	var currentTime = new Time(1, 3, 1, 1, 1);
	test.equal(3, currentTime.getDay());
	test.done();
};

exports.time_month_works = function(test) {
	var currentTime = new Time(1, 1, 8, 1, 1);
	test.equal(8, currentTime.getMonth());
	test.done();
};

exports.time_year_works = function(test) {
	var currentTime = new Time(1, 1, 1, 1115, 1);
	test.equal(1115, currentTime.getYear());
	test.done();
};

exports.time_age_works = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 2);
	test.equal(2, currentTime.getAge());
	test.done();
};

exports.time_anotherHour_advances_hour = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	currentTime.anotherHour();

	test.equal(2, currentTime.getHour(),  "Hour should be 2");
	test.equal(1, currentTime.getDay(),   "Day should be 1");
	test.equal(1, currentTime.getMonth(), "Month should be 1");
	test.equal(1, currentTime.getYear(),  "Year should be 1");
	test.equal(1, currentTime.getAge(),   "Age should be 1");
	test.done();
};

exports.time_anotherHour_advances_day = function(test) {
	var currentTime = new Time(23, 1, 1, 1, 1);
	currentTime.anotherHour();

	test.equal(0, currentTime.getHour(),  "Hour should be 0");
	test.equal(2, currentTime.getDay(),   "Day should be 2");
	test.equal(1, currentTime.getMonth(), "Month should be 1");
	test.equal(1, currentTime.getYear(),  "Year should be 1");
	test.equal(1, currentTime.getAge(),   "Age should be 1");
	test.done();
};

exports.time_anotherHour_advances_month = function(test) {
	var currentTime = new Time(23, 34, 1, 1, 1);
	currentTime.anotherHour();

	test.equal(0, currentTime.getHour(),  "Hour should be 0");
	test.equal(1, currentTime.getDay(),   "Day should be 1");
	test.equal(2, currentTime.getMonth(), "Month should be 2");
	test.equal(1, currentTime.getYear(),  "Year should be 1");
	test.equal(1, currentTime.getAge(),   "Age should be 1");
	test.done();
};

exports.time_am_works = function(test) {
	var currentTime = new Time(3, 1, 1, 1, 1);
	test.equal("AM", currentTime.getAmPm());
	test.done();
};

exports.time_pm_works = function(test) {
	var currentTime = new Time(15, 1, 1, 1, 1);
	test.equal("PM", currentTime.getAmPm());
	test.done();
};

exports.time_clocktime_before12_works = function(test) {
	var currentTime = new Time(3, 1, 1, 1, 1);
	test.equal(3, currentTime.getClockTime());
	test.done();
};

exports.time_clocktime_midnight_works = function(test) {
	var currentTime = new Time(0, 1, 1, 1, 1);
	test.equal(12, currentTime.getClockTime());
	test.done();
};

exports.time_afternoon_works = function(test) {
	var currentTime = new Time(15, 1, 1, 1, 1);
	test.equal(3, currentTime.getClockTime());
	test.done();
};

exports.time_anotherHour_advances_year = function(test) {
	var currentTime = new Time(23, 34, 17, 1, 1);
	currentTime.anotherHour();

	test.equal(0, currentTime.getHour(),  "Hour should be 0");
	test.equal(1, currentTime.getDay(),   "Day should be 1");
	test.equal(1, currentTime.getMonth(), "Month should be 2");
	test.equal(2, currentTime.getYear(),  "Year should be 1");
	test.equal(1, currentTime.getAge(),   "Age should be 1");
	test.done();
};

exports.time_anotherHour_advances_age = function(test) {
	var currentTime = new Time(23, 34, 17, 5000, 1);
	currentTime.anotherHour();

	test.equal(0, currentTime.getHour(),  "Hour should be 0");
	test.equal(1, currentTime.getDay(),   "Day should be 1");
	test.equal(1, currentTime.getMonth(), "Month should be 2");
	test.equal(1, currentTime.getYear(),  "Year should be 1");
	test.equal(2, currentTime.getAge(),   "Age should be 1");
	test.done();
};

exports.time_getDayOfWeek_returnsMonday = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("the Bull", day);
	test.done();
};

exports.time_getDayOfWeek_returnsTuesday = function(test) {
	var currentTime = new Time(1, 2, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("the Deception", day);
	test.done();
};

exports.time_getDayOfWeek_returnsWednesday = function(test) {
	var currentTime = new Time(1, 3, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("Thunder", day);
	test.done();
};

exports.time_getDayOfWeek_returnsThursday = function(test) {
	var currentTime = new Time(1, 4, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("Freedom", day);
	test.done();
};

exports.time_getDayOfWeek_returnsFriday = function(test) {
	var currentTime = new Time(1, 5, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("the Great Gods", day);
	test.done();
};

exports.time_getDayOfWeek_returnsSaturday = function(test) {
	var currentTime = new Time(1, 6, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("the Sun", day);
	test.done();
};

exports.time_getDayOfWeek_returnsSunday= function(test) {
	var currentTime = new Time(1, 7, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("the Moon", day);
	test.done();
};

exports.time_getDayOfWeek_returnsMondayAgain = function(test) {
	var currentTime = new Time(1, 8, 1, 1, 1);
	var day = currentTime.getDayOfWeek();
	
	test.equal("the Bull", day);
	test.done();
};

exports.time_getMonthName1_works = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var month = currentTime.getMonthName();
	
	test.equal("Winter", month);
	test.done();
};

exports.time_getMonthName16_works = function(test) {
	var currentTime = new Time(1, 1, 16, 1, 1);
	var month = currentTime.getMonthName();
	
	test.equal("the Ancient Darkness", month);
	test.done();
};

exports.time_getDigitSuffix_worksForFirst = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(1);
	
	test.equal("st", x);
	test.done();
};

exports.time_getDigitSuffix_worksForSecond = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(2);
	
	test.equal("nd", x);
	test.done();
};

exports.time_getDigitSuffix_worksForThird = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(3);
	
	test.equal("rd", x);
	test.done();
};

exports.time_getDigitSuffix_worksForFourth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(4);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForFifth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(5);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForTenth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(10);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForEleventh = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(11);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForTwelvfth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(12);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForTwentieth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(20);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForTwentyFirst = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(21);
	
	test.equal("st", x);
	test.done();
};

exports.time_getDigitSuffix_worksForTwentySecond = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(22);
	
	test.equal("nd", x);
	test.done();
};

exports.time_getDigitSuffix_worksForTwentyThird = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(23);
	
	test.equal("rd", x);
	test.done();
};

exports.time_getDigitSuffix_worksForTwentyFifth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(25);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForThirtieth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(30);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffix_worksForThirtyFirst = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(31);
	
	test.equal("st", x);
	test.done();
};

exports.time_getDigitSuffix_worksForHundreth = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var x = currentTime.getDigitSuffix(100);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDisplayTime_returnsAccurateDayMonday = function(test) {
	var currentTime = new Time(1, 1, 1, 1, 1);
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 1 o'clock in the AM on the day of the Bull.", day);
	test.done();
};

exports.time_getDisplayTime_returnsAccurateDayTuesday = function(test) {
	var currentTime = new Time(17, 2, 1, 1, 1);
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 5 o'clock in the PM on the day of the Deception.", day);
	test.done();
};

exports.time_getDisplayTime_returnsAccurateDayWednesday = function(test) {
	var currentTime = new Time(12, 3, 1, 1, 1);
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 12 o'clock in the PM on the day of Thunder.", day);	
	test.done();
};

exports.time_getDisplayTime_returnsAccurateDayThursday = function(test) {
	var currentTime = new Time(0, 4, 1, 1, 1);
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 12 o'clock in the AM on the day of Freedom.", day);	
	test.done();
};

exports.time_getDisplayDate_works1 = function(test) {
	var currentTime = new Time(1, 12, 5, 111, 3);
	var day = currentTime.getDisplayDate();
	
	test.equal("The 12th Day of the Month of the Grand Struggle, Year 111 of the 3rd Age.", day);	
	test.done();
};

exports.time_getDisplayDate_works2 = function(test) {
	var currentTime = new Time(1, 31, 16, 3184, 15);
	var day = currentTime.getDisplayDate();
	
	test.equal("The 31st Day of the Month of the Ancient Darkness, Year 3184 of the 15th Age.", day);	
	test.done();
};

exports.time_getDisplayDate_works3 = function(test) {
	var currentTime = new Time(1, 2, 9, 3, 9);
	var day = currentTime.getDisplayDate();
	
	test.equal("The 2nd Day of the Month of the Dragon, Year 3 of the 9th Age.", day);	
	test.done();
};

