window.addEventListener("load", function(evt){
    //adiciona os valores e elementos existentes no sessionStorage na tabela ao carregar a página
    let myItem = JSON.parse(sessionStorage.getItem("pessoa")) || [];
    let index = 0;
    const tableBody = document.querySelector("#tabela tbody");

    myItem.forEach(element => {
        const row = document.createElement("tr");

        for(let key in element){
            const cell = document.createElement("td");
            cell.innerHTML = '<button id="element-'+index+'" class="botao_valores_tabela" value="'+element[key].toString()+'"  onclick="update(\''+element[key].toString()+'\',\''+index.toString()+'\')">'+element[key]+'</button>';

            row.appendChild(cell);
        }

        index = index + 1;

        const cellAction = document.createElement("td");
        cellAction.innerHTML = '<button class="botao_remover" id="button-'+index+'" onclick="remove('+index+')">X</button>';
        row.appendChild(cellAction);
    

        tableBody.appendChild(row);
    });
});

//impede de digitar numero no campo de nome
document.getElementById("name").addEventListener("keypress", function(evt){
    if(evt.keyCode >= 48 && evt.keyCode <= 57){
        evt.preventDefault();
    }
});

//remove o elemento da tabela e do sessionStorage
function remove(indice){
    let valores = JSON.parse(sessionStorage.getItem("pessoa")) || [];

    var rem = valores.splice(indice-1, 1);

    sessionStorage.setItem("pessoa", JSON.stringify(valores));
    location.reload()
}

//atualiza o elemento no sessionStorage
function edit(){
    let valores = JSON.parse(sessionStorage.getItem("pessoa")) || [];

    var value_nome = document.getElementById("name-edit").value;
    var value_birth = document.getElementById("birth-date-edit").value;
    var selected = document.getElementById("index").value;

    valores[selected].name = value_nome;
    valores[selected].date_birth = value_birth;
    sessionStorage.setItem("pessoa", JSON.stringify(valores));
}

//pega o valor que foi clicado na tabela e insere nos campos para edição
function update(value_edit, index){
    var value_nome = document.getElementById("name-edit");
    var value_birth = document.getElementById("birth-date-edit");


    let prevData = JSON.parse(sessionStorage.getItem('pessoa'));
    prevData.forEach(function(val, key){
        if(value_edit == prevData[key].name || value_edit == prevData[key].date_birth){
            value_nome.value = val.name;
            value_birth.value = val.date_birth;
            document.getElementById("index").value = index;
        }
    })
}

//cadastra novo elemento
function save(){
    var valueName = document.getElementById("name").value;
    var valueBirth = document.getElementById("birth-date").value;

    if(valueName == "" || valueBirth == ""){
        return false;
    }

    var name_ = document.getElementById('name').value;
    var date_birth_ = document.getElementById('birth-date').value;

    let myObj = {name: name_, date_birth: date_birth_};
    const people = JSON.parse(sessionStorage.getItem('pessoa')) || [];
    people.push(myObj);
    sessionStorage.setItem("pessoa", JSON.stringify(people));
}