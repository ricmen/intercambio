var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcryptjs'),
	SALT_WORK_FACTOR = 10;

var userModel = new Schema({
		nombre: {type: String, required:true},		
		password: {type: String, required: true},
		email: {type: String, required:true},
		sugerencias : {type : Array}

	});

userModel.pre('save', function(next){
	var user = this;

	//only hash the password if it has been modified (or if is new)
	if(!user.isModified('password')) return next();

	//generate a Salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);

			// override the leartext password with the hashed one
			user.password = hash;
			next();
		});

	});
});

// Codigo para comparar passwords.
userModel.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('user',userModel);