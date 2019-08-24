var mongoose = require("mongoose");
var constant = require("../constants");

var apiEndPointSchema = new mongoose.Schema({
  apiEndpointName: { type: String, required: true },
  serviceName: { type: String, required: true },
  uniqueName: { type: String, required: true },
  apiType: { type: String, required: true },
  requestHeaders: { type: Map, of: String },
  requestQueryParams: { type: Map, of: String },
  responseHeaders: { type: Map, of: String },
  responseQueryParams: { type: Map, of: String },
  requestBody: {
    contentType: String,
    body: String,
    multipart: { type: Map, of: String },
    requestTokens: { type: Map }
  },
  responseBody: {
    contentType: String,
    body: String,
    multipart: { type: Map, of: String },
    responseTokens: { type: Map }
  }
});

var apiEndPointModel = mongoose.model("api_endpoint", apiEndPointSchema);

module.exports = {
  apiEndPointModel: apiEndPointModel,
  apiEndPointSchema: apiEndPointSchema,

  findApiEndPointByUniqueName: function(
    uniqueName,
    serviceName,
    apiEndPointName
  ) {
    portModel.find({
      uniqueName: uniqueName,
      serviceName: serviceName,
      apiEndpointName: apiEndPointName
    });
  }
};
