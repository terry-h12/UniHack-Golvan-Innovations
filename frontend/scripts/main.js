
// //original entity from main
// // class to store entity
// class entity {
//     constructor(name, primary_key, attributes, attribute_types, subtypes, cannot_exist_without) {
//         this.name = name;
//         this.primary_key = primary_key;
//         this.attributes = attributes;
//         this.attribute_types = attribute_types
//         this.subtypes = subtypes;
//         this.cannot_exist_without = cannot_exist_without;
//     }
// };

// // data structure to store entity classes
// var entity_data = new Map();

// function createEntity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without) {
//     var newEntity = new entity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without);
//     entity_data.set(name, newEntity);
//     return newEntity;
// }

//entity from my working branch

class entity {
    constructor(name, primary_key, attributes, attribute_types, supertype, supertype_pk, cannot_exist_without, cannot_exist_without_fk) {
        this.name = name;
        this.primary_key = primary_key;
        this.attributes = attributes;
        this.attribute_types = attribute_types;
        this.supertype = supertype;
        this.supertype_pk = supertype_pk;
        this.cannot_exist_without = cannot_exist_without;
        this.cannot_exist_without_fk = cannot_exist_without_fk;
    }
};

var entity_data = new Map();

function createEntity(name, pk, attributes, attribute_types, supertype, cannot_exist_without) {
    // if (subtypes != "") {
    //     if (supertype == "") {
    //         supertype = pk;
    //     } 
    // }

    let supertype_pk = "";
    console.log(supertype);
    if (supertype != "") {
        console.log(entity_data);
        supertype_pk = entity_data.get(supertype).primary_key;
    } else {
        supertype = "";
        supertype_pk = "";
    }
    
    let cannot_exist_without_fk = "";
    console.log(cannot_exist_without);
    if (cannot_exist_without != "") {
        console.log(entity_data);
        //cannot_exist_without_fk = entity_data.get(cannot_exist_without).name;
        cannot_exist_without_fk = entity_data.get(cannot_exist_without).primary_key;
    } else {
        cannot_exist_without = "";
        cannot_exist_without_fk = "";
    }
    
    var newEntity = new entity(name, pk, attributes, attribute_types, supertype, supertype_pk, cannot_exist_without, cannot_exist_without_fk);
    console.log(name);
    console.log(pk);
    console.log(attributes);
    console.log(attribute_types);
    console.log(supertype);
    console.log(supertype_pk);
    console.log(cannot_exist_without);
    console.log(cannot_exist_without_fk);
    entity_data.set(name, newEntity);
    return newEntity;
}





class relationship {
    constructor(where_from, where_to, relationship_type, type_from, type_to, from_attribute, to_attribute) {
        this.where_from = where_from;
        this.where_to = where_to;
        this.relationship_type = relationship_type;
        this.type_from = type_from;
        this.type_to = type_to;
        this.from_attribute = from_attribute;
        this.to_attribute = to_attribute;
    }
};

var relationship_data = [];



// clearing modals when info is entered
var entityModal = document.getElementById('entityModal');

entityModal.addEventListener('shown.bs.modal', function () {
    document.getElementById('entity-name').value = '';
    document.getElementById('primary-key').value = '';
    document.getElementById('attribute').value = '';
    document.getElementById('attribute-types').value ='';
    document.getElementById('subtypes').value = '';
    document.getElementById('cannot-exist-without').value = '';
});

var relationshipModal = document.getElementById('relationshipModal');

relationshipModal.addEventListener('shown.bs.modal', function () {
    document.getElementById('first-entity').value = '';
    document.getElementById('second-entity').value = '';
    document.getElementById('relationship_dropdown').selectedIndex = 0;
    document.getElementById('first-entity-attribute').value = '';
    document.getElementById('second-entity-attribute').value = '';
    document.getElementById('attribute-data-type-left').selectedIndex = 0;
    document.getElementById('attribute-data-type-right').selectedIndex = 0;
});

