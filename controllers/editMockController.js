var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var serviceModel = require("../models/service");
var apiEndPoint = require("../models/api_endpoints");
var soapEndPoint = require("../models/soap_endpoints");

router.post("/update-api", function(req, res, next) {});
router.post("/update-soap", function(req, res, next) {});
router.get("/get-rest-endpoints", function(req, res, next) {});
router.get("/get-soap-endpoints", function(req, res, next) {});

module.exports = router;
