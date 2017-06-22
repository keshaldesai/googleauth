const express = require("express");
const app = express();

const authController = require("./controllers/authController");
const passportController = require("./controllers/passportController");
const apiControlller = require("./controllers/apiController");
const setupControlller = require("./controllers/setupController");

const passport = require("passport");

const mongoConfig = require("./config/mongoConfig.json");
const mongoose = require("mongoose");

//connect to MongoDB
mongoose.connect(
  `mongodb://${mongoConfig.user}:${mongoConfig.pass}@ds135592.mlab.com:35592/pinit`
);

//use bodyparser, cors, passport
setupControlller(app);

//passport setup for OAuth 2.0 Google strategy
passportController(passport);

//authentication API handler
authController(app);

//general API handler
apiControlller(app);

app.listen(8000, console.log("Listening on port 8000"));
