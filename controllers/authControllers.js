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
var crypto = require("crypto");
var port = require("../models/port");
var portModel = port.portModel;
var portSchema = port.portSchema;
var getPwdHash = services.commons.getPwdHash;
var serviceModel = require("../models/service");
var apiEndPoint = require("../models/api_endpoints");
var soapEndPoint = require("../models/soap_endpoints");
var multipart = require("../models/multipart_files");
var apiEndPointModel=apiEndPoint.apiEndPointModel;

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
      .toLowerCase()
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
                let port = new portModel({ unique_name: unique_name });
                port.save(function(err) {
                  if (err) {
                    console.log(err);
                    res.status(500).send({ msg: "some issue at server side" });
                  } else {
                    res.status(200).send({ msg: "User successfully created" });
                    sendOtp(unique_name, "user_registration", email);
                    services.commons.createDirectory(
                      "./servers/" + unique_name
                    );
                    services.commons.createDirectory(
                      "./templates/" + unique_name
                    );
                    services.commons.copyFile(
                      "../templates/",
                      "../servers/" + unique_name
                    );
                  }
                });
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
  let teamName = req.body.teamName;
  let password = req.body.password;
  var query = User.findActiveUserByTeamName(teamName);
  query.exec(function(err, user) {
    if (err) {
      return false;
    }
    if (user.length > 0) {
      hash_db = user[0].password;
      salt_db = user[0].salt;
      var hash = crypto
        .pbkdf2Sync(password, salt_db, 1000, 64, `sha512`)
        .toString(`hex`);

      if (hash === hash_db) {
        let token = services.commons.getRandomToken();
        let d = new Date();
        let d1 = services.commons.getTimeByOffset(constants.otpExpiry);
        var response = {
          teamName: teamName,
          token: token,
          is_active: true,
          generated_timestamp: d,
          token_expiry: d1
        };
        tokenS = new tokenSchema(response);
        tokenS.save(function(err) {
          if (err) {
            res.status(400).send({ msg: "something went wrong" });
          } else {
            response.msg = "User Authenticated";
            response.email = user[0].email;
            response.contactPerson = user[0].contact_person;
            response.employeeId = user[0].employeeId;
            response.uniqueName = user[0].unique_name;
            res.status(200).send(response);
          }
        });
      } else {
        res.status(404).send({ msg: "user not authenticated" });
      }
    } else {
      res.status(404).send({ msg: "user not authenticated" });
    }
  });
});
/**
 * delete tenant folder
 * copy fresh baseline to tenant folder
 * read db and add routes to index.js file
 * start server
 */
router.post("/start-services", function(req, res) {
  var uniqueName = req.body.uniqueName;
  services.commons.deleteFolder("../../templates/" + uniqueName);
  services.commons.copyFolder(
    "../../templates/baseline",
    "../../templates/" + uniqueName
  );
  apiEndPointModel.findAllApiEndpointsByUniqueName(uniqueName).exec(function(err,apiEndpoints){
    console.log(apiEndpoints);
  });
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
