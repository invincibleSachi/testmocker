var mongoose = require("mongoose");
var constant = require("../constants");

var apiEndPointSchema = new mongoose.Schema({
  apiEndpointName: { type: String, required: true },
  serviceName: { type: String, required: true },
  uniqueName: { type: String, required: true },
  apiType: { type: String, required: true },
  requestHeaders: { type: Object },
  requestQueryParams: { type: Object },
  responseHeaders: { type: Object },
  responseQueryParams: { type: Object },
  requestBody: {
    contentType: String,
    body: String,
    multipart: { type: Object },
    tokenMap: { type: Object }
  },
  responseBody: {
    contentType: String,
    body: String,
    multipart: { type: Object },
    tokenMap: { type: Object }
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
