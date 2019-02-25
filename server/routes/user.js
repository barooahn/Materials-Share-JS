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

  router
    .route("/users/oauth/google")
    .post(
      passport.authenticate("googleToken", { session: false }),
      usercontroller.googleOAuth
    );

  router
    .route("/users/oauth/facebook")
    .post(
      passport.authenticate("facebookToken", { session: false }),
      usercontroller.facebookOAuth
    );

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
