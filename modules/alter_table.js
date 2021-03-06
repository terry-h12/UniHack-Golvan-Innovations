function my_alter_table (table_from, table_to, relo_type, att_from, att_from_type, att_to, att_to_type) {
    res = "";
    if (relo_type == "1 to N") {
        res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
        res = res + "references " + table_to + "(" + att_to + ");"
    } else if (relo_type == "1 to 1") {
        res = res + "Alter table " + table_from + " add foreign key (" + att_from + ") ";
        res = res + "references " + table_to + "(" + att_to + ");"
    } else if (relo_type == "N to M") {
        res = res + "Create table " + table_from + "_and_" + table_to + " ( ";
        res = res + att_from + "_new " + att_from_type;
        res = res + " references " + table_from + " (" + att_from + "), ";
        res = res + att_to + "_new " + att_to_type;
        res = res + " references " + table_to + " (" + att_to + ") );"
    }


    return res;
}

