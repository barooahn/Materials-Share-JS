const dotenv = require("dotenv").config();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require("../server/models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_KEY,
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
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ email: email });

        // If not, handle it
        if (!user) {
          console.log("passport local no user found");
          return done(null, false);
        }

        // Check if the password is correct
        console.log("passport local user found", user);
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          console.log("passport local password fail");
          return done(null, false);
        }

        console.log("passport local password accepted continue");
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
