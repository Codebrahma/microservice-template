/**
 * @file
 * Defines bus for the microservice
 */

var servicebus = require('servicebus');
var retry = require('servicebus-retry');
var amqpRPC = require('amqp-rpc');
var logger = require('./logger');

// Get rabbitMQ URL
var rabbitmqUrl = process.env.RABBITMQ_URL;

/**
 * Class to provide event-bus and rpc facilities for the microservice
 * @constructor
 * @returns {Bus} Bus
 */
var Bus = function () {

  /**
   * Servicebus object to provide publish and subscribe methods
   * @member
   * @private
   */
  this.servicebus = servicebus.bus({
    url: rabbitmqUrl
  });

  // Initlaize methods for RPC

  /**
   * Provides RPC functionalities of https://github.com/demchenkoe/node-amqp-rpc
   * @member
   */
  this.rpc = amqpRPC.factory({
    url: rabbitmqUrl
  });

  // To use ack/reject
  this.servicebus.use(retry({
    store: new retry.MemoryStore()
  }));
};

/**
 * Method to publish messages
 * @function
 * @param {string} type - Type of message
 * @param {object|string} msg - Message
 * @param {object} options - Options to pass to amqp driver
 */
Bus.prototype.publish = function (type, msg, options) {

  // Publish the message
  this.servicebus.publish(type, msg, options);

  // Log the published message
  logger.info(`PUBLISHED:[${type}] ${JSON.stringify(msg)}`);
};

 /**
  * Method to subscribe messages
  * @function
  * @param {string} type - Type of message
  * @param {object} options - Options to pass to amqp driver
  * @param {function} cb - Callback of form cb(msg, ack, reject)
  */
Bus.prototype.subscribe = function (type, options, cb) {

  // Subscribe for the message
  this.servicebus.subscribe(type, options, (event) => {

    // Log the receipt of message
    logger.info(`RECEIVED:[${type}] ${JSON.stringify(event)}`);

    var ack = event.handle ? event.handle.ack : null;
    var reject = event.handle ? event.handle.reject : null;

    // Return callback with event, ack and reject
    return cb(event, ack, reject);
  });
};

module.exports = new Bus();

/**
 * @typedef {Object} Bus
 * @property {function} publish - Method to publish messages
 * @property {function} subscribe - Method to subscribe messages
 * @property {object} rpc - RPC functionalities
 * @property {function} rpc.call - Send RPC request
 * @property {function} rpc.on - Respond to RPC request
 */
