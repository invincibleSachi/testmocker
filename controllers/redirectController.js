var express = require("express");
var router = express.Router();
var serviceModel = require("../models/service");
var apiEndPointModel = require("../models/api_endpoints");
var soapEndPointModel = require("../models/soap_endpoints");
var apiEndPointModel = apiEndPointModel.apiEndPointModel;
var soapEndPointModel = soapEndPointModel.soapEndPointModel;