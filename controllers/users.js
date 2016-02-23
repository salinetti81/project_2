var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var SoundCloud = require('../models/soundcloud');
var Comments = require('../models/comments')

//INDEX
router.get('/', function(req, res) {
  res.locals.login = req.isAuthenticated();
  User.find(function(err, data) {
      res.render('./index.ejs', {users: data});
  });
});

//JSON
router.get('/json', function(req, res) {
  User.find(function(err, users) {
      res.send(users);
  });
});

//USER JSON 
router.get('/:id/json', function(req, res) {
  User.findById(req.params.id, function(err, user) {
      res.send(user);
  });
});

//Comments JSON

router.get('/comments/json', function(req, res) {
  Comments.find(function(err, comments) {
    res.send(comments);
  });
});


//LOGOUT
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users');
});

//SHOW PAGE FOR WHEN USER IS LOGGED IN
router.get('/:id/', function(req, res) {
  //checks if the user is logged in
  res.locals.usertrue = (req.user.is == req.params.id);
  req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
  //list users
  // User.find({}, function(err, users) {
    //finds single user
    User.findById(req.params.id, function(err, user) {
      res.render('users/show.ejs', { user: user });
      // });
  });
});

    //PROCESS THE LOGIN FORM- GOES TO USERS PROFILE PAGE
router.post('/login', passport.authenticate('local-login', {
// successRedirect : '/profile', // redirect to the secure profile section
failureRedirect : '/users'}), function(req, res) { // redirect back to the signup page if there is an error
  res.redirect('/users/' + req.user.id );
  // console.log("is logged in");
});

//INDEX PAGE WHEN A NEW USER SIGNS UP
router.get('/:id/index', function(req, res) {
  //checks if the user is logged in
  res.locals.usertrue = (req.user.is == req.params.id);
  req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
  //list users
  User.find({}, function(err, users) {
    //finds single user
    User.findById(req.params.id, function(err, user) {
        res.render('users/index.ejs', { user: user });
    });
  });
});

// CREATE NEW USER
  //PROCESS SIGNUP FORM- GOES TO INFO FORM PAGE
router.post('/signup', passport.authenticate('local-signup', {
  failureRedirect : '/users'}), function(req, res) { //redirect back to signup if there is an error
  res.redirect('/users/' + req.user.id + '/index');
    // console.log(users);
    // User.findById(req.params.id, function(err, user) {
    //     res.render('users/index.ejs', { user: user });
    // });
// });
});

// PROCESS INFO FORM
router.post('/:id/index', function(req, res){
 // console.log("This is req.body " + req.body);
 // console.log("This is req.params.id " + req.params.id)
  User.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
  res.redirect('/users/' + req.user.id );
  });
});






// // EDIT
// router.get('/:id/edit', function(req, res) {
//   for(var i = 0; i < User.data.length; i++) {
//     if(User.data[i].id == req.params.id) {
//       res.render('edit.ejs', User.data[i])
//     }
//   }
// });

// //User
// router.put('/:id', function(req, res) {
//   req.body.id = parseInt(req.params.id);
//   for(var i = 0; i < User.data.length; i++) {
//     if(User.data[i].id == req.params.id) {
//       User.data[i] = req.body;
//     }
//   }
//   res.redirect('/users');
// });


//defines isLoggedIn
function isLoggedIn(req, res, next) {
//if user exists, do this
  if (req.isAuthenticated())
    return next();
//if user doesn't exists, go here
  res.redirect('/');
} ;

//comment
// router.get('/', function(req, res) {
//   Comments.find({}, function(err, comments) {
//   res.render('users/show.ejs', 
//     {comments : comments});
// });
// });

 router.get('/:id', isLoggedIn, function(req, res) {
//checks that the user logged in is the user being shown
  res.locals.usertrue = (req.user.id == req.params.id);

  Comments.find({}, function(err, comments){
    //finds a specific user
    User.findById(req.params.id, function(err, user){
      res.render('users/show.ejs', {
        user: user,
        comments: comments
      })
    })
  })
});

router.post('/:id/comments', function(req, res) {
  Comments.findById(req.params.id, function(err, user) {
    var newComment = new Comments(req.body);
    newComment.save(function(err, comments) {
      user.comments.push(comments);
      user.save(function(err) {
        res.redirect('/users/' + req.params.id );
      });
    });
  });
});


// router.post('/:id/comments', function(req, res){
//   console.log(req.body);
//  // console.log("This is req.body " + req.body);
//  // console.log("This is req.params.id " + req.params.id)
//   User.findByIdAndUpdate(req.params.id, req.body, function(err, comments) {
//   res.redirect('/users/' + req.user.id + '/comments' );
//   });
// });



//delete user
router.delete('/:id/index', function(req,res){
  console.log("This is delete " + req.params.id)
  User.findByIdAndRemove(req.params.id, function(err, user){
    res.redirect('/users/');
  })
});

module.exports = router;



// router.delete('/:id', function(req, res){
//     console.log("This is delete " + req.params.id)
//   User.findByIdAndRemove(req.params.id, function(err, data){
//     res.redirect('/');
//   });
// });



// router.post('/:id/newinfo', function(req, res) {
//     User.findById(req.params.id, function(err, user) {
//         var newUser = new User(req.body);
//         user.save(function(err, location) {
//             user.push(user);
//             user.save(function(err, user) {
//                 res.redirect('/users/' + req.params.id);
//             });         
//         });
//     });
// });

// router.post('/users', function(req, res) {
//     User.findById(req.params.id, function(err, user) {
//         var newUser = new User(req.body);
//         newUser.save(function(err, location) {
//             user.push(user);
//             user.save(function(err) {
//                 res.redirect('/users/' + req.params.id);
//             });
//         });
//     });
// });


// DELETE
// router.delete('/:id', function(req, res) {
//     console.log("This is delete " + req.params.id)
//     var deleteUser = req.params.id;
//     User.findById(deleteUser, function(err, user) {
//         //for loop to delete user
//         for (var i = 0; i < users.length; i++) {
//             User.findByIdAndRemove(deleteUser, function(err, user) {
//                 res.redirect('/users');
//             });
//         };
//     });
// });




