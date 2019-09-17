var mongoose = require("mongoose");

var instanceSchema = new mongoose.Schema({
  unique_name: { type: String, required: true },
  port_number: { type: String, required: true },
  pid_number: { type: String, required: true },
  status: { type: Boolean, required: true }
});
//servicesSchema.index({ unique_name: 1, service_name: 2 }, { unique: true });
var instancesModel = mongoose.model("running_instances", instanceSchema);

module.exports = {
  instanceSchema: instanceSchema,
  instanceModel: instancesModel,
  findInstanceByUniqueName: function(uniqueName) {
    return instancesModel.find({ unique_name: uniqueName });
  },
  findPidByUniqueName: function(uniqueName) {
    return instancesModel
      .find({ unique_name: uniqueName })
      .select('pid_number');
  },

  findActiveInstancesByUniqueName: function(uniqueName) {
    return instancesModel.find({ unique_name: uniqueName, status: true });
  },
  deleteRunningInstanceEntries: function(pid_number) {
    return instancesModel.find({ pid_number: pid_number }).remove();
  },
  deleteAllInstanceByUniqueName: function(uniqueName) {
    return instancesModel.find({ unique_name: uniqueName }).remove();
  }
};
