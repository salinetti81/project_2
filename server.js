// set up
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var methodOverride = require('method-override');

var morgan = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// var configDB = require('./config/server.js');

//configuration
mongoose.connect('mongodb://localhost:27017/users_models');

//express set up
app.use(morgan('dev'));
// app.use(cookieParser());
app.use(bodyParser());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//passport requirements
app.use(session({secret: 'secret-session'}));
app.use(passport.initialize());
app.use(passport.session()); //for persistent login sessions

//routes
var usersController = require('./controllers/users');
var commentsController = require('./controllers/comments');
var membersController = require('./controllers/members');

require('./config/passport.js')(passport);

app.use('/users', usersController);
app.use('/comments', commentsController);
//app.use('/members', membersController);
// app.use('/users', soundCloudController);

app.get('/', function(req, res) {
	res.redirect('/users');
});

app.listen(port, function() {
	console.log('=======================');
  console.log('Running on port ' + port);
  console.log('=======================');
});