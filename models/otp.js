var mongoose = require("mongoose");
const otpstatus = Object.freeze({
  New: "new",
  Verified: "verified",
  Rejected: "rejected"
});
const otpPurpose = Object.freeze({
  Registration: "user_registration",
  PasswdReset: "password_reset",
  ForgotPwd: "forgot_password"
});
var otpSchema = new mongoose.Schema({
  user_name: String,
  otp: Number,
  otpPurpose: { type: String, enum: Object.values(otpPurpose) },
  generated_timestamp: { type: Date, default: Date.now },
  exipiry_timestamp: { type: Date },
  status: { type: String, enum: Object.values(otpstatus) }
});

var otpModel = mongoose.model("otp", otpSchema);
module.exports = {
  otpSchema: otpModel,
  findAllOtPsByuserName: function(user_name) {
    return otpModel.find({ user_name: user_name });
  },
  findActiveOtpByUserName: function(user_name) {
    return otpModel.findOne({
      user_name: user_name,
      status: "new",
      generated_timestamp: { $lte: new Date() },
      exipiry_timestamp: { $gte: new Date() }
    });
  },
  findByUserNameAndUpdate: function(user_name, otp, purpose) {
    let update = { status: "verified" };
    let query = {
      user_name: user_name,
      otp: otp,
      otpPurpose: purpose,
      status: "new",
      generated_timestamp: { $lte: new Date() },
      exipiry_timestamp: { $gte: new Date() }
    };
    console.log(query);
    return otpModel
      .findOneAndUpdate(query, update)
      .sort("-generated_timestamp");
  }
};
