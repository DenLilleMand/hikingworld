var mailer = require("nodemailer");

module.exports = {
	sendMail : function (username, link) {
		var transporter = mailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'orighikingworld@gmail.com',
				pass: 'zK^#e8kXBAP8'
			}
		});

		console.log('created');

		transporter.sendMail({
			from: 'orighikingworld@gmail.com',
			to: username,
			subject: 'E-mail verification',
			text: link
		});

		console.log("Sent!");
	}
}