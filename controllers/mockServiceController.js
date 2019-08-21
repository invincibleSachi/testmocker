var express = require("express");
var router = express.Router();
var serviceModel = require("../models/service");
var service = serviceModel.serviceModel;
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
router.post("/create-api", function(req, res, next) {});
router.post("/create-soap", function(req, res, next) {});
module.exports = router;
