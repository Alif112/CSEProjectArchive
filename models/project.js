var mongoose = require('mongoose');
// User Schema
var ProjectSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  title: {type:String},
  coursename:String,
  batch:String,
  teammembers: [String],
  supervisorId : String,
  tags:[String],
  link:String,
  description:String

});

var Projects = module.exports = mongoose.model('Projects', ProjectSchema);

/* test*/

// var project = new Projects({
//   title: "test",
// //  teammembers: ["2013", "2014"]
// });
//
// project.save(function(err, results) {
//   if(err) console.error(err);
//   console.log(results);
//   if (err) throw err;
// });
