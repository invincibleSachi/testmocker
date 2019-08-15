var mongoose = require("mongoose");
var tokenSchema = new mongoose.Schema({
  user_name: String,
  token: String,
  is_active: Boolean,
  generated_timestamp: { type: Date, default: Date.now },
  token_expiry: { type: Date }
});
var tokenSchema = mongoose.model("userToken", tokenSchema);
module.exports = {
  tokenSchema: tokenSchema,
  findAllActiveTokenByUserName: function(user_name) {
    return tokenSchema.find({
      user_name: user_name,
      is_active: true,
      generated_timestamp: { $lte: new Date() },
      token_expiry: { $gte: new Date() }
    });
  },
  findbyActiveToken: function(user_name, token) {
    return tokenSchema.find({
      user_name: user_name,
      token_name: token,
      is_active: true,
      generated_timestamp: { $lte: new Date() },
      token_expiry: { $gte: new Date() }
    });
  },
  updateTokenStatus: function(token, newStatus) {
    let query = { token: token };
    let update = { is_active: newStatus };
    tokenSchema.findOneAndUpdate(query, newStatus);
  }
};
