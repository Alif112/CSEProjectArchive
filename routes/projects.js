var express = require('express');
var router = express.Router();
var Projects = require('../controllers/projects');
var Teachers = require('../models/teacher');
var Batches = require('../models/batch');
var Courses = require('../models/course');

/* GET home page. */

router.get('/', Projects.findProjects);
// router.get('/projects', projects.showproject);
router.get('/tags/:tag', Projects.findTagProjects);

router.get('/coursename', function(req, res) {
  console.log(req.param('batch'));
  Courses.find({
    batch: req.param('batch')
  }, function(err, option) {
    if (err) throw err;
    //console.log(option);
    res.send(option);
  });
  //res.send("data sent correctly " + req.param('batch'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // req.flash('error_msg', 'You are not logged in');
    res.redirect('/');
    //return next();
  }

}

router.get('/add', ensureAuthenticated, function(req, res) {
  Teachers.find({}, function(err, teachers) {
    if (err) throw err;
    //console.log(results);
    Batches.find({}, function(err, batches) {
      if (err) throw err;
      else
        res.render('addproject', {
          teachers: teachers,
          batches: batches
        });
    });

  });

});

router.post('/add', Projects.addproject);

router.get('/:id', Projects.showProject);


/*test purpose*/
/*
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var upload = multer({
  storage: storage
});

router.post('/test', upload.single('img'), function(req, res, err) {
  if (err) console.log(err);
  console.log("==================");
  res.redirect('/');
});
*/
module.exports = router;
