var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var serviceModel = require("../models/service");
var apiEndPoint = require("../models/api_endpoints");
var soapEndPoint = require("../models/soap_endpoints");

router.post("/update-api", function(req, res, next) {
  var endpointDef = apiEndPoint.apiEndPointModel;
  let endpoint = new endpointDef(req.body);
  let uniqueName = req.body.uniqueName;
  apiEndPoint.updateApiEndPoint(uniqueName, endpoint).exec(function(err, data) {
    if (err) {
      res.status(400).send({ msg: "update failed" });
    } else {
      res.status(200).send({ msg: "api endpoint updated successfully" });
    }
  });
});
router.post("/update-soap", function(req, res, next) {
  var endpointDef = soapEndPoint.soapEndPointModel;
  let endpoint = new endpointDef(req.body);
  let uniqueName = req.body.uniqueName;
  soapEndPoint
    .updateApiEndPoint(uniqueName, endpoint)
    .exec(function(err, data) {
      if (err) {
        res.status(400).send({ msg: "update failed" });
      } else {
        res.status(200).send({ msg: "api endpoint updated successfully" });
      }
    });
});
router.get("/get-rest-endpoints", function(req, res, next) {
  let uniqueName = req.param.uniqueName;
  apiEndPoint
    .findAllApiEndpointsByUniqueName(uniqueName)
    .exec(function(err, apiEndpoints) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(apiEndpoints);
      }
    });
});
router.get("/get-rest-endpoints-name", function(req, res, next) {
  let uniqueName = req.param.uniqueName;
  apiEndPoint
    .getApiEndPointNames(uniqueName)
    .exec(function(err, apiEndpointNames) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(apiEndpointNames);
      }
    });
});
router.get("/get-soap-endpoints", function(req, res, next) {
  let uniqueName = req.param.uniqueName;
  soapEndPoint
    .findAllSoapEndpointsByUniqueName(uniqueName)
    .exec(function(err, soapEndpoints) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(soapEndpoints);
      }
    });
});
router.get("/get-soap-endpoints-name", function(req, res, next) {
  let uniqueName = req.param.uniqueName;
  soapEndPoint
    .getApiEndPointNames(uniqueName)
    .exec(function(err, soapEndpointNames) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(soapEndpointNames);
      }
    });
});

module.exports = router;
