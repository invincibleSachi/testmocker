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
  unique_name: { type: String, required: true, unique: true },
  otp: Number,
  otpPurpose: { type: String, enum: Object.values(otpPurpose) },
  generated_timestamp: { type: Date, default: Date.now },
  exipiry_timestamp: { type: Date },
  status: { type: String, enum: Object.values(otpstatus) }
});

var otpSchema = mongoose.model("otp", otpSchema);
module.exports = {
  otpSchema: otpSchema,
  findAllOtPsByuserName: function(unique_name) {
    return otpSchema.find({ unique_name: unique_name });
  },
  findActiveOtpByUniqueName: function(unique_name) {
    return otpSchema.findOne({
      unique_name: unique_name,
      status: "new",
      generated_timestamp: { $lte: new Date() },
      exipiry_timestamp: { $gte: new Date() }
    });
  },
  findByUserNameAndUpdate: function(unique_name, otp, purpose) {
    let update = { status: "verified" };
    let query = {
      unique_name: unique_name,
      otp: otp,
      otpPurpose: purpose,
      status: "new",
      generated_timestamp: { $lte: new Date() },
      exipiry_timestamp: { $gte: new Date() }
    };
    console.log("query");
    console.log(query);
    return otpSchema
      .findOneAndUpdate(query, update)
      .sort("-generated_timestamp");
  }
};
