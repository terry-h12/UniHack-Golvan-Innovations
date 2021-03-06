const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwer4321"
});

con.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected!");
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err.code = "ER_DB_CREATE_EXISTS") {
            console.log("Database already exists")
            return;
        } else if (err) {
            throw err;
        }
        console.log("Database created");
    });
});

var con2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwer4321",
    database: "mydb"
});

module.exports = con2;