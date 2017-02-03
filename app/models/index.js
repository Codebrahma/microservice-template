/**
 * @file
 * Configures the database connection
 */

var mongoose = require('mongoose');
var logger = require('./../logger');

module.exports = function () {

  // Mongoose promises are deprecated
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () => {
    logger.info('Connected to Database');
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Desconnected from Database');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(err);
  });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);

};
