var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
// var users = require('./routes/users');
var subjects = require('./routes/subjects');
var batches = require('./routes/batches');
var contact = require('./routes/contact');
var projects = require('./routes/projects');
var search = require('./routes/search');
var upload = require('./routes/upload');
var addUser = require('./routes/addUser');
var students = require('./routes/students');
var admin = require('./routes/admin');
var demopic = require('./routes/demopic');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var url = require('url');
//var sleep=require('sleep');
var fs = require('fs');
var dir = 'public/profile';


var teachers = require('./routes/teachers');



if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
mongoose.connect('mongodb://localhost/cseprojects', {
  useMongoClient: true
});
var db = mongoose.connection;


var app = express();

// view engine setup

app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/students'),
                  path.join(__dirname, 'views/addform'),
                  path.join(__dirname, 'views/teacherprofile')
        

]);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));


app.use('/', index);
// app.use('/users', users);
app.use('/subjects', subjects);
app.use('/batches', batches);
app.use('/projects', projects);
app.use('/contact', contact);
app.use('/search', search);
app.use('/upload', upload);
app.use('/addUser', addUser);
app.use('/adduser', addUser);
app.use('/students', students);
app.use('/admin', admin);

app.use('/demopic', demopic);
app.use('/teachers',teachers);

var options = {
  maxAge: '1d',
};
app.use(express.static(path.join(__dirname, 'public'), options));
app.use('/students', express.static(path.join(__dirname, 'public'), options));
app.use('/students/update', express.static(path.join(__dirname, 'public'), options));

app.use('/teachers', express.static(path.join(__dirname, 'public'), options));
app.use('/teachers/addteacher', express.static(path.join(__dirname, 'public'), options));
app.use('/teachers/profile', express.static(path.join(__dirname, 'public'), options));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
