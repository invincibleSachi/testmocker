var mongoose = require("mongoose");

var servicesSchema = new mongoose.Schema({
  unique_name: { type: String, required: true, unique: true },
  serviceName: String
});

var serviceModel = mongoose.model("service", servicesSchema);

module.exports = {
  serviceSchema: servicesSchema,
  serviceModel: serviceModel,
  findServiceByUniqueName: function(uniqueName) {
    serviceModel.find({ unique_name: uniqueName });
  }
};
