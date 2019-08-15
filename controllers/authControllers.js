var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var User = require("../models/users");
var services = require("../services/services");
var userSchema = User.UserSchema;
var otpModel = require("../models/otp");
var tokenModel = require("../models/token");
var tokenSchema = tokenModel.tokenSchema;
var otpSchema = otpModel.otpSchema;
var constants = require("../constants");
var emailService = require("../services/emailService");

var getPwdHash = services.commons.getPwdHash;

router.post("/register", function(req, resp) {
  console.log("request:: " + req);
  resp.send("registration sucessful");
});
router.post("/login", function(req, resp) {
  console.log("request:: " + req);
  resp.send("login sucessful");
});
module.exports = router;
