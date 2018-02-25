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