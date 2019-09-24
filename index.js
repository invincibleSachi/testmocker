//importing modules
var express = require("express");
const bodyParser = require("body-parser");
var authController = require("./controllers/authControllers");
var mockController = require("./controllers/mockServiceController");
var editmockController = require("./controllers/editMockController");
var redirectController = require("./controllers/redirectController");
const mongoose = require("mongoose");
var constants = require("./constants");
const multer = require("multer");
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
app.use("/api/auth", authController);
app.use("/api/mock", mockController);
app.use("/api/edit", editmockController);
app.use("/api/redirect", redirectController);
app.listen(3000);
