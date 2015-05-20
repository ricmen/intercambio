var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userModel = new Schema({
		nombre: {type: String},
		apellidoPaterno: {type: String},
		apellidoMaterno: {type: String},
		fechaNacimiento: {type: String},
		email: {type: String},
		sugerencias : {type : Array}

	});

module.exports = mongoose.model('user',userModel);