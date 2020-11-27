const emailController = require("./../controllers/email.ctrl");

module.exports = (router) => {
  /**
   * send mail
   */
  router.route("/email/sendEmail/").post(emailController.sendEmail);
};
