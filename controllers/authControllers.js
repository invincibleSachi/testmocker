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

router.post(
  "/register",
  [
    check("teamName")
      .isLength({ min: 3, max: 24 })
      .withMessage("team name can be between 3 to 24 chars"),
    check("email")
      .isEmail()
      .withMessage("email id is not valid"),
    check("employeeId").isLength({ min: 6, max: 10 }),
    check("contactPerson").isString(),
    check("password")
      .isLength({ min: 8, max: 30 })
      .withMessage("password can not be less than 8 chars"),
    check("cpassword")
      .equals("password")
      .withMessage("password and confirm password not matching")
  ],
  function(req, res, next) {
    console.log("request:: " + JSON.stringify(req.body));
    let teamName = req.body.teamName;
    let email = req.body.email;
    let employeeId = req.body.employeeId;
    let contactPerson = req.body.contactPerson;
    let password = req.body.password;
    let creds = getPwdHash(password);
    let unique_name = teamName
      .trim()
      .toUpperCase()
      .replace(/" "/g, "_");
    var usr = {
      unique_name: unique_name,
      team_name: teamName.trim(),
      email: email,
      password: creds[0],
      salt: creds[1],
      contact_person: contactPerson,
      employeeId: employeeId,
      is_active: false
    };
    User.findUserByTeamName(teamName).exec(function(err, user1) {
      if (user1.length > 0) {
        console.log("found recordby teamname" + JSON.stringify(user1));
        return res.status(404).send({ msg: "teamname already registered" });
      } else {
        User.findUserByEmail(email).exec(function(err, user2) {
          if (user2.length > 0) {
            console.log("found recordby email" + JSON.stringify(user2));
            return res.status(404).send({ msg: "email already registered" });
          } else {
            var requestedUser = new userSchema(usr);
            requestedUser.save(function(err) {
              if (err) {
                console.log(err);
                res.status(500).send({ msg: "some issue at server side" });
              } else {
                console.log(JSON.stringify(usr));
                res.status(200).send({ msg: "User successfully created" });
                sendOtp(unique_name, "user_registration", email);
              }
            });
          }
        });
      }
    });
  }
);

router.post("/verifyOtp", function(req, res) {
  let teamName = req.body.teamName;
  let otp = req.body.otp;
  let purpose = req.body.purpose;
  User.findUserByTeamName(teamName).exec(function(err, user1) {
    if (user1.length > 0) {
      otpModel
        .findByUserNameAndUpdate(user1[0].unique_name, otp, purpose)
        .exec(function(err, otprec) {
          console.log("otp rec::");
          console.log(otprec);
          if (err) {
            res.status(400).send({ msg: "something went wrong" });
          }
          if (otprec) {
            console.log(
              "otp updated successfully:  %s %s %s",
              otprec.otp,
              otprec.status,
              otprec.exipiry_timestamp
            );
            User.activeUser(teamName).exec(function(err, user2) {
              res
                .status(200)
                .send({ msg: "otp has been successfully verified!!" });
            });
          } else res.status(400).send({ msg: "invalid otp params passed" });
        });
    }
  });
});
router.post("/login", function(req, res) {
  console.log("request:: " + req.body);
  let userName = req.body.teamName;
  let password = req.body.password;
  res.send("login sucessful");
});

var sendOtp = function(unique_name, purpose, email) {
  let otp = services.commons.getRandomNumber(4);
  let d = new Date();
  let d1 = services.commons.getTimeByOffset(constants.otpExpiry);
  let otpObj = {
    unique_name: unique_name,
    otp: otp,
    generated_timestamp: d,
    exipiry_timestamp: d1,
    status: "new",
    otpPurpose: purpose
  };
  var requestedOtp = new otpSchema(otpObj);
  requestedOtp.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("otp Generated Successfully");
      emailService.sendRegistrationOTP(otp, email, unique_name);
    }
  });
};
module.exports = router;
