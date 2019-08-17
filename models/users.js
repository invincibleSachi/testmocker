var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
let validator = require("validator");
var crypto = require("crypto");

var userAccountSchema = new mongoose.Schema({
  unique_name: { type: String, required: true, unique: true },
  team_name: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      return validator.isEmail(value);
    }
  },
  password: { type: String, required: true },
  contact_person: { type: String },
  employeeId: { type: String },
  salt: { type: String },
  is_active: Boolean
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
    console.log("finding user by email " + email);
    return User.find({ email: email });
  },
  findActiveUserByTeamName: function(team_name) {
    console.log("finding Active user by team name " + team_name);
    return User.find({ team_name: team_name, is_active: true });
  },
  findUserByTeamName: function(team_name) {
    console.log("finding user by team name " + team_name);
    return User.find({ team_name: team_name });
  },

  findByUserNameAndUpdatePwd: function(
    team_name,
    password_hash,
    password_salt
  ) {
    let update = { password_hash: password_hash, password_salt: password_salt };
    let query = { team_name: team_name };
    console.log(query);
    return User.findOneAndUpdate(query, update);
  },
  activeUser: team_name => {
    let query = { team_name: team_name };
    let update = { is_active: true };
    return User.findOneAndUpdate(query, update);
  },
  verifyUserCreds: function(team_name, password) {
    var query = User.findOne({ team_name: team_name, is_active: true });
    query.exec(function(err, user) {
      if (err) {
        return false;
      }
      hash_db = user.password;
      salt_db = user.salt;
      console.log("auths");
      console.log(hash_db);
      console.log(salt_db);
      var hash = crypto
        .pbkdf2Sync(password, salt_db, 1000, 64, `sha512`)
        .toString(`hex`);
      console.log(hash);
      console.log(hash === hash_db);
      return hash === hash_db;
    });
  }
};
