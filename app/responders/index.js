/**
 * @file
 * Initialize the RPC responders
 */

var sampleRpcResponder = require('./sampleRpcResponder');

module.exports = function () {

  // Initialize all the handlers
  return {
    'sample.request': sampleRpcResponder
  };
};
