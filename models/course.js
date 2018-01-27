var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  courseTitle: {
    type: String,
  },
  batch: String,
});

module.exports = mongoose.model('Courses', courseSchema);
