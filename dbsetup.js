"use strict";
var mongoose = require("mongoose");

db = mongoose.connect("mongodb://localhost/mocker");
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  teamName: String,
  nodeId: String,
  password: String,
  isActive: Boolean
});
db.model("mocker", TeamSchema);
db.once("connected", function(err) {
  if (err) {
    return console.error(err);
  }
});
