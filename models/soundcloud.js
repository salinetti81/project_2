// sound cloud schema stuff
var mongoose = require('mongoose');

var soundCloudSchema = mongoose.Schema({
	user: String, //user id
	link: String,
	genre: String, //this might need to be deleted
	comments: String
});

var SC = mongoose.model('SC', soundCloudSchema);
module.exports = SC;