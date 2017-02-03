/**
 * @file
 * Set up the app
 */
var _ = require('underscore');
var db = require('./db');
var bus = require('./bus');
var handlers = require('./handlers')();
var responders = require('./responders')();


var _registerHandlers = function () {
  // For each handler defined
  _.each(_.keys(handlers), function (handler) {

    // Subscribe for the msg type
    bus.subscribe(handler, { ack: true }, function (event, ack, reject) {

      // On receiving msg, call the handler registered
      handlers[handler](event, ack, reject);
    });
  });
};

var _registerResponders = function () {
  // For each responder defined
  _.each(_.keys(responders), function (responder) {

    // Resgiter it for RPC
    bus.rpc.on(responder, function (params, cb) {

      // On receving RPC request, call the reponder registered
      responders[responder](params, cb);
    });
  });
};

module.exports = function () {
  db();
  _registerHandlers();
  _registerResponders();
};
