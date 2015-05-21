var express = require('express');

var routes = function(User) {
	var userRouter = express.Router();
	
	var UserController = require('../Controllers/UserController')(User);

	userRouter.route('/')
	.post(UserController.post)
	.get(UserController.get);
	userRouter.use("/:UserId", function(req,res,next){
		User.findById(req.params.UserId, function(err,User){				
			if(err){
				res.status(500).send(err);
			}else if(User)
			{			
				req.User = User;
				next();
			}else{
				res.status(404).send('no User found');
			}
		});
	});
	userRouter.route('/:UserId')
	.get(function(req, res){
		var returnUser = req.User.toJSON();
		returnUser.links = {};
		returnUser.links.FilterByThisGenre = 'http://' + req.headers.host + '/api/Users/?genre=' + returnUser.genre;
			res.json(returnUser);
		
	})
	.put(function(req,res){		
		req.User.nombre = req.body.nombre;
		req.User.apellidoPaterno = req.body.apellidoPaterno;
		req.User.apellidoMaterno = req.body.apellidoMaterno;
		req.User.email = req.body.email;
		req.User.sugerencias = req.body.sugerencias;
		req.User.save(function(err){
			if(err){
				res.status(500).send(err);
			}else
			{
				res.json(req.User);
			}
		});			
	})
	.patch(function(req,res){
		if(req.body._id){
			delete req.body._id;
		}

		for(var p in req.body)
		{
			req.User[p] = req.body[p];
		}

		req.User.save(function(err){
			if(err){
				res.status(500).send(err);
			}else
			{
				res.json(req.User);
			}
		});
	})
	.delete(function(req,res){
		req.User.remove(function(err){
			if(err){
				res.status(500).send(err);
			}else{
				res.status(204).send('User removed');
			}
		});
	});



	return userRouter;
};

module.exports = routes;