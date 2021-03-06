var userController = function(User){

	var post = function(req,res){
		console.log(req.body);
		var user = new User(req.body);
	if(!req.body.nombre){
		res.status(400);
		res.send('El nombre es requerido');
	}else{	
		user.save(function(err, user){
			if(err) return res.status(400).send(err);
			console.log(user);
			res.status(201);
			res.send(user);
		});
		
		}
	}

	var get = function(req, res){
		var query = {};
		if(req.query.genre)
		{
			query.genre = req.query.genre;
		}
		User.find(query, function(err,users){
			if(err){
				res.status(500).send(err);
			}else{
				var returnUsers = [];
				users.forEach(function (element, index, array) {
					var newUser = element.toJSON();
					newUser.links = {};
					newUser.links.self = 'http://' + req.headers.host + '/api/users/' + newUser._id;
					returnUsers.push(newUser);
				});
				res.json(returnUsers);
			}
		});
	}
	
	return {
		post: post,
		get:get
	}
};

module.exports = userController;