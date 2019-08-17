var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
var tokensch = new mongoose.Schema({
  team_name: String,
  token: String,
  is_active: Boolean,
  generated_timestamp: { type: Date, default: Date.now },
  token_expiry: { type: Date }
});
var tokenSchema = mongoose.model("token", tokensch);
module.exports = {
  tokenSchema: tokenSchema,
  findAllActiveTokenByUserName: function(team_name) {
    return tokenSchema.find({
      team_name: team_name,
      is_active: true,
      generated_timestamp: { $lte: new Date() },
      token_expiry: { $gte: new Date() }
    });
  },
  findbyActiveToken: function(team_name, token) {
    return tokenSchema.find({
      team_name: team_name,
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
