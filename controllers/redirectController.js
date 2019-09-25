var express = require("express");
var router = express.Router();
var apiEndPoint = require("../models/api_endpoints");
var redirects = require("../models/redirects");
var apiEndPointModel = apiEndPoint.apiEndPointModel;
var redirectModel = redirects.redirectModel;
var redirectSchema = redirects.redirectSchema;

router.post("/add", function(req, res) {
  var redirectRec = new redirectModel(req.body);
  //if record present then upsert else insert
  let uniqueName=req.body.uniqueName;
  let serviceName=req.body.serviceName;
  let apiEndpointName=req.body.apiEndpointName;
  console.log(req.body);
  redirects.getRedirect(uniqueName,serviceName,apiEndpointName).exec(function(err,redirect){
    if(err || redirect.length==0){
      console.log('no records found');
      if(err){
        console.log(err);
      }
      redirectRec.save(function(err) {
        if (err) {
          console.log('error occurred in insert');
          res.status(404).send({ msg: "internal error" });
        } else {
          res.status(200).send({ msg: "redirect Saved successsfully" });
        }
      });
    }else{
      console.log('redirect found!!')
      console.log(redirect);
      var redirectRecUpdt = new redirectModel(req.body);
      redirects.updateRedirect(uniqueName,serviceName,apiEndpointName,redirectRecUpdt).exec(function(err,result){
        if (err) {
          console.log('error occurred in upsert');
          res.status(404).send({ msg: "internal error" });
        } else {
          res.status(200).send({ msg: "redirect updated successsfully" });
        }
      });
    }
    
  })
  
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

module.exports = router;
