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
var runningInstances = require("../models/running_instances");
var instanceModel = runningInstances.instanceModel;
var apiEndPointModel = apiEndPoint.apiEndPointModel;
const spawn = require("child_process").spawn;
const kill = require('tree-kill');

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
  function (req, res, next) {
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
    User.findUserByTeamName(teamName).exec(function (err, user1) {
      if (user1.length > 0) {
        console.log("found recordby teamname" + JSON.stringify(user1));
        return res.status(404).send({ msg: "teamname already registered" });
      } else {
        User.findUserByEmail(email).exec(function (err, user2) {
          if (user2.length > 0) {
            console.log("found recordby email" + JSON.stringify(user2));
            return res.status(404).send({ msg: "email already registered" });
          } else {
            var requestedUser = new userSchema(usr);
            requestedUser.save(function (err) {
              if (err) {
                console.log(err);
                res.status(500).send({ msg: "some issue at server side" });
              } else {
                console.log(JSON.stringify(usr));
                let port = new portModel({ unique_name: unique_name });
                port.save(function (err) {
                  if (err) {
                    console.log(err);
                    res.status(500).send({ msg: "some issue at server side" });
                  } else {
                    res.status(200).send({ msg: "User successfully created" });
                    sendOtp(unique_name, "user_registration", email);
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

router.post("/verifyOtp", function (req, res) {
  let teamName = req.body.teamName;
  let otp = req.body.otp;
  let purpose = req.body.purpose;
  User.findUserByTeamName(teamName).exec(function (err, user1) {
    if (user1.length > 0) {
      otpModel
        .findByUserNameAndUpdate(user1[0].unique_name, otp, purpose)
        .exec(function (err, otprec) {
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
            User.activeUser(teamName).exec(function (err, user2) {
              res
                .status(200)
                .send({ msg: "otp has been successfully verified!!" });
            });
          } else res.status(400).send({ msg: "invalid otp params passed" });
        });
    }
  });
});
router.post("/login", function (req, res) {
  console.log("request:: " + req.body);
  let teamName = req.body.teamName;
  let password = req.body.password;
  var query = User.findActiveUserByTeamName(teamName);
  query.exec(function (err, user) {
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
        tokenS.save(function (err) {
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
router.post("/start-services", function (req, res) {
  var uniqueName = req.body.uniqueName;
  console.log("current directory");
  services.commons.executeOsCommand("pwd");
  services.commons.deleteFolder("./servers/" + uniqueName);
  services.commons.createDirectory("./servers/" + uniqueName);
  services.commons.copyFolder(
    "./templates/baseline",
    "./servers/" + uniqueName
  );
  apiEndPoint
    .findAllApiEndpointsByUniqueName(uniqueName)
    .exec(function (err, apiEndpoints) {
      console.log(apiEndpoints);
      port.findPortByUniqueName(uniqueName).exec(function (err, portDetails) {
        if (err) {
          res.status(404).send({ msg: "port not available" });
        }
        console.log("portal details");
        console.log(portDetails);
        let portNumber = portDetails[0].port_number;
        if (apiEndpoints.length > 0) {
          var folder = "./servers/" + uniqueName;
          apiEndpoints.forEach(function (apiEndpoint) {
            addApiEndPoints2Server(apiEndpoint, folder + "/server.js");
          });
          strAppend = "app.listen(" + portNumber + ");";
          services.commons.append2File(folder + "/server.js", strAppend);
          console.log("starting server");
          const child = spawn(
            'nohup', ['./start.sh', '&'], { cwd: folder }
          );
          child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });

          child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
          });

          child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
          });
          let process = {
            unique_name: uniqueName,
            port_number: portNumber,
            pid_number: child.pid,
            status: true
          };
          var instance = new instanceModel(process);
          instance.save(function (err) {
            if (err) {
              throw err;
            } else {
              res
                .status(200)
                .send({ msg: "servers started on port " + portNumber });
            }
          });
          console.log(child.pid);
        } else {
          res.status(200).send({ msg: "no api end points available." });
        }
      });
    });
});

router.post("/stop-services", function (req, res) {
  const uniqueName = req.body.uniqueName;
   runningInstances.findPidByUniqueName(uniqueName).exec( function (err, data) {
    data.forEach(pid => {
      console.log(pid)
      console.log(pid.pid_number)
      kill(pid.pid_number, 'SIGKILL', function (err) {
        if (err) {
          console.log('failed to kill pid ' + pid.pid_number);
          console.log(err);
        } else {
          console.log('killed process id ' + pid.pid_number);
        }
      });
    });
    runningInstances
        .deleteAllInstanceByUniqueName(uniqueName)
        .exec(function (err, data) {
          if (err) {
            throw err;
          } else {
            console.log(data);
            cmd = "rm -rf servers/" + uniqueName + "/";
            services.commons.executeOsCommand(cmd);
            res.status(200).send({ msg: "All Servers Stopped" });
          }
        });
  });

});

var addApiEndPoints2Server = (apiEndPoint, fileName) => {
  let type = apiEndPoint.apiType;
  let apiEndPointName = apiEndPoint.apiEndpointName;
  let serviceName = apiEndPoint.serviceName;
  let requestHeaders = apiEndPoint.requestHeaders;
  let responseHeaders = apiEndPoint.responseHeaders;
  let qparams = apiEndPoint.requestQueryParams;
  let requestBody = apiEndPoint.requestBody;
  let responseBody = apiEndPoint.responseBody;
  let responseTokens = responseBody.tokenMap;
  let respbody = responseBody.body;
  console.log(respbody);
  if (responseTokens != undefined) {
    responseTokens.forEach(token => {
      respbody = services.commons.replaceAll(respbody, token[0], token[1]);
    });
  }

  let strRequestStart =
    "app." +
    type.toLowerCase() +
    "('/" +
    apiEndPointName +
    "',function(req,res){\n";
  let strRequestEnd = "\n});\n";
  let strBody =
    "res.status(200).send(" + JSON.stringify(JSON.parse(respbody)) + ");";
  let str = strRequestStart + strBody + strRequestEnd;
  services.commons.append2File(fileName, str);
};

var waitTime = async function setTimeout() {
  await sleep(3000);
};

var sendOtp = function (unique_name, purpose, email) {
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
  requestedOtp.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("otp Generated Successfully");
      emailService.sendRegistrationOTP(otp, email, unique_name);
    }
  });
};
module.exports = router;
