var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config/config');


var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

mongoose.connect(config.MONGO_URI);

var index = require('./routes/index');
var articles = require('./routes/articles');
var articledashboard = require('./routes/articledashboard');
var listdashboard = require('./routes/listdashboard');
var login = require('./routes/login');
var register = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//public directory set up
app.use(express.static(path.join(__dirname, 'public')));


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("trust proxy", 1);

app.use(require("express-session")({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', index);
app.use('/articles', articles);
app.use('/articledashboard', articledashboard);
app.use('/listdashboard', listdashboard);

app.use('/login', login);
app.use('/register', register);

app.get('/saved', function(req, res) {
  res.render('saved');
})

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
