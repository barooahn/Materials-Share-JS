const dotenv = require("dotenv").config();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require("../server/models/User");
// const GooglePlusTokenStrategy = require("passport-google-plus-token");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");

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

// // Google OAuth Strategy - old now
// passport.use(
//   "googleToken",
//   new GooglePlusTokenStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Should have full user profile over here
//         // console.log("profile", profile);
//         console.log("accessToken", accessToken);
//         // console.log("refreshToken", refreshToken);

//         const existingUser = await User.findOne({ "google.id": profile.id });
//         if (existingUser) {
//           console.log("exisiting user", existingUser);
//           return done(null, existingUser);
//         }
//         console.log("new user");
//         const newUser = new User({
//           method: "google",
//           google: {
//             id: profile.id,
//             email: profile.emails[0].value
//           }
//         });

//         await newUser.save();
//         done(null, newUser);
//       } catch (error) {
//         done(error, false, error.message);
//       }
//     }
//   )
// );

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    // callbackURL: "https://materials-share.herokuapp.com/auth/google/callback"
    async function(accessToken, refreshToken, profile, done) {
      try {
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }

      // console.log("here in passport - google auth");
      // User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
    }
  )
);

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("profile", profile);
        console.log("accessToken", accessToken);
        // console.log("refreshToken", refreshToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
