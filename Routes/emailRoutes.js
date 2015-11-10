var express = require('express');

var routes = function(){
	var userRouter = express.Router();
	
	userRouter.route('/').get(function(){
		
	});
	
	return userRouter;
}

module.exports = routes;