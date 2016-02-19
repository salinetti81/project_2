var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');

//INDEX
router.get('/', function(req, res) {
    res.locals.login = req.isAuthenticated();
    User.find(function(err, data) {
        res.render('./users/index.ejs', {users: data});
    });
});

//JSON
router.get('/json', function(req, res) {
    User.find(function(err, users) {
        res.send(users);
    });
});

//SINGLE JSON 
router.get('/:id/json', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        res.send(user);
    });
});

//SHOW PAGE FOR WHEN USER IS LOGGED IN
router.get('/:id', isLoggedIn, function(req, res) {
    //checks if the user is logged in
    res.locals.usertrue = (req.user.is == req.params.id);
    //list users
    User.find({}, function(err, users) {
        //finds single user
        User.findById(req.params.id, function(err, user) {
            res.render('users/show.ejs', {
                user: user,
                //other schema info??????
            })
        })
    })
})

//LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users');
});

// CREATE NEW USER
    //PROCESS SIGNUP FORM
router.post('/', passport.authenticate('local-signup', {
    failureRedirect : '/users'}), function(req, res) { //redirect back to signup if there is an error

        res.redirect('/users' + req.user.id);
        console.log(users);
});

    //PROCESS THE LOGIN FORM
router.post('/:id/newuser', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        var newUser = new User(req.body);
        newUser.save(function(err, location) {
            user.push(user);
            user.save(function(err) {
                res.redirect('/users/' + req.params.is);
            });
        });
    });
});

//DELETE
router.delete('/:id', function(req, res) {
    console.log('A user was deleted');
    var deleteUser = req.params.id;
    User.findById(deleteUser, function(err, data) {
        //for loop to delete user
        for (var i = 0; i < users.length; i++) {
            User.findByIdAndRemove(deleteUser, function(err, users) {
                res.redirect('/users');
            });
        };
    });
});

//define isLoggedIn
function isLoggedIn(req, res, next) {
    //if user exists, do this
    if (req.isAuthenticated())
        return next();
    //if user doesn't exists, go here
res.redirect('/');
} ;

module.exports = router;


















