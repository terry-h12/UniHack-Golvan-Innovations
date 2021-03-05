const express = require("express");
var app = express();
var path = require('path');

app.use(express.json({limit: '1mb'}));
app.use(express.static( __dirname + '/frontend'));

app.post('/createTable', (req,res)=>{
    const db = require("./modules/create_table");
    console.log(req.body);
    let name = req.body.name;
    let primary_key = req.body.pk;
    let attributes = req.body.att;
    let subtypes = req.body.subtypes;
    let cannot_exist_without = req.body.cant;
    db.createTable(name, primary_key, attributes, subtypes, cannot_exist_without);
    res.json({
        status: 'success'
    });
});

app.listen(8080);