var express = require("express");
var url = require("url");
var http = require("http");
var port = 3000;
var app = express();
app.use(express.static("contents"));
var todos = [];
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get("/get", function(req, res) {
	res.json(todos);
});

app.post("/read", function(req, res) {
	todos = req.body;
	console.log(todos);
	res.json({success : true});
});

http.createServer(app).listen(port);
