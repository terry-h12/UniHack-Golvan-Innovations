const mysql = require("mysql");
const con = require("./connection");
const db = require("./connection");

function my_create_table(table_name, pk, attributes, datatypes, supertype, supertype_pk, 
    cannot_exist_without, cannot_exist_without_pk) {
    let res = ""
    let my_datatype = ""
    res = res + "Create table ";
    res = res + table_name + " ( ";
    
    let split_attribute = attributes.split(", ");
    let attribute_list_length = split_attribute.length;
    
    console.log(datatypes)
    let split_datatypes = datatypes.split(", ");
    let split_datatypes_list_length = split_datatypes.length;

    split_attribute.forEach(function(item, index) {
        // var tmp_parseint = parseInt(item);
        // if (Number.isInteger(tmp_parseint)) {
        //     my_datatype = "integer";
        // } else {
        //     my_datatype = "text";
        // }
        my_datatype = split_datatypes[index];

        if (index == (attribute_list_length - 1)) {
            res = res + item + " " + my_datatype + ", " + "primary key (" + pk + ")";
            if (supertype == "" && cannot_exist_without == "") {
                res = res  + " );"
            } else if (supertype != "" && cannot_exist_without == "") {
                res = res + ", foreign key (" + pk + ") references "  + supertype 
                + "(" + supertype_pk + ")" + " );";
            } else if (supertype == "" && cannot_exist_without != "") {
                res = res + ", foreign key (" + pk + ") references " + cannot_exist_without 
                + "(" + cannot_exist_without_pk + ")" + " );" ;
            } 
            
            // else if (supertype != "" && cannot_exist_without != "") {
            //     res = res + ", foreign key (" + pk + ") references "  + supertype 
            //     + "(" + supertype_pk + ") ";
            //     res = res + ", foreign key (" + pk + ") references " + cannot_exist_without 
            //     + "(" + cannot_exist_without_pk + ")" + " );" ;
            // }
        } else {
            res = res + item + " " + my_datatype + ", ";
        }

    });

    return res; 
}

exports.createTable = function (name, pk, at,a_types, sub, sup, cant, cant_fk) {
    con.query(my_create_table(name, pk, at,a_types, sub, sup, cant, cant_fk), function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    return;
}