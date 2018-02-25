//dependencies
var path = require("path");
require("../data/friends.js")

//function directing website flow
module.exports = function(app) {
	//get json array of all users
	app.get("/api/friends", function(req, res) {
		return res.json(users)
	});

	//post a new user into user array
	app.post("/api/friends", function(req, res) {
		var newUser = req.body;
		console.log(newUser);
		users.push(newUser);
		res.json(newUser);
	})
};