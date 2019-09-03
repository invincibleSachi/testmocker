var mongoose = require("mongoose");

var multiPartFileSchema = new mongoose.Schema({
  unique_name: { type: String, required: true },
  service_name: { type: String, required: true },
  api_name: { type: String, required: true,unique:true },
  file_type: { type: String, required: true },
  file_key: { type: String },
  file_name: { type: String, required: true }
});
//servicesSchema.index({ unique_name: 1, service_name: 2 }, { unique: true });
var multipartModel = mongoose.model("multiparts", multiPartFileSchema);

module.exports = {
  multipartSchema: multiPartFileSchema,
  multipartModel: multipartModel,
  findMultipartByUniqueName: function(uniqueName) {
    return multipartModel.find({ unique_name: uniqueName });
  },

  findMultipartByUniqueNameServiceNameApiName: function(
    unique_name,
    service_name,
    api_name
  ) {
    return multipartModel.find({
      unique_name: uniqueName,
      service_name: service_name,
      api_name: api_name
    });
  }
};
