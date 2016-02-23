// connections schema
var mongoose = require('mongoose');
// var user = require
// var usersSchema = require("./users").schema;
var bcrypt = require('bcrypt-nodejs');

var commentsSchema = mongoose.Schema({
	name: String,
	profile: String,
	comments: String,
	profileId: String
	// user: [usersSchema]
});



module.exports = mongoose.model("Comments", commentsSchema);