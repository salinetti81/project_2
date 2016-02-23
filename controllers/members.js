// this is the members controller
var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/users');
var Members = require('../models/members');

// members index
router.get('/', isLoggedIn, function(req, res) {
	Members.find(function(err, members) {
		res.render('members/index.ejs', 
			{members: members});
	});
});


// Json for members
router.get('/json', function(req, res) {
	Members.find(function(err, members) {
		res.send(members);
	});
});

// middleware to check login status
// used in index route
function isLoggedIn(req, res, next) {
  console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/users');
  }
}




module.exports = router;