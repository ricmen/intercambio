var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	mailer = require('express-mailer');

var db = mongoose.connect('mongodb://localhost/users');
var user = require('./models/user');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


var userRouter = require('./Routes/userRoutes')(user);


app.all('/**', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  next();
});

mailer.extend(app, {
	from: 'intercambio.granados@gmail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'intercambio.granados@gmail.com',
    pass: 'donaBelem'
  }
});



app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.post('/registro', function (req, res, next) { 
  app.mailer.send('email', {
    to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
    subject: 'Bienvenid@ al intercambio', // REQUIRED. 
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
  }, function (err) {
    if (err) {
      // handle error 
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});



app.use('/api/Users', userRouter);

app.get("/", function(req, res){
	res.send('Bienvenido a la api del intercambio')
});


app.listen(port, function(){
	console.log('Runing on port ' + port);
});