var userController = function(User){

	var post = function(req,res){
		var User = new User(req.body);
	if(!req.body.title){
		res.status(400);
		res.send('El nombre es requerido');
	}else{

		User.save();
		res.status(201);
		res.send(User);
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