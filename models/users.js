//userSchema 
var mongoose = require('mongoose');
var commentsSchema = require('./comments').schema;
var membersSchema = require('./members').schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	comments: [commentsSchema],
	members: [membersSchema],
	username: String,
	email: String,
  password: String,
  img: String, //url 
	bio: String,
	instruments: [],
	soundcloud: String, //[soundCloudSchema],
	genre: String, 
	looking: String 
	
	// members: [membersSchema]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


// create the model for users and expose it to our app
module.exports = mongoose.model('Users', userSchema);