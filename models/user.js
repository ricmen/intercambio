var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var userModel = new Schema({
		nombre: {type: String},
		apellidoPaterno: {type: String},
		apellidoMaterno: {type: String},
		fechaNacimiento: {type: String},
		nombreUsuario: {type: String, required: true, index : {unique: true}},
		password: {type: String, required: true},
		email: {type: String},
		sugerencias : {type : Array}

	});

module.exports = mongoose.model('user',userModel);