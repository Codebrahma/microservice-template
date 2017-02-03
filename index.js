var app = require('./app');
var logger = require('./app/logger');
var bus = require('./app/bus');
app();

// Sample publish
bus.publish('sample.message',   // Event type
  { desiredProperty: true },    // Actual message
  { ack: true }                 // Additional options
);

// Sample RPC request
bus.rpc.call('sample.request',  // RPC type
  { desiredProperty: true },    // RPC params
  function (reply) {            // Callback function with reply
    logger.info(reply);
  }
);

logger.info('***** Microservice template started *****');
