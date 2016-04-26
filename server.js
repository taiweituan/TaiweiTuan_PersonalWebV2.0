var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8080;
var gmailUsername = process.env.GMAIL_USERNAME || 'test';
var gmailPassword = process.env.GMAIL_PASSWORD || 'test@';

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.listen(PORT, function() {
	console.log('Listening to port ' + PORT);
});

// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

app.post('/sendEmail', function(req, res) {
	console.log(req.body);
	var mailOptions = {
		from: '"Node Reply 👥" <foo@blurdybloop.com>', // sender address
		to: 'super496@hotmail.com', // list of receivers
		subject: req.body.title, // Subject line
		text: req.body.message // plaintext body
		// html: '<b>Hello world 🐴</b>' // html body
	};
	
	// need to encrypt it somehow, pls send halp
	var transporter = nodemailer.createTransport(
		'smtps://'+gmailUsername+'%40gmail.com:'+gmailPassword+'@smtp.gmail.com'
	);
	
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});

	// return sent message 
	res.json(mailOptions); // return success 
});