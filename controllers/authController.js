const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = require("../config/jwtConfig.json").secret;
const User = require("../models/user");
const verifyUser = require("../helpers/verifyUser");
const errorHandler = require("../helpers/errorHandler");

module.exports = function(app) {
  //client app login through this route
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"]
    })
  );

  //google auth callbacks to this route
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:3000"
    }),
    (req, res) => {
      const token = jwt.sign({ token: req.user.token }, secret);
      return res.redirect("http://localhost:3000?token=" + token);
    }
  );

  //verifies client by token, returns user info to client app
  app.post("/api/auth/in", (req, res) => {
    const cb = user => {
      return res.json({
        userId: user.googleId,
        name: user.name
      });
    };
    return verifyUser(req.body.token, res, cb);
  });

  //handles server side logout (token removal from DB)
  app.post("/api/auth/out", (req, res) => {
    const cb = user => {
      user.token = "";
      return user.save((err, user) => {
        if (err) {
          return errorHandler(err, res, 400);
        }
        return res.end();
      });
    };
    return verifyUser(req.body.token, res, cb);
  });
};
