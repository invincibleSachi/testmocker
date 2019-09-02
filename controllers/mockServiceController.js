var express = require("express");
var router = express.Router();
var serviceModel = require("../models/service");
var apiEndPointModel = require("../models/api_endpoints");
var multipartModel = require("../models/multipart_files");
var service = serviceModel.serviceModel;
var apiEndPointModel = apiEndPointModel.apiEndPointModel;
var multipart = multipartModel.multipartModel;
const { check, validationResult } = require("express-validator");
let multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "templates/files");
  },
  filename: function(req, file, callback) {
    console.log(req);
    callback(null, file.originalname);
  }
});
let upload = multer({ storage: storage });

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
    if (err) {
      console.log(err);
      res.status(404).send({ msg: "internal error" });
    } else {
      res.status(200).send({ msg: "api end point successfully created" });
    }
  });
});
router.post("/multipart/:type", upload.single("file"), function(req, res) {
  var uniqueName = req.body.uniqueName;
  var serviceName = req.body.serviceName;
  var apiName = req.body.apiEndoint;
  var fileKey = req.body.fileKey;
  var type = req.params.type;
  let multipartObj = {
    unique_name: uniqueName,
    service_name: serviceName,
    api_name: apiName,
    file_type: type,
    file_name: req.file.filename,
    file_key: fileKey
  };
  var multipartModel = new multipart(multipartObj);
  multipartModel.save(function(err) {
    if (err) {
      console.log(err);
      res.status(404).send({ msg: "internal error" });
    } else {
      res.status(200).send({ msg: "multipart object saved successsfully" });
    }
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
