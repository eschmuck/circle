var winston = require('winston');

var winstonLogger = new (winston.Logger)({  
    transports: [
        new (winston.transports.Console)({ level: 'debug', colorize: true }),
        new (winston.transports.File)({ filename: __dirname + '/logs/circle.log', level: 'debug' })
    ]
});

exports.log = function log(message) {
    winstonLogger.log(message);
};

exports.info = function info(message) {
    winstonLogger.info(message);
};

exports.warn = function warn(message) {
    winstonLogger.warn(message);
};

exports.error = function error(message) {
    winstonLogger.error(message);
};