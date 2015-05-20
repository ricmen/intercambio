var express = require('express');

var routes = function(user){
	var userRouter = express.Router();

	userRouter.route('/')
	.get(function(req, res){
		var query = req.query;
		if(req.query.genre){
			query.genre = req.query.genre;
		}
		user.find(query,function(err, users){
			if(err){
				console.log(err);
			}else{
				res.json(users);
			}
		});
		
	})
	.post(function(req, res){
		var newUser = new user(req.body);
		newUser.save();
		res.status(201).send(newUser);
	});

	userRouter.route('/:userId')
		.get(function(req, res){
			user.findById(req.params.userId,function(err, user){
			if(err){
				console.log(err);
			}else{
				res.json(user);
			}
		});
	});
		return userRouter;
};


module.exports = routes;