var mongoose = require('mongoose');

var batchSchema = mongoose.Schema({
  batch: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('Batches', batchSchema);
