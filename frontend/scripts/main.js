
// class to store entity
class entity {
    constructor(name, primary_key, attributes, attribute_types, subtypes, cannot_exist_without) {
        this.name = name;
        this.primary_key = primary_key;
        this.attributes = attributes;
        this.attribute_types = attribute_types
        this.subtypes = subtypes;
        this.cannot_exist_without = cannot_exist_without;
    }
};

// data structure to store entity classes
var entity_data = new Map();

var myModal = document.getElementById('entityModal');
// var myInput = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', function () {
    // myInput.focus();
    document.getElementById('entity-name').value = '';
    document.getElementById('primary-key').value = '';
    document.getElementById('attribute').value = '';
    document.getElementById('attribute-types').value = '';
    document.getElementById('subtypes').value = '';
    document.getElementById('cannot-exist-without').value = '';
});

// save button to add entity to map and visually update table
function saveAdd() {
    const name = document.getElementById('entity-name').value;
    let pk = document.getElementById('primary-key').value;
    let attributes = document.getElementById('attribute').value;
    let attribute_types = document.getElementById('attribute-types').value;
    let subtypes = document.getElementById('subtypes').value;
    let cannot_exist_without = document.getElementById('cannot-exist-without').value;
  
    var new_ent = createEntity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without);
    // console.log(new_ent.name);
    // passentity();

    let entity_id = 0;
    let my_html_content = 
                        `
                        <tr>
                            <td>${name}</td>
                            <td>
                                <button type="button" class="btn btn-outline-secondary" onClick="info()" id = ${name + 'Info'} data-bs-toggle="modal" data-bs-target="#infoModal">
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
        document.getElementById('info-name').value = new_ent.name;
        document.getElementById('info-key').value = new_ent.primary_key;
        document.getElementById('info-attribute').value = new_ent.attributes;
        document.getElementById('info-attribute-types').value = new_ent.attribute_types;
        document.getElementById('info-subtypes').value = new_ent.subtypes;
        document.getElementById('info-cannot-exist-without').value = new_ent.cannot_exist_without;

    }

    let myModalEl = document.getElementById('entityModal');
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
}

function createEntity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without) {
    var newEntity = new entity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without);
    entity_data.set(name, newEntity);
    return newEntity;
}

let save_button = document.getElementsByClassName('save');


