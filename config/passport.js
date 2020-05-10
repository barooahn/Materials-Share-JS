const dotenv = require("dotenv").config();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require("../server/models/User");
// const GooglePlusTokenStrategy = require("passport-google-plus-token");

// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const FacebookTokenStrategy = require("passport-facebook-token");

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_KEY
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      console.log("user from auth", user);
      return user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(err, false);
    }
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

