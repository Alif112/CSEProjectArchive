var Projects = require('../models/project');
var Users = require('../models/user');
var Teachers = require('../models/teacher');

exports.findProjects = function(req, res) {
  Projects.find({}, function(err, results) {
    if (err) return console.error(err);
    else if (results.length >= 0) {
      console.log(results);
      res.render('recentProjects', {
        results: results
      });
    }

  });

};

exports.findTagProjects = function(req, res) {

  Projects.find({
    tags: req.params.tag
  }, function(err, results) {
    if (err) return console.error(err);
    else if (results.length >= 0) {
      console.log("in teacherprofile");
      console.log(results);
      res.render('recentProjects', {
        results: results
      });
    }

  });

};

exports.showProject = function(req, res, next) {
  Projects.find({
      _id: req.params.id
    },
    function(err, results) {
      if (err) throw err;
      if (results.toString() === '') {
        res.redirect('/projects');
      }


      var users = [];
      //{$or:[{"reg":"2013333333"},{"reg":"2000000454"}]}
      for (var i = 0; i < results[0].teammembers.length; i++) {
        users.push({
          "reg": results[0].teammembers[i]
        });
      }
      Users.find({
        $or: users
      }, function(err, members) {
        if (err) throw err;
        Teachers.findOne({
          _id: results[0].supervisorId
        }, function(err, supervisor) {

          if (err) throw err;

          console.log(supervisor);
          res.render('project', {
            results: results,
            members: members,
            supervisor:supervisor
          });
        });


      });
      // console.log(users);

    });
};

exports.addproject = function(req, res, next) {

  var title = req.body.title;
  var coursename = req.body.coursename;
  var batch = req.body.batch;
  var link = req.body.link;
  var description = req.body.description;
  var teammembers = [];
  var supervisorId = req.body.supervisor;
  var tags = [];
  console.log("=========================================");
  //console.log(supervisor);
  for (var i = 0; i < 100; i++) {
    var temp = 'field' + i;
    if (req.body[temp]) {
      teammembers.push(req.body[temp]);
      // console.log(req.body[temp]);
    }
  }
  for (i = 0; i < 100; i++) {
    var temp1 = 'tag' + i;
    if (req.body[temp1]) {
      tags.push(req.body[temp1]);
      // console.log(req.body[temp]);
    }
  }
  var project = new Projects({
    title: title,
    coursename: coursename,
    batch: batch,
    teammembers: teammembers,
    supervisorId: supervisorId,
    tags: tags,
    link: link,
    description: description
  });

  project.save(function(err, results) {
    if (err) console.error(err);
    if (err) throw err;
    console.log(results);
    res.redirect("/");
  });

  //  res.send(title + "  " + coursename + "  " + link + "  " + description + "  " + teammembers);


};
