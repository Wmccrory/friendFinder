//friendfinder server.js//

//dependencies//
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//express npm setup//
var app = express();
var PORT = process.env.PORT || 3000;

//setting up pathways that website will rely on
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

//starting app//
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});