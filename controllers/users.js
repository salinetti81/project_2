var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/users');
var SoundCloud = require('../models/soundcloud');
var Comments = require('../models/comments');
var Members = require('../models/members');

//INDEX
router.get('/', function(req, res) {
  res.locals.login = req.isAuthenticated();
  User.find(function(err, data) {
      res.render('./index.ejs', {users: data});
  });
});


// // //SHOW PAGE FOR WHEN USER IS LOGGED IN
// router.get('/:id/', function(req, res) {
//   //checks if the user is logged in
//   // res.locals.usertrue = (req.user.id == req.params.id);
//   // req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
//   //list users
//   // User.find({}, function(err, users) {
//     //finds single user
//     User.findById(req.params.id, function(err, user) {
//       // console.log(user);
//       res.render('users/show.ejs', { user: user });
//       // });
//   });
// });


//JSON
router.get('/json', function(req, res) {
  User.find(function(err, users) {
      res.send(users);
  });
});
//LOGOUT
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users');
});

// SHOW
router.get('/:id', function(req, res) {
  res.locals.login = req.isAuthenticated();
  User.find({}, function(err, users) {
    console.log(users.length);
    User.findById(req.params.id, function(err, user) {
      res.render('users/show.ejs', {users: users, user: user});
    })
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

// Members JSON
router.get('/members/json', function(req, res) {
  Members.find(function(err, members) {
  res.send(members);
});
});





// router.get('/edit', function(req, res) {
//   res.send("This works");
// });

// A user needs to be able to edit thier OWN page
// // EDIT
router.get('/:id/edit', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user) {
     res.render('users/edit.ejs', { user: user });
  });
  // for(var i = 0; i < User.length; i++) {
  //   if(User[i].id == req.params.id) {
     
  //   }
  // }
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
  res.locals.usertrue = (req.user.id == req.params.id);
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

//comment
router.post('/:id/comments', function(req, res) {
  // Comments.findByIdAndUpdate(req.params.id, req.body, function(err, comments) {
    User.findById(req.params.id, function(err, user) {

      var newComment = new Comments(req.body);
      newComment.save(function(err, comments) {
      user.comments.push(comments);
       user.save(function(err) {
        console.log('user saved');
        res.redirect('/users/' + req.params.id );
         });
       });
   });
  // });
});

router.get('/', function(req, res) {
  // Comments.find({profileId}, req.params.id, req.body, function(err, comments)
  Comments.findByIdAndUpdate(req.params.id, req.body, function(err, comments) {
  Comments.find({}, function(err, comments) {
  res.render('users/show.ejs', 
    {comments : comments});
});
});
});

//List of users
// router.get('/', function(req, res) {
//   // User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
//     User.find({}, function(err, user) {
//       res.send('users/show.ejs' ,
//       {user : user});
//     });
//   // });
// });

// // Json for members
// router.get('/json', function(req, res) {
//   Members.find(function(err, members) {
//     res.send(members);
//   });
// });

// Members List on Users Profile Page
// members index
// router.get('/', isLoggedIn, function(req, res) {
//   Members.find(function(err, members) {
//     res.render('members/index.ejs', 
//       {members: members});
//   });
// });

// // saves a new member to the member model and the User's list
// router.post('/:id/newmember', function(req, res) {
//   User.findById(req.params.id, function(err, user) {
//     var member = new Members(req.body);
//     member.save(function(err, member) {
//       user.members.push(member);
//       user.save(function(err, user) {
//         res.redirect('/users/' + req.params.id);
//       });     
//     });
//   });
// });


// router.get('/:id/edit', function(req, res) {
//   //checks if the user is logged in
//   res.locals.usertrue = (req.user.id == req.params.id);
//   req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
//   //list users
//   User.find({}, function(err, users) {
//     //finds single user
//     User.findById(req.params.id, function(err, user) {
//         res.render('users/edit.ejs', { user: user });
//     });
//   });
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

//delete user
router.delete('/:id/index', function(req,res){
  console.log("This has been deleted " + req.params.id)
    User.findByIdAndRemove(req.params.id, function(err, user){
      res.redirect('/users/');
  })
});

module.exports = router;
//  router.get('/:id', isLoggedIn, function(req, res) {
// //checks that the user logged in is the user being shown
//   res.locals.usertrue = (req.user.id == req.params.id);

//    Comments.find({}, function(err, comments){
//     //finds a specific user
//     User.findById(req.params.id, function(err, user){
//       res.render('users/show.ejs', {
//         user: user,
//         comments: comments
//       })
//     })
//   })
// });






// Person.
//   find({
//     occupation: /host/,
//     'name.last': 'Ghost',
//     age: { $gt: 17, $lt: 66 },
//     likes: { $in: ['vaporizing', 'talking'] }
//   }).



// User.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
//   res.redirect('/users/' + req.user.id );
//   });
// router.post('/:id/comments', function(req, res){
//   console.log(req.body);
//  // console.log("This is req.body " + req.body);
//  // console.log("This is req.params.id " + req.params.id)
//   User.findByIdAndUpdate(req.params.id, req.body, function(err, comments) {
//   res.redirect('/users/' + req.user.id + '/comments' );
//   });
// });






//////////THIS TYPE OF DELETE FEATURE MIGHT BE NEEDED LATER ON/////////////
// // delete 
// router.delete('/:id', function(req, res) {
//   console.log('DELETE ROUTE ACCESSED');
//   User.findById(req.params.id, function(err, user) {
//     if (user.locations.length == 0) {
//       user.remove(function(err) {
//         res.redirect('/users');
//       });
//     } else {
//       user.locations.forEach(function(location) {
//         Location.findOneAndRemove({ _id: location.id }, function(err) {
//           if (err) console.log(err);
//         });
//       });
//       user.remove(function(err) {
//         res.redirect('/users');
//       });
//     } // end if
//   }); // end User find
// });





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




