var express = require('express');
var app = express();
var PORT = 8080;
app.use(express.static(__dirname + '/public'));
app.listen(PORT, function(){
	console.log('Listening to port ' +PORT);
});

// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); 
});