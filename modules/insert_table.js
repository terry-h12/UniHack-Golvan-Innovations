const mysql = require("mysql");
const con = require("./connection");

function my_insert_table (table_name, pair_list) {
    let res = "";
    let insert_col_list = [];
    let insert_value_list = [];
    for (const[cname, cvalue] of Object.entries(pair_list)) {
        if (cvalue != "") {
            insert_col_list.push(cname);
            insert_value_list.push(cvalue);
        }
    }
    res = res + "INSERT INTO " + table_name + " (";
    for (i = 0; i < insert_col_list.length; i++) {
            if (i + 1 != insert_col_list.length) {
                res = res + insert_col_list[i] + ", ";
            } else {
                res = res + insert_col_list[i] + ") ";
            }
            
    }
    res = res + "VALUES ("; 
    for (i = 0; i < insert_value_list.length; i++) {
        if (i + 1 != insert_value_list.length) {
            res = res + "'" + insert_value_list[i] + "', ";
        } else {
            res = res + "'" + insert_value_list[i] + "');";
        }
    }

    return res;
};

exports.createRow = function (table_name, pair_list) {
    con.query(my_insert_table(table_name, pair_list), function (err, result) {
        if (err) throw err;
        console.log("row created");
    });
    return;
}

