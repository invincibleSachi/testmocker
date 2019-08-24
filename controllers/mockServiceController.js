var express = require("express");
var router = express.Router();
var serviceModel = require("../models/service");
var apiEndPointModel = require("../models/api_endpoints");
var service = serviceModel.serviceModel;
var apiEndPointModel = apiEndPointModel.apiEndPointModel;
const { check, validationResult } = require("express-validator");

router.post("/create-service", function(req, res, next) {
  let serviceObj = {
    unique_name: req.body.teamName
      .trim()
      .toLowerCase()
      .replace(/" "/g, "_"),
    service_name: req.body.serviceName
  };
  console.log(serviceObj);
  let serviceModel = new service(serviceObj);
  serviceModel.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send({ msg: "Service already exists" });
    } else {
      res.status(200).send({ msg: "service created successfully!!" });
    }
  });
});
router.post("/create-api", function(req, res, next) {
  let createApi = new apiEndPointModel(req.body);
  createApi.save(function(err) {
    console.log(err);
  });
});
router.post("/create-soap", function(req, res, next) {});
router.get("/get-services-list", function(req, resp) {
  var uniqueName = req.query.uniqueName;
  console.log(uniqueName);
  serviceModel
    .findServiceByUniqueName(uniqueName)
    .select("service_name")
    .exec(function(err, result) {
      console.log(result);
      if (err) {
        resp.status(404).send({ msg: "internal error" });
      } else {
        resp.status(200).send(result);
      }
    });
});
module.exports = router;
