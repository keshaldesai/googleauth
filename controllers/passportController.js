const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const authConfig = require("../config/authConfig.json");
const User = require("../models/user");

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      authConfig,
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          token: accessToken,
          name: profile.name.givenName
        };
        User.findOneAndUpdate(
          { googleId: profile.id },
          newUser,
          { upsert: true, new: true },
          (err, user) => {
            return done(err, user);
          }
        );
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.googleId);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ googleId: id }, (err, user) => {
      done(err, user);
    });
  });
};
