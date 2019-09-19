var mongoose = require("mongoose");
var constant = require("../constants");

var soapEndPointSchema = new mongoose.Schema({
  uniqueName: { type: String, required: true },
  serviceName:{ type: String, required: true },
  soapEndPointName: { type: String, required: true, unique: true },
  requestBody: { type: String, required: true },
  responseBody: { type: String, required: true },
  soapwsdl: { type: String, required: true },
  requestHeaders: { type: Object },
  responseHeaders: { type: Object },
  requestTokens: { type: Object },
  responseTokens: { type: Object }
});
var soapEndpointModel = mongoose.model("soap_endpoints", soapEndPointSchema);

module.exports = {
  soapEndPointModel: soapEndpointModel,
  soapEndPointSchema: soapEndPointSchema,
  getSoapEndpointCounts: function(uniqueName) {
    return soapEndpointModel.countDocuments({ uniqueName: uniqueName });
  },
  findAllSoapEndpointsByUniqueName: function(uniqueName,serviceName) {
    return soapEndpointModel.find({ uniqueName: uniqueName,serviceName:serviceName });
  },
  getSoapEndPointNames: function(uniqueName,serviceName) {
    return soapEndpointModel
      .find({ uniqueName: uniqueName,serviceName:serviceName })
      .select("soapServiceName");
  },
  updateSoapEndpoint: function(uniqueName, endpoint) {
    return soapEndpointModel.update({ uniqueName: uniqueName }, endpoint, {
      upsert: true
    });
  },
  getSoapEndpoint:function(uniqueName,serviceName,soapEndPointName){
    return apiEndPointModel.find({ uniqueName: uniqueName,serviceName:serviceName,soapEndPointName:soapEndPointName });
  },
};
