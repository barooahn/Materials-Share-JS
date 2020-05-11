const usercontroller = require("./../controllers/user.ctrl");
const passportConf = require("../../config/passport");
const passport = require("passport");

module.exports = (router) => {
  /**
   * get a user
   */
  router.route("/user/:id").get(usercontroller.getUser);
  /**
   * get a Avatar
   */
  router.route("/avatar/:id").get(usercontroller.getAvatar);
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

  router.route("/users/forgotPassword").post(usercontroller.forgotPassword);
  router.route("/users/reset").get(usercontroller.resetPassword);
  router
    .route("/users/updatePasswordViaEmail")
    .put(usercontroller.updatePasswordViaEmail);

  router.get("/logout", function (req, res) {
    req.logout();
    res.status(200).json({
      message: "Logout successful",
    });
  });

  router.route("/users/signUser").post(usercontroller.signUser);

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
        message: "User authenticated",
      });
    }
  );
};
