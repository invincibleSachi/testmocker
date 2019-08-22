var mongoose = require("mongoose");
var constant = require("../constants");

var apiEndPointSchema = new mongoose.Schema({
  api_endpoint_name: { type: String, required: true },
  service_name: { type: String, required: true },
  unique_name: { type: String, required: true },
  api_type: { type: String, required: true },
  headers: { type: Map },
  queryParam: { type: Map },
  requestBody: {
    contentType: String,
    body: String,
    multipart: { type: Map }
  },
  responseBody: {
    contentType: String,
    body: String,
    multipart: { type: Map }
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
      unique_name: uniqueName,
      service_name: serviceName,
      api_endpoint_name: apiEndPointName
    });
  }
};
