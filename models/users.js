//userSchema 
var mongoose = require('mongoose');
//require second schema here
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	username: String,
	email: String,
  password: String,
	bio: String,
	instruments: String,
	//add more schema stuff
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