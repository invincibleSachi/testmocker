//importing modules
var express = require("express");
const bodyParser = require("body-parser");
var auth = require("./controllers/authControllers");
const mongoose = require("mongoose");
var constants = require("./constants");
var cors = require("cors");
mongoose.connect(constants.dbConn, {
  socketTimeoutMS: 0,
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: 30,
  useFindAndModify: false,
  useCreateIndex: true
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", auth);
app.listen(3000);
