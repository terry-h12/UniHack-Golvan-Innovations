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

var entity_data = new Map();

var myModal = document.getElementById('entityModal');
// var myInput = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', function () {
    // myInput.focus();
    document.getElementById('entity-name').value = '';
    document.getElementById('primary-key').value = '';
    document.getElementById('attribute').value = '';
    document.getElementById('subtypes').value = '';
    document.getElementById('cannot-exist-without').value = '';
});

function saveAdd() {
    const name = document.getElementById('entity-name').value;
    let pk = document.getElementById('primary-key').value;
    let attributes = document.getElementById('attribute').value;
    let attribute_types = document.getElementById('attribute-types').value;
    let subtypes = document.getElementById('subtypes').value;
    let cannot_exist_without = document.getElementById('cannot-exist-without').value;
  
    createEntity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without);

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

    createEntity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without);
    
    const trash = document.getElementById(`${name + 'Remove'}`);

    trash.onclick = () => {
        entity_data.delete(name);
        
        const row_child_child = document.getElementById(`${name + 'Info'}`);
        row_child_child.parentNode.parentNode.remove();
    }

    const info = document.getElementById(`${name + 'Info'}`);
    info.onclick = () => {

    }


}

function createEntity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without) {
    var newEntity = new entity(name, pk, attributes, attribute_types, subtypes, cannot_exist_without);
    entity_data.set(name, newEntity);
}

let save_button = document.getElementsByClassName('save');


