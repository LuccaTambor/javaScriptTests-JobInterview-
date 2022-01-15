function change(str) {
    var b = document.querySelector('#count');
    if (str === 'u') {
        b.value++;
    }
    else if (str === 'd') {
        b.value--;
    }
}

function createCalc() {
    console.log('começando');
    var num = document.querySelector('#count').value;
    let grid = document.querySelector('#calcGrid');
    var i;
    
    for (i = 1; i <= num; i++) {
        let person = document.createElement('div');
        person.setAttribute('id', 'person_' + i);
        person.setAttribute('class', 'container');

        let personTitle = document.createElement('input');
        personTitle.type = 'text';
        personTitle.className = "form-name";
        personTitle.placeholder = 'Nome do cliente';
        person.appendChild(personTitle);

        

        let itemsDiv = document.createElement('div');
        itemsDiv.id = 'items_div_'+ person.id;
        console.log(itemsDiv.id);
        person.appendChild(itemsDiv);

        let addItemBtn = document.createElement('button');
        addItemBtn.innerHTML = 'Novo Item';
        addItemBtn.setAttribute('id', 'btn_person_' + i);
    
        person.appendChild(addItemBtn);
        addItemBtn.addEventListener('click', function() { createNewItem(itemsDiv)});

        grid.appendChild(person);
    }
}

function createNewItem (div) {
    var items_number=1;
    let newItem = document.createElement('input');
    newItem.placeholder = 'Nome do item';
    div.appendChild(newItem);

    let newItemPrice = document.createElement('input');
    newItemPrice.placeholder = 'Preço do item';
    newItemPrice.type = 'number';
    newItemPrice.step = '0.01';
    div.appendChild(newItemPrice);
    
}