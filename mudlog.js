var winston = require('winston');

var winstonLogger = new (winston.Logger)({  
    transports: [
        new (winston.transports.Console)({ level: 'debug' }),
        new (winston.transports.File)({ filename: __dirname + '/../logs/reggie_node.log', level: 'debug' })
    ]
});

winstonLogger.info('Chill Winston, the logs are being captured 2 ways - console and file');


exports.log = function log(message) {
    //console.log(message);
    winstonLogger.log(message);
};