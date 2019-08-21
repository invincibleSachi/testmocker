var mongoose = require("mongoose");

var servicesSchema = new mongoose.Schema({
  unique_name: { type: String, required: true },
  service_name: { type: String, required: true, unique: true }
});
//servicesSchema.index({ unique_name: 1, service_name: 2 }, { unique: true });
var serviceModel = mongoose.model("service", servicesSchema);

module.exports = {
  serviceSchema: servicesSchema,
  serviceModel: serviceModel,
  findServiceByUniqueName: function(uniqueName) {
    serviceModel.find({ unique_name: uniqueName });
  }
};
