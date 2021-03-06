const mysql = require("mysql");
const con = require("./connection");

function my_alter_table (table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to) {
    res = "";
    if (relo_type == "1-to-N") {
        res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
        res = res + "references " + table_to + "(" + att_to + ");"
    } else if (relo_type == "1-to-1") {
        res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
        res = res + "references " + table_to + "(" + att_to + ");"
    } else if (relo_type == "N-to-M") {
        res = res + "Create table " + table_from + "_and_" + table_to + " ( ";
        res = res + att_from + "_new " + att_from_type;
        res = res + " references " + table_from + " (" + att_from + "), ";
        res = res + att_to + "_new " + att_to_type;
        res = res + " references " + table_to + " (" + att_to + ") );"
    }

    console.log(table_from);
    console.log(table_to);
    console.log(relo_type);
    console.log(att_from_type);
    console.log(att_to_type);
    console.log(att_from);
    console.log(att_to);
    return res;
}

exports.alterTable = function (table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to) {
    con.query(my_alter_table(table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to), function (err, result) {
        console.log(my_alter_table(table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to));
        if (err) throw err;
        console.log("Altered table")
    });
}