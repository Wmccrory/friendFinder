//friendfinder server.js//

//dependencies//
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//express npm setup//
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

//html routing
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/home.html"));

});

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));

});


//starting app//
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

	// app.use(express.static(__dirname, "app/css/style.css"))