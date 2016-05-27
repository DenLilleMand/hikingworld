var mailer = require('nodemailer'),
	config = require('../config/configuration/configuration.json');

module.exports = {
	sendMail: function(username, link, subjectMsg) {
		var transporter = mailer.createTransport({
			service: 'Gmail',
			auth: {
				user: config.mail.username,
				pass: config.mail.password
			}
		});

		console.log('created');

		transporter.sendMail({
			from: config.mail.username,
			to: username,
			subject: subjectMsg,
			text: link
		});

		console.log("Sent!");
	},
	getAddress: function() {
		return config.mail.address;
	}
}