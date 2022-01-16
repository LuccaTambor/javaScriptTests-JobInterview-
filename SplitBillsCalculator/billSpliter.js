var clients;

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
    document.querySelector('#btn-start').disabled = true;
    var num = document.querySelector('#count').value;
    clients = num;
    let grid = document.querySelector('#calcGrid');
    
    var i;
    
    for (i = 1; i <= num; i++) {
        let person = document.createElement('div');
        person.setAttribute('id', 'person_' + i);
        person.setAttribute('class', 'container');

        let personTitle = document.createElement('input');
        personTitle.type = 'text';
        personTitle.className = "form-num";
        personTitle.placeholder = 'Nome do cliente';
        person.appendChild(personTitle);

        let itemsDiv = document.createElement('div');
        itemsDiv.id = 'items_div_'+ person.id;
        console.log(itemsDiv.id);
        person.appendChild(itemsDiv);

        let addItemBtn = document.createElement('button');
        addItemBtn.innerHTML = 'Novo Item';
        addItemBtn.setAttribute('id', 'btn_person_' + i);
        addItemBtn.setAttribute('class', 'btn-count');
    
        person.appendChild(addItemBtn);
        addItemBtn.addEventListener('click', function() { createNewItem(itemsDiv)});

        let taxCheck = document.createElement('input');
        taxCheck.setAttribute('type', 'checkbox');
        taxCheck.setAttribute('class', 'check_tax');
        taxCheck.setAttribute('id', 'checkTax_'+person.id);
        console.log(taxCheck.id);
        taxCheck.innerHTML = "10%";

        var br = document.createElement("br");
        
        let label_check = document.createElement('label');
        label_check.innerHTML = "Taxa de Serviço";

        person.appendChild(br);
        person.appendChild(taxCheck);
        person.appendChild(label_check);

        let finalValue = document.createElement("h3");
        finalValue.setAttribute('id', 'final_value_'+person.id);
        finalValue.setAttribute('class', 'final_value');
        finalValue.innerHTML = "R$0.00";

        person.appendChild(finalValue);

        grid.appendChild(person);
    }

    let btnExec = document.createElement('button');
    btnExec.innerHTML = "Calcular";
    btnExec.setAttribute('id', 'btn_exec');
    btnExec.setAttribute('class', 'btn-count');
    btnExec.addEventListener('click', doCalc);

    grid.appendChild(btnExec);
}

function createNewItem (div) {
    let newItem = document.createElement('input');
    newItem.placeholder = 'Nome do item';
    div.appendChild(newItem);

    let newItemPrice = document.createElement('input');
    newItemPrice.placeholder = 'Preço do item';
    newItemPrice.setAttribute('class', 'price_text_' + div.id);
    newItemPrice.type = 'number';
    newItemPrice.step = '0.01';
    console.log(newItemPrice.className);
    div.appendChild(newItemPrice);
}

function doCalc () {
    var num = clients, 
        i,j;
    for (i = 1; i <= num; i++) {
        let str = 'person_' + i;
        let itemsList = document.querySelectorAll('input.price_text_items_div_'+str);
        let sum = 0.00;
        
        for(j = 0; j < itemsList.length; j++) {
            sum += parseFloat(itemsList[j].value);
        }

        if(document.querySelector('#checkTax_person_'+i).checked == true) {
            sum = sum * 1.1;
        }

        document.querySelector('#final_value_person_'+i).innerHTML = "R$ "+ sum.toFixed(2);
    }
 }