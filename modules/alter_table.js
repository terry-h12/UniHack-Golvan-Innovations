const mysql = require("mysql");
const con = require("./connection");

// function my_alter_table (table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to) {
//     if (att_from_type == "varchar5") {
//         var from_type = "varchar(5)";
//     } else if (att_from_type == "varchar10") {
//         var from_type = "varchar(10)";
//     } else if (att_from_type == "varchar15") {
//         var from_type = "varchar(15)";
//     } else if (att_from_type == "varchar20") {
//         var from_type = "varchar(20)";
//     }
    
//     if (att_to_type == "varchar5") {
//         var to_type = "varchar(5)";
//     } else if (att_to_type == "varchar10") {
//         var to_type = "varchar(10)";
//     } else if (att_to_type == "varchar15") {
//         var to_type = "varchar(15)";
//     } else if (att_to_type == "varchar20") {
//         var to_type = "varchar(20)";
//     }

//     res = "";
//     if (relo_type == "1-to-m") {
//         res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
//         res = res + "references " + table_to + "(" + att_to + ");"
//     } else if (relo_type == "1-to-1") {
//         res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
//         res = res + "references " + table_to + "(" + att_to + ");"
//     } else if (relo_type == "m-to-n") {
//         res = res + "Create table " + table_from + "_and_" + table_to + " ( ";
//         res = res + att_from + "_new " + from_type + ", ";
//         res = res + att_to + "_new " + to_type + ", ";
//         res = res + "primary key (" + att_from + "_new, " + att_to + "_new), ";
//         res = res + "foreign key (" + att_from + "_new) references " +  table_from + "(" + att_from + "), ";
//         //res = res + att_to + "_new " + to_type;
//         res = res + "foreign key (" + att_to + "_new) references " +  table_to + "(" + att_to + ") );";
        
//     }
    
//     // else if (relo_type == "m-to-n") {
//     //     res = res + "Create table " + table_from + "_and_" + table_to + " ( ";
//     //     res = res + att_from + "_new " + from_type;
//     //     res = res + " references " + table_from + " (" + att_from + "), ";
//     //     res = res + att_to + "_new " + to_type;
//     //     res = res + " references " + table_to + " (" + att_to + ") );"
//     // }

//     console.log(table_from);
//     console.log(table_to);
//     console.log(relo_type);
//     console.log(from_type);
//     console.log(to_type);
//     console.log(att_from);
//     console.log(att_to);
//     return res;
// }

function my_alter_table (table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to) {
    if (att_from_type == "integer") {
    	var from_type = att_from_type;
    }
    
    if (att_to_type == "integer") {
    	var from_type = att_to_type;
    }
    
    if (att_from_type == "varchar5") {
        var from_type = "varchar(5)";
    } else if (att_from_type == "varchar10") {
        var from_type = "varchar(10)";
    } else if (att_from_type == "varchar15") {
        var from_type = "varchar(15)";
    } else if (att_from_type == "varchar20") {
        var from_type = "varchar(20)";
    }
    
    if (att_to_type == "varchar5") {
        var to_type = "varchar(5)";
    } else if (att_to_type == "varchar10") {
        var to_type = "varchar(10)";
    } else if (att_to_type == "varchar15") {
        var to_type = "varchar(15)";
    } else if (att_to_type == "varchar20") {
        var to_type = "varchar(20)";
    }

    res = "";
    if (relo_type == "1-to-m") {
        res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
        res = res + "references " + table_to + "(" + att_to + ");"
    } else if (relo_type == "1-to-1") {
        res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
        res = res + "references " + table_to + "(" + att_to + ");"
    } else if (relo_type == "m-to-n") {
        res = res + "Create table " + table_from + "_and_" + table_to + " ( ";
        res = res + att_from + "_new " + from_type + ", ";
        res = res + att_to + "_new " + to_type + ", ";
        res = res + "primary key (" + att_from + "_new, " + att_to + "_new), ";
        res = res + "foreign key (" + att_from + "_new) references " +  table_from + "(" + att_from + "), ";
        //res = res + att_to + "_new " + to_type;
        res = res + "foreign key (" + att_to + "_new) references " +  table_to + "(" + att_to + ") );";
        
    }
    
    
    console.log(res);
    return res;
}

exports.alterTable = function (table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to) {
    con.query(my_alter_table(table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to), function (err, result) {
        console.log(my_alter_table(table_from, table_to, relo_type, att_from_type, att_to_type, att_from, att_to));
        if (err) throw err;
        console.log("Altered table")
    });
}