//importing modules
var express = require("express");
var auth = require("./controllers/authControllers");
var app = express();
app.use("/api/auth", auth);
app.listen(3000);
