// This is the Comments Controller
var express = require('express');
var router = express.Router();

var Comments = require('../models/comments');

// INDEX
router.get('/', function(req, res) {
	Comments.find(function(err, comments) {
  res.render('users/show.ejs', {data : comments});
});
});



router.get('/json', function(req, res) {
  Comments.find(function(err, comments) {
    res.send(comments);
  });
});




// // Process the Comments Form
// router.post('/:id/index', function(req, res){
//  // console.log("This is req.body " + req.body);
//  // console.log("This is req.params.id " + req.params.id)
//   User.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
//   res.redirect('/users/' + req.user.id );
//   });
// });



module.exports = router;