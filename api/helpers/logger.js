const { NODE_ENV } = process.env;
const winston = require('winston');

let level, transports;
switch (NODE_ENV) {
  case 'development':
    level = 'verbose';
    transports = [new winston.transports.Console()];
    break;
  case 'test':
    level = 'verbose';
    transports = [
      new winston.transports.File({
        filename: 'combined.log',
        level: 'error'
      })
    ]; //No logging in test
    break;
  case 'production':
    level = 'verbose';
    transports = [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: 'combined.log',
        level: 'verbose'
      })
    ]
}

module.exports = winston.createLogger({
  level, transports
});