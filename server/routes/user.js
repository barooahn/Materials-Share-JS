const usercontroller = require("./../controllers/user.ctrl");
const passportConf = require("../../config/passport");
const passport = require("passport");

module.exports = router => {

  /**
   * get a user
   */
  router.route("/user/:id").get(usercontroller.getUser);

  /**
   * get a user profile
   */
  router
    .route("/user/profile/:id")
    .get(
      passport.authenticate("jwt", { session: false }),
      usercontroller.getUserProfile
    );

  /**
   * adds a user
   */
  router.route("/users/register").post(usercontroller.registerUser);

  router.post(
    "/users/login",
    passport.authenticate("local", { session: false }),
    usercontroller.login
  );

  router.get("/logout", function(req, res) {
    req.logout();
    res.status(200).json({
      message: "Logout successful"
    });
  });

  //old google login
  // router
  //   .route("/users/oauth/google")
  //   .post(
  //     passport.authenticate("googleToken", { session: false }),
  //     usercontroller.googleOAuth
  //   );

  router
    .route("/users/oauth/facebook")
    .post(
      passport.authenticate("facebookToken", { session: false }),
      usercontroller.facebookOAuth
    );

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve redirecting
  //   the user to google.com.  After authorization, Google will redirect the user
  //   back to this application at /auth/google/callback
  router
    .route('/users/oauth/google')
  .post(
    passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"] }));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  router
    .route('/auth/google/callback')
    .post( 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('in user.js google')
    res.redirect('/');
  });

  /**
   * follow a user
   */
  router.route("/user/follow").post(usercontroller.followUser);

  router.get(
    "/users/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send("i'm protected");
    }
  );

  router.get(
    "/users/isAuth",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.status(200).json({
        message: "User authenticated"
      });
    }
  );
};
