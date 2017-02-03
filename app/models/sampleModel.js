/**
 * @file
 * Defines the sample model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sampleModel = new Schema({
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Number,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('sample', sampleModel);
