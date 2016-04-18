var mailer = require('nodemailer'),
	mail = require('../config/mailconfig');

module.exports = {
	sendMail : function (username, link) {
		var transporter = mailer.createTransport({
			service: 'Gmail',
			auth: {
				user: mail.username,
				pass: mail.password
			}
		});

		console.log('created');

		transporter.sendMail({
			from: mail.username,
			to: username,
			subject: 'E-mail verification',
			text: link
		});

		console.log("Sent!");
	},
	getAddress : function() {
		return mail.address;
	}
}