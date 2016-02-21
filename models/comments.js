// connections schema
var mongoose = require('mongoose');
var Users = require("./users").schema;
var bcrypt = require('bcrypt-nodejs');

var commentsSchema = mongoose.Schema({
	name: String,
	profile: String,
	comments: String,
});

module.exports = mongoose.model("Comments", commentsSchema);