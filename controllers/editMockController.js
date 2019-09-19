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
  let uniqueName = req.query.uniqueName;
  let serviceName = req.query.serviceName;
  apiEndPoint
    .findAllApiEndpointsByUniqueName(uniqueName,serviceName)
    .exec(function(err, apiEndpoints) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(apiEndpoints);
      }
    });
});
router.get("/get-rest-endpoint", function(req, res, next) {
    let uniqueName = req.query.uniqueName;
    let serviceName = req.query.serviceName;
    let restEndpointName = req.query.restEndpointName;
    apiEndPoint
      .getApiEndpoint(uniqueName,serviceName,restEndpointName)
      .exec(function(err, apiEndpoints) {
        if (err) {
          res.status(400).send({ msg: "no endpoints found" });
        } else {
          res.status(200).send(apiEndpoints[0]);
        }
      });
  });
router.get("/get-rest-endpoints-name", function(req, res, next) {
  let uniqueName = req.query.uniqueName;
  let serviceName = req.query.serviceName;
  console.log('finding endpoints for '+uniqueName);
  apiEndPoint
    .getApiEndPointNames(uniqueName,serviceName)
    .exec(function(err, apiEndpointNames) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(apiEndpointNames);
      }
    });
});
router.get("/get-soap-endpoints", function(req, res, next) {
  let uniqueName = req.query.uniqueName;
  let serviceName = req.query.serviceName;
  soapEndPoint
    .findAllSoapEndpointsByUniqueName(uniqueName,serviceName)
    .exec(function(err, soapEndpoints) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(soapEndpoints);
      }
    });
});
router.delete('/delete-rest-endpoint',function(req,res,next){
    let uniqueName = req.query.uniqueName;
    let serviceName = req.query.serviceName;
    let restEndpointName = req.query.restEndpointName;
    apiEndPoint.deleteApiEndPoint(uniqueName,serviceName,restEndpointName).exec(function(err,data){
        if(err){
            res.status(404).send({msg:'ApiEndpoint not deleted check server logs'})
        }else{
            res.status(200).send({msg:'ApiEndpoint '+restEndpointName + ' has been deleted successfully!!'})
        }
    });
    
});
router.delete('/delete-soap-endpoint',function(req,res,next){
    let uniqueName = req.query.uniqueName;
    let serviceName = req.query.serviceName;
    let soapEndpointName = req.query.soapEndpointName;
    soapEndPoint.deleteApiEndPoint(uniqueName,serviceName,soapEndpointName).exec(function(err,data){
        if(err){
            res.status(404).send({msg:'soap service not deleted check server logs'})
        }else{
            res.status(200).send({msg:'soap service '+soapEndpointName + ' has been deleted successfully!!'})
        }
    })
});
router.get("/get-soap-endpoint", function(req, res, next) {
    let uniqueName = req.query.uniqueName;
    let serviceName = req.query.serviceName;
    let soapEndpointName = req.query.soapEndpointName;
    soapEndPoint
      .getSoapEndpoint(uniqueName,serviceName,soapEndpointName)
      .exec(function(err, soapEndpoints) {
        if (err) {
          res.status(400).send({ msg: "no endpoints found" });
        } else {
          res.status(200).send(soapEndpoints[0]);
        }
      });
  });
router.get("/get-soap-endpoints-name", function(req, res, next) {
  let uniqueName = req.query.uniqueName;
  let serviceName = req.query.serviceName;
  soapEndPoint
    .getSoapEndPointNames(uniqueName,serviceName)
    .exec(function(err, soapEndpointNames) {
      if (err) {
        res.status(400).send({ msg: "no endpoints found" });
      } else {
        res.status(200).send(soapEndpointNames);
      }
    });
});

module.exports = router;
