/**
 * @file
 * Defines the RPC responder for 'sample.request'
 */
module.exports = function (params, cb) {

  // Do something on params of request
  if (params.desiredProperty) {

    // After that reply the message
    return cb({ this: 'is reply' });
  }

  // Or end the RPC without any data
  return cb();
};
