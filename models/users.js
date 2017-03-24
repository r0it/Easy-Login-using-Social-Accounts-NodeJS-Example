
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    social_id: String,
    token: String,
    displayName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    signup_type: String //'LOCAL', 'GOOGLE', 'FACEBOOK', 'LINKED_IN'
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Users', userSchema);
