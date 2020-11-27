const domain = "mail.materialsshare.com";
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_KEY,
  domain: domain,
});

module.exports = {
  sendEmail: (req, res) => {
    const data = req.body.body;
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
  },
};
