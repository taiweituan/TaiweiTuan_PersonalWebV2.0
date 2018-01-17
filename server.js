var express = require('express');
var helper = require('sendgrid').mail;
var bodyParser = require("body-parser");
var local_env_key = require('./local_env_var.js') || '';
var app = express();
var PORT = process.env.PORT || 8888;

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
app.get('*', (req, res) => {
	res.sendfile('./public/index.html');
});

// SendGrid configuration 
app.post('/sendEmail', (req, res) => {
	var sg = require('sendgrid')(process.env.SENDGRID_API_KEY || local_env_key.sendGrid_API_key);
	var from_email = new helper.Email('ttuan@no-reply.com');
	var to_email = new helper.Email('taiweituan@gmail.com');
	var subject = req.body.title;
	var content = new helper.Content('text/plain', req.body.message);
	var mail = new helper.Mail(from_email, subject, to_email, content);
	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});

	// Send mail
	sg.API(request)
		.then(response => {
			console.log(response.statusCode);
			console.log(response.body);
			console.log(response.headers);

			return res.status(response.statusCode).send();
		})
		.catch(error => {
			//The full response is attached to error.response
			console.log(error.response.statusCode);
	});
});
