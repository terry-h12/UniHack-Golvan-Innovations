const mysql = require("mysql");
const db = require("./connection");

exports.createTable = function (name, pk, attributes, subtypes, cannot_exist_without) {
    return "yes"
}