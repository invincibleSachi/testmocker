var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
let validator = require("validator");
var crypto = require("crypto");

var userAccountSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  team_name: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      return validator.isEmail(value);
    }
  }
});
userAccountSchema.methods.setPassword = function(password) {
  // creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // hashing user's salt and password with 1000 iterations,
  //64 length and sha512 digest
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return [hash, salt];
};
userAccountSchema.methods.validPassword = function(password, salt) {
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

var User = mongoose.model("User", userAccountSchema);
module.exports = {
  UserSchema: User,
  findUserByEmail: function(email) {
    return User.find({ email: email });
  },
  findUserByTeamName: function(team_name) {
    console.log("finding user by user name " + team_name);
    return User.find({ team_name: team_name });
  },
  findActiveUserByUserName: function(user_name) {
    console.log("finding user by user name " + user_name);
    return User.find({ user_name: user_name, is_active: true });
  },
  findByUserNameAndUpdatePwd: function(
    user_name,
    password_hash,
    password_salt
  ) {
    let update = { password_hash: password_hash, password_salt: password_salt };
    let query = { user_name: user_name };
    console.log(query);
    return User.findOneAndUpdate(query, update);
  },
  verifyUserCreds: function(user_name, password) {
    var user = User.findOne({ user_name: user_name });
    hash_db = user.password_hash;
    salt_db = user.password_salt;
    var hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return hash_db === hash;
  }
};
