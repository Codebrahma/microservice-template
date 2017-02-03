/**
 * @file
 * Defines the handlers for 'sample.message'
 */

module.exports = function (event, ack, reject) {

  // Do something on event
  if (event.desiredProperty) {

    // After that acknowledge the message
    return ack();
  }

  // Or reject it
  return reject();
};
