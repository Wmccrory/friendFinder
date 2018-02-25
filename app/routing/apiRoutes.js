//dependencies
var path = require("path");
require("../data/friends.js")

//function directing website flow
module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		return res.json(users)
	});
};