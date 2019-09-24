var mongoose = require("mongoose");

var redirectSchema = new mongoose.Schema({
  uniqueName: { type: String, required: true, unique: true },
  serviceName: {type:String,required:true},
  apiEndpointName:{type:String,required:true},
  redirectUrl: { type: String, required: true, unique: true  },
  requestQueryParams: { type: Object },
  requestHeaders: { type: Object },
  isActive:{type:Boolean}
});

var redirectModel = mongoose.model("autoUpdates", autoUpdateSchema);

module.exports = {
  redirectSchema: redirectSchema,
  redirectModel: redirectModel,
  getAllActiveRedirects:function(uniqueName){
    return redirectModel.find({uniqueName:uniqueName});
  }
}