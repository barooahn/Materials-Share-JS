const domain = "sandboxc072fa21f87b4e7688c4d9a07bbbccf1.mailgun.org";
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
