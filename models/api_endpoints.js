var mongoose = require("mongoose");
var constant = require("../constants");

var apiEndPointSchema = new mongoose.Schema({
  apiEndpointName: { type: String, required: true, unique: true },
  serviceName: { type: String, required: true },
  uniqueName: { type: String, required: true },
  apiType: { type: String, required: true },
  requestHeaders: { type: Object },
  requestQueryParams: { type: Object },
  responseHeaders: { type: Object },
  requestBody: {
    contentType: String,
    body: String,
    logic: String,
    tokenMap: { type: Object },
    multipart: { type: Object }
  },
  responseBody: {
    contentType: String,
    body: String,
    logic: String,
    tokenMap: { type: Object },
    multipart: { type: Object }
  },
  isAutoUpdateEnabled:{type:Boolean}
});
var apiEndPointModel = mongoose.model("api_endpoint", apiEndPointSchema);

module.exports = {
  apiEndPointModel: apiEndPointModel,
  apiEndPointSchema: apiEndPointSchema,

  findApiEndPointByAttributes: function(
    uniqueName,
    serviceName,
    apiEndPointName
  ) {
    return apiEndPointModel.find({
      uniqueName: uniqueName,
      serviceName: serviceName,
      apiEndpointName: apiEndPointName
    });
  },
  findAllApiEndpointsByUniqueNameOnly: function(uniqueName) {
    console.log("finding apiendpoints by " + uniqueName);
    return apiEndPointModel.find({ uniqueName: uniqueName });
  },
  findAllApiEndpointsByUniqueName: function(uniqueName, serviceName) {
    console.log("finding apiendpoints by " + uniqueName);
    return apiEndPointModel.find({
      uniqueName: uniqueName,
      serviceName: serviceName
    });
  },
  getApiEndpoint: function(uniqueName, serviceName, apiEndpointName) {
    return apiEndPointModel.find({
      uniqueName: uniqueName,
      serviceName: serviceName,
      apiEndpointName: apiEndpointName
    });
  },
  getApiEndpointCounts: function(uniqueName) {
    return apiEndPointModel.countDocuments({ uniqueName: uniqueName });
  },
  getApiEndPointNames: function(uniqueName, serviceName) {
    return apiEndPointModel
      .find({ uniqueName: uniqueName, serviceName: serviceName })
      .select("apiEndpointName");
  },
  updateApiEndPoint: function(uniqueName, apiEndPoint) {
    return apiEndPointModel.update({ uniqueName: uniqueName }, apiEndPoint, {
      upsert: true
    });
  },
  deleteApiEndPoint: function(uniqueName, serviceName, apiEndpointName) {
    apiEndPointModel.deleteOne({
      uniqueName: uniqueName,
      serviceName: serviceName,
      apiEndpointName: apiEndpointName
    });
  },
  getAutoUpdateEndpoints:function(uniqueName){
    return apiEndPointModel.find({
      uniqueName: uniqueName, isAutoUpdateEnabled:true
    })
  },
  enableAutoUpdate:function(uniqueName,serviceName,apiEndpointName){
    return apiEndPointModel.update({
      uniqueName:uniqueName,
      serviceName:serviceName,
      apiEndpointName:apiEndpointName
    },{isAutoUpdateEnabled:true});
  }
};
