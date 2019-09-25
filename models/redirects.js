var mongoose = require("mongoose");

var redirectSchema = new mongoose.Schema({
  uniqueName: { type: String },
  serviceName: { type: String},
  apiEndpointName: { type: String},
  redirectUrl: { type: String},
  authHeader: { type: Object },
  redirectEnabled: { type: Boolean },
  autoUpdateEnabled: { type: Boolean },
  isActive: { type: Boolean }
});

redirectSchema.index({ unique_name: 1, service_name: 2,apiEndpointName:3 }, { unique: true });
var redirectModel = mongoose.model("redirects", redirectSchema);

module.exports = {
  redirectSchema: redirectSchema,
  redirectModel: redirectModel,
  getAllActiveRedirects: function(uniqueName) {
    return redirectModel.find({ uniqueName: uniqueName });
  },
  getRedirect: function(uniqueName,serviceName,apiEndpointName) {
    return redirectModel.find({ uniqueName: uniqueName,serviceName:serviceName,apiEndpointName: apiEndpointName});
  },
  updateRedirect:function(uniqueName,serviceName,apiEndpointName,redirect){
    return redirectModel.updateOne({ uniqueName: uniqueName,serviceName:serviceName,apiEndpointName: apiEndpointName},redirect);
  }
};
