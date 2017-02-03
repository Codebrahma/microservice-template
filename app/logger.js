/**
 * @file
 * Defines logger for the microservice
 */

var winston = require('winston');
var Papertrail = require('winston-papertrail').Papertrail;
var serviceIdentifier = require('../package.json').name;

var host = process.env.LOG_SERVICE_HOST;
var port = process.env.LOG_SERVICE_PORT;

/**
 * Class to provide logging facilities for the microservice
 * @class
 * @returns {Logger} Logger
 */

var Logger = function () {

  // Try to route logs to third party service
  if (host && port) {
    // Define our transport
    var transport = new Papertrail({
      levels: {
        debug: 0,
        info: 1,
        error: 3
      },
      colors: {
        debug: 'blue',
        info: 'green',
        error: 'red'
      },
      host,
      port,
      json: true,
      colorize: true,
      logFormat: (level, message) => {
        return `[${serviceIdentifier}] ${level} : ${message}`;
      }
    });

    // Handle exceptions
    transport.exceptionsLevel = 'error';
    winston.handleExceptions(transport);
  }

  this.info = winston.info;
  this.error = winston.error;
  this.debug = winston.debug;
};

module.exports = new Logger();


/**
 * @typedef {Object} Logger
 * @property {function} info - Log in level `info`
 * @property {function} error - Log in level `error`
 * @property {function} debug - Log in level `debug`
 */
