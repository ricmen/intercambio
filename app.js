var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get("/", function(req, res){
	res.send('Bienvenido a la api del intercambio')
});



app.listen(port, function(){
	console.log('Runing on port' + port);
});