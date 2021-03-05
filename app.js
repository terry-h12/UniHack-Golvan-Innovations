const express = require("express");
var app = express();
var path = require('path');

app.use(express.json());
app.use(express.static( __dirname + '/frontend'));

app.post('/createTable', (req,res)=>{
    const db = require("./modules/create_table");
    console.log("--------");
    console.log(req.params)
    console.log(req.body.name)
    console.log(req.body.primary_key)
    console.log(req.body.attributes)
    console.log(req.body.attribute_types)
    console.log(req.body.subtypes)
    console.log(req.body.supertype)
    console.log(req.body.cannot_exist_without)
    console.log(req.body.cant_fk)
    let obj = req.body
    let name = obj.name;
    let primary_key = obj.primary_key;
    let attributes = obj.attributes;
    let attribute_types = obj.attribute_types;
    let subtypes = obj.subtypes;
    let supertype = obj.supertype;
    let cannot_exist_without = obj.cannot_exist_without;
    let cannot_exist_without_fk = obj.cant_fk;
    db.createTable(name, primary_key, attributes, attribute_types, subtypes, supertype, cannot_exist_without, cannot_exist_without_fk);
    res.json({
        status: 'success'
    });
});

app.listen(8080);