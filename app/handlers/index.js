/**
 * @file
 * Initialize the handlers
 */

var sampleMessageHandler = require('./sampleMessageHandler');

module.exports = function () {

  // Initialize all the handlers
  return {
    'sample.message': sampleMessageHandler
  };
};
