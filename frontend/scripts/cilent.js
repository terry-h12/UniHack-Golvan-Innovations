class node {
    constructor(where_to, type, from_attribute, to_attribute) {
        this.where_to = where_to;
        this.type = type;
        this.from_attribute = from_attribute;
        this.to_attribute = to_attribute;
    }
};
var relationshipData = new Map();

class entity {
    constructor(name, primary_key, attributes, attribute_types, subtypes, supertype, cannot_exist_without, cannot_exist_without_fk) {
        this.name = name;
        this.primary_key = primary_key;
        this.attributes = attributes;
        this.attribute_types = attribute_types;
        this.subtypes = subtypes;
        this.supertype = supertype;
        this.cannot_exist_without = cannot_exist_without;
        this.cannot_exist_without_fk = cannot_exist_without_fk;
    }
};
var entity_data = new Map();

class relationships {
    constructor () {
        this.list = {};
        for (let[k,v] of entity_data) {
            this.addVertex(k);
        }
    }

    addVertex(vertex) {
        if (!this.list[vertex]) this.list[vertex] = [];
    }

    addEdge(v1, v2) {
        this.list[v1].push(v2);
    }

    removeEdge(v1, v2) {
        this.list[v1] = this.list[v1].filter(v => v !== v2);
    }
}

var relationshipData = new relationships();

function addRelationship (u, v, relationship, from_attribute, to_attribute) {
    let tmp = new node(v, relationship, from_attribute, to_attribute)
    relationshipData.addEdge(u, tmp);
}

function createEntity(name, pk, attributes, attribute_types, subtypes, supertype, cannot_exist_without) {
    if (subtypes != "") {
        if (supertype == "") {
            supertype = pk;
        } 
    }
    
    let cannot_exist_without_fk = "";
    console.log(cannot_exist_without_fk);
    if (cannot_exist_without != "") {
        console.log(entity_data);
        cannot_exist_without_fk = entity_data.get(cannot_exist_without).name;
    } else {
        cannot_exist_without = "";
        cannot_exist_without_fk = "";
    }
    
    var temp = new entity(name, pk, attributes, attribute_types, subtypes, supertype, cannot_exist_without, cannot_exist_without_fk);
    console.log(name);
    console.log(pk);
    console.log(attributes);
    console.log(attribute_types);
    console.log(subtypes);
    console.log(supertype);
    console.log(cannot_exist_without);
    console.log(cannot_exist_without_fk);
    entity_data.set(name, temp);
}

function createAllTables() {
    for (let[k,v] of entity_data) {
        passTables(v.name, v.primary_key, v.attributes, v.attribute_types, v.subtypes, v.supertype, v.cannot_exist_without, v.cannot_exist_without_fk);
    }
}

// name, primary_key, attributes, attribute_types, subtypes, supertype, cannot_exist_without, cannot_exist_without_fk
function passTables(name, pk, att, attribute_types, subtypes, supertype, cant, cant_fk) {
    let data = {
        name: name,
        primary_key: pk,
        attributes: att,
        attributes_types: attribute_types,
        subtypes: subtypes,
        supertype: supertype,
        cannot_exist_without: cant,
        cant_fk: cant_fk
    }

    console.log(JSON.stringify(data))

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/createTable', options).then(response => {
        console.log(response)
    });
}
