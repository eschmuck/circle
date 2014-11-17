var Weather = require("../weather");

exports.weather_pressure_works = function(test) {
	var currentWeather = new Weather(100, 10);
	test.equal(100, currentWeather.getPressure());
	test.done();
};

exports.weather_sky_works = function(test) {
	var currentWeather = new Weather(100, 10, 20);
	test.equal(10, currentWeather.getSky());
	test.done();
};

exports.weather_change_works = function(test) {
	var currentWeather = new Weather(100, 10, 20);
	test.equal(20, currentWeather.getChange());
	test.done();
};

exports.weather_getDiff_lateHighPressure = function(test) {
	var currentWeather = new Weather(1000, 1, 200);
	var diff = currentWeather.getDiff(10);
	test.equal(-2, diff);
	test.done();
};

exports.weather_getDiff_lateLowPressure = function(test) {
	var currentWeather = new Weather(970, 1, 200);
	var diff = currentWeather.getDiff(10);
	test.equal(2, diff);
	test.done();
};

exports.weather_getDiff_earlyHighPressure = function(test) {
	var currentWeather = new Weather(1015, 1, 200);
	var diff = currentWeather.getDiff(1);
	test.equal(2, diff);
	test.done();
};

exports.weather_getDiff_earlyLowPressure = function(test) {
	var currentWeather = new Weather(1020, 1, 200);
	var diff = currentWeather.getDiff(1);
	test.equal(-2, diff);
	test.done();
};

exports.weather_calculateChange_maxIs12 = function(test) {
	var currentWeather = new Weather(970, 1, 200);
	currentWeather.calculateChange(1, 1000, 500, 0);
	test.equal(12, currentWeather.getChange());
	test.done();
};

exports.weather_calculateChange_minIsMinus12 = function(test) {
	var currentWeather = new Weather(1020, 1, 200);
	currentWeather.calculateChange(1, 1000, 500, 2000);
	test.equal(-12, currentWeather.getChange());
	test.done();
};

exports.weather_calculateChange_pressureChangesBy12 = function(test) {
	var currentWeather = new Weather(970, 1, 200);
	currentWeather.calculateChange(1, 1000, 500, 0);
	test.equal(982, currentWeather.getPressure());
	test.done();
};

exports.weather_calculateChange_minIsMinus12 = function(test) {
	var currentWeather = new Weather(1020, 1, 200);
	currentWeather.calculateChange(1, 1000, 500, 2000);
	test.equal(1008, currentWeather.getPressure());
	test.done();
};
