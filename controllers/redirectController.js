var express = require("express");
var router = express.Router();
var apiEndPoint = require("../models/api_endpoints");
var redirects = require("../models/redirects");
var apiEndPointModel = apiEndPoint.apiEndPointModel;
var redirectModel = redirects.redirectModel;
var redirectSchema = redirects.redirectSchema;

router.post("/add", function(req, res) {
  var redirectSchema = new redirectModel(req.body);
  redirectSchema.save(function(err) {
    if (err) {
      console.log(err);
      res.status(404).send({ msg: "internal error" });
    } else {
      res.status(200).send({ msg: "redirect Saved successsfully" });
    }
  });
});

router.get("/get", function(req, res) {
  var uniqueName = req.query.uniqueName;
  redirects.getAllActiveRedirects(uniqueName).exec(function(err, result) {
    if (err) {
      res.status(404).send({ msg: "something went wrong " + err });
    } else {
      apiEndPoint
        .findAllApiEndpointsByUniqueNameOnly(uniqueName)
        .exec(function(err, apiEndPoints) {
          if (err) {
            res.status(404).send({ msg: "something went wrong " + err });
          } else {
            apiEndPoints.forEach(api => {
              let rd = {};
              rd.uniqueName = api.uniqueName;
              rd.apiEndpointName = api.apiEndpointName;
              rd.serviceName = api.serviceName;
              rd.redirectUrl = undefined;
              rd.authHeader = { key: undefined, value: undefined };
              rd.isActive = false;
              result.push(rd);
            });
            let m = new Map();
            uniqueResults = result.filter(function(elem) {
              if (
                !m.has(
                  elem.uniqueName + elem.serviceName + elem.apiEndpointName
                )
              ) {
                m.set(
                  elem.uniqueName + elem.serviceName + elem.apiEndpointName,
                  "1"
                );
                return true;
              }
            });
            console.log(uniqueResults);
            res.status(200).send(uniqueResults);
          }
        });
    }
  });
});

checkExists = function(arr, uniqueName, serviceName, apiEndpointName) {
  arr.forEach(a => {
    if (
      a.uniqueName == uniqueName &&
      a.serviceName == serviceName &&
      a.apiEndpointName == apiEndpointName
    ) {
      return true;
    }
  });
  return false;
};
module.exports = router;
