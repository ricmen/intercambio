var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/users');
var user = require('./models/user');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var userRouter = require('./Routes/userRoutes')(user);


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});


app.use('/api/Users', userRouter);

app.get("/", function(req, res){
	res.send('Bienvenido a la api del intercambio')
});


app.listen(port, function(){
	console.log('Runing on port ' + port);
});