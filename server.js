var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8081;
var emailUsername = process.env.EMAIL_USERNAME || 'test';
var emailPassword = process.env.EMAIL_PASSWORD || 'tester';

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.listen(PORT, function () {
	console.log('Listening to port ' + PORT);
});

// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function (req, res) {
	res.sendfile('./public/index.html');
});


app.post('/sendEmail', function (req, res) {
	console.log(req.body);

	// need to encrypt it somehow, pls send halp
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // use SSL
		auth: {
			user: emailUsername+'@gmail.com',
			pass: emailPassword
		}
	});

	var mailOptions = {
		from: '"NodeMailer" <nodemailer@no-reply.com>', // sender address
		to: 'super496@hotmail.com, taiweituan@gmail.com', // list of receivers
		subject: req.body.title, // Subject line
		text: req.body.message // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log("There was an error");
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});

	// Shut down the connection pool, no more messages. Comment this line out to continue sending emails.
	transporter.close();

	// return sent message 
	res.json(mailOptions); // return success 
});
