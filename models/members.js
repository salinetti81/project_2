//members schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var membersSchema = mongoose.Schema({
	name: String,
	img: String,
	profileUrl: String,
	memberId: String //uniqure id generated for user to show in list on other members page

});

module.exports = mongoose.model('Members', membersSchema);