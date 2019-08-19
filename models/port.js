var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var constant = require("../constants");
var connection = mongoose.createConnection(constant.dbConn, {
  useNewUrlParser: true
});
autoIncrement.initialize(connection);

var portSchema = new mongoose.Schema({
  unique_name: { type: String, required: true, unique: true },
  port_number: Number
});
portSchema.plugin(autoIncrement.plugin, {
  model: "port",
  field: "port_number",
  startAt: 3100,
  incrementBy: 1
});
var portModel = mongoose.model("port", portSchema);

module.exports = {
  portModel: portModel,
  portSchema: portSchema,
  findPortByUniqueName: function(uniqueName) {
    portModel.find({ unique_name: uniqueName });
  }
};
