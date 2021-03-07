const express = require("express");
var app = express();
var path = require('path');

app.use(express.json());
app.use(express.static( __dirname + '/frontend'));

app.post('/createTable', (req,res)=>{
    const db = require("./modules/create_table");
    console.log("--------");
    console.log(req.body)
    console.log(req.body.name)
    console.log(req.body.primary_key)
    console.log(req.body.attributes)
    console.log(req.body.attributes_types)
    //console.log(req.body.subtypes)
    console.log(req.body.supertype)
    console.log(req.body.supertype_pk)
    console.log(req.body.cannot_exist_without)
    console.log(req.body.cant_fk)
    let obj = req.body
    let name = obj.name;
    let primary_key = obj.primary_key;
    let attributes = obj.attributes;
    let attribute_types = obj.attributes_types;
    // let subtypes = obj.subtypes;
    let supertype = obj.supertype;
    let supertype_pk = obj.supertype_pk
    let cannot_exist_without = obj.cannot_exist_without;
    let cannot_exist_without_fk = obj.cant_fk;
    db.createTable(name, primary_key, attributes, attribute_types, supertype, supertype_pk, cannot_exist_without, cannot_exist_without_fk);
    res.json({
        status: 'success'
    });
});

app.post('/alterTable', (req, res) => {
    const altDB = require("./modules/alter_table");
    console.log("logging req.body");
    console.log(req.body);
    let table_from = req.body.where_from;
    let table_to = req.body.where_to;
    let relo_type = req.body.relationship_type
    let att_from_type = req.body.type_from;
    let att_to_type = req.body.type_to;
    let att_from = req.body.from_attribute;
    let att_to = req.body.to_attribute;
    altDB.alterTable(table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to);
    res.json({
        status: "success"
    });
});

app.post('/createRow', (req, res) => {
    let data = {}
    let entity = "";
    for (const [key, value] of Object.entries(req.body)) {
        if (key == "name") {
            entity = value;
            continue
        }
        data[key] = value;
    }
    console.log(entity, data);

    const db = require("./modules/insert_table");
    db.createRow(entity, data);
    res.json({
        status: "success"
    });
});

app.listen(8080);