// save button to add entity to map and visually update table
function saveAdd() {
    const name = document.getElementById('entity-name').value;
    let pk = document.getElementById('primary-key').value;
    let attributes = document.getElementById('attribute').value;
    let attribute_types = document.getElementById('attribute-types').value;
    //let subtypes = document.getElementById('subtypes').value;
    let supertype = document.getElementById('subtypes').value;
    let cannot_exist_without = document.getElementById('cannot-exist-without').value;
  
    var new_ent = createEntity(name, pk, attributes, attribute_types, supertype, cannot_exist_without);
    // console.log(new_ent.name);
    // passentity();

    let entity_id = 0;
    let my_html_content = 
                        `
                        <tr>
                            <td>${name}</td>
                            <td style="display: flex; justify-content: flex-end;">
                                <button type="button" class="btn btn-outline-secondary" id = ${name + 'Info'} data-bs-toggle="modal" data-bs-target="#entityInfoModal">
                                    <img src="assets/info-circle.svg">
                                </button>
                                <button type="button" class="btn btn-outline-secondary" id = ${name + 'Remove'}>
                                    <img src="assets/trash.svg">
                                </button>
                            </td>
                        </tr>`;
    let table_ref = document.getElementById('entTable');
    let new_row = table_ref.insertRow(table_ref.rows.length);
    new_row.innerHTML = my_html_content;

    // button to delete entities from global data structure and visual table
    const trash = document.getElementById(`${name + 'Remove'}`);
    trash.onclick = () => {
        entity_data.delete(name);
        
        const row_child_child = document.getElementById(`${name + 'Info'}`);
        row_child_child.parentNode.parentNode.remove();
    }
    
    // button to show info of entities
    const info = document.getElementById(`${name + 'Info'}`);
    info.onclick = () => {
        document.getElementById('ent-info-name').value = new_ent.name;
        document.getElementById('ent-info-key').value = new_ent.primary_key;
        document.getElementById('ent-info-attribute').value = new_ent.attributes;
        document.getElementById('ent-info-attribute-types').value = new_ent.attribute_types;
        document.getElementById('ent-info-subtypes').value = new_ent.supertype;
        document.getElementById('ent-info-cannot-exist-without').value = new_ent.cannot_exist_without;

    }

    let myModalEl = document.getElementById('entityModal');
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
}



let save_button = document.getElementsByClassName('save');

function relationshipSave() {
    let first_entity_name = document.getElementById('first-entity').value;
    let second_entity_name = document.getElementById('second-entity').value;
    let relationship_type = document.getElementById('relationship_dropdown').value;
    let first_entity_attribute = document.getElementById('first-entity-attribute').value;
    let second_entity_attribute = document.getElementById('second-entity-attribute').value;
    let first_entity_data_type = document.getElementById('attribute-data-type-left').value;
    let second_entity_data_type = document.getElementById('attribute-data-type-right').value;
    

    var new_relationship = createRelationship(first_entity_name, second_entity_name, relationship_type, first_entity_data_type, second_entity_data_type, first_entity_attribute, second_entity_attribute, first_entity_data_type, second_entity_data_type);
    
    // console.log(relationship_data);
    let myModalEl = document.getElementById('relationshipModal');
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    let my_html_content = 
                        `
                        <tr>
                            <td>${first_entity_name + " <----- "+ relationship_type +  " -----> "+second_entity_name}</td>
                            <td style="display: flex; justify-content: flex-end;">
                                <button type="button" class="btn btn-outline-secondary" id = ${first_entity_name +  second_entity_name + first_entity_attribute + second_entity_attribute+'Info'} data-bs-toggle="modal" data-bs-target="#relationshipInfoModal">
                                    <img src="assets/info-circle.svg">
                                </button>
                                <button type="button" class="btn btn-outline-secondary" id = ${first_entity_name +  second_entity_name + first_entity_attribute + second_entity_attribute + 'Remove'}>
                                    <img src="assets/trash.svg">
                                </button>
                            </td>
                        </tr>`;
    let table_ref = document.getElementById('relTable');
    let new_row = table_ref.insertRow(table_ref.rows.length);
    new_row.innerHTML = my_html_content;
    const info = document.getElementById(`${first_entity_name +  second_entity_name + first_entity_attribute+ second_entity_attribute+'Info'}`);
    
    const trash = document.getElementById(`${first_entity_name +  second_entity_name + first_entity_attribute + second_entity_attribute + 'Remove'}`);
    trash.onclick = () => {
        const name = document.getElementById(`${first_entity_name +  second_entity_name + first_entity_attribute + second_entity_attribute}`);
        var removeIndex = relationship_data.map(function(item) { return item.id; }).indexOf(name);
        relationship_data.splice(removeIndex -1 , 1);
        const row_child_child = document.getElementById(`${first_entity_name +  second_entity_name + first_entity_attribute+ second_entity_attribute+'Info'}`);
        row_child_child.parentNode.parentNode.remove();
        
    }
    info.onclick = () => {
        document.getElementById('info-rel-first-entity').value = new_relationship.where_from;
        document.getElementById('info-rel-second-entity').value = new_relationship.where_to;
        document.getElementById('info-relationship_dropdown').value = new_relationship.relationship_type;
        document.getElementById('info-rel-first-entity-attribute').value = new_relationship.from_attribute;
        document.getElementById('info-rel-second-entity-attribute').value = new_relationship.to_attribute;
        document.getElementById('info-attribute-data-type-left').value = new_relationship.type_from;
        document.getElementById('info-attribute-data-type-right').value = new_relationship.type_to;
    }
    console.log(relationship_data);
}

function createRelationship(where_from, where_to, relationship_type, type_from, type_to, from_attribute, to_attribute) {
    var newRelationship = new relationship(where_from, where_to, relationship_type, type_from, type_to, from_attribute, to_attribute);
    relationship_data.push(newRelationship);
    return newRelationship;
}