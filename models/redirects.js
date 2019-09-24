var mongoose = require("mongoose");

var redirectSchema = new mongoose.Schema({
  uniqueName: { type: String, required: true, unique: true },
  serviceName: { type: String, required: true },
  apiEndpointName: { type: String, required: true },
  redirectUrl: { type: String, required: true, unique: true },
  authHeader: { type: Object },
  redirectEnabled: { type: Boolean },
  autoUpdateEnabled: { type: Boolean },
  isActive: { type: Boolean }
});

var redirectModel = mongoose.model("redirects", redirectSchema);

module.exports = {
  redirectSchema: redirectSchema,
  redirectModel: redirectModel,
  getAllActiveRedirects: function(uniqueName) {
    return redirectModel.find({ uniqueName: uniqueName });
  }
};
