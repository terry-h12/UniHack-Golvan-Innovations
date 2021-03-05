const express = require("express");
var app = express();
var path = require('path');

app.use(express.json({limit: '1mb'}));
app.use(express.static( __dirname + '/frontend'));

app.listen(8080);