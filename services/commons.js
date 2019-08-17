var crypto = require("crypto");
const uuidv4 = require("uuid/v4");
module.exports = {
  getRandomNumber: function(size) {
    let max = Math.pow(10, size) - 1;
    let min = Math.pow(10, size - 1);
    return Math.floor(Math.random() * (max - min) + min);
  },
  getRandomText: function(size) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  getTimeByOffset: function(seconds) {
    let d = new Date();
    return new Date(d.getTime() + seconds * 1000);
  },
  getPwdHash: function(password) {
    // creating a unique salt for a every user
    var salt = crypto.randomBytes(16).toString("hex");
    var hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return [hash, salt];
  },
  comparePwd: function(password, salt, stored_hash) {
    var new_pwd_hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return new_pwd_hash === stored_hash;
  },
  getRandomToken: function() {
    return uuidv4();
  }
};
