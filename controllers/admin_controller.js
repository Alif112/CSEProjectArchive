var Courses = require('../models/course');
var Batches = require('../models/batch');
var Projects = require('../models/project');


exports.dashboard = function(req, res, next) {
  Projects.find({}, function(err, results) {
    if (err) throw err;
    res.render('dashboard', {
      results: results
    });
  });
};

exports.addBatch = function(req, res) {
  console.log("add batch");
  res.render('addBatch');
};

exports.addBatchpost = function(req, res, next) {

  console.log(req.body.batch);

  Batches.find({
    batch: req.body.batch
  }, function(err, results) {
    console.log(results);
    if (err) return console.error(err);
    else if (results.length > 0) {
      res.send("Already Exist");
    } else {
      console.log('uploading data---- in post batchSchema');
      var batch = new Batches({
        batch: req.body.batch
      });

      batch.save(function(err, results) {
        if (err) throw err;
        //console.log(results._id);
        res.redirect("/admin/dashboard");
      });
    }

  });

};

exports.addCourse = function(req, res) {
  console.log("add course");
  Batches.find({}, function(err, batches) {
    if (err) throw err;
    else {
      console.log(batches);
      res.render('addCourse', {
        batches: batches
      });
    }
  });

};

exports.addCoursepost = function(req, res, next) {
  // gfs = Grid(conn.db);
  console.log('---------------------------->>>>in upload/data post');


  Courses.find({
    $and: [{
        courseTitle: req.body.coursename
      },
      {
        batch: req.body.batch
      }
    ]
  }, function(err, results) {
    console.log(results);
    if (err) return console.error(err);
    else if (results.length > 0) {
      res.send("Already Exist");

    } else {
      console.log('uploading data---- in post courseadd');
      var course = new Courses({
        courseTitle: req.body.coursename,
        batch: req.body.batch
      });

      course.save(function(err, results) {
        if (err) throw err;
        //console.log(results._id);
        console.log(results);
        res.redirect("/admin/dashboard");
      });
    }

  });

};
