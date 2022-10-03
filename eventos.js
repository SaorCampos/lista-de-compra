function atualizarLista() {
    tabela_compras.innerHTML = ""
    fetch('http://localhost:8000/compras')
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(lista){
        lista.forEach(function (cadaItem){
            tabela_compras.innerHTML += `
            <tr>
                <td><input data-check="acao" type="checkbox"></td>
                <td>${cadaItem.id}</td>
                <td>${cadaItem.item}</td>
                <td>${cadaItem.quantidade}</td>
                <td>
                    <button onclick="excluir(${cadaItem.id})" class="btn btn-danger">
                        Excluir
                    </button>
                    <button onclick="chamarProduto(${cadaItem.id})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    Editar
                    </button>
                </td>
            </tr>`
        });
    })
}
async function excluir (id) {
    let resposta = confirm('Está certo disso?');
    if(resposta !== true){
        return;
    }
    await fetch('http://localhost:8000/compras/' +id, {
        method: 'DELETE',
    });
    // window.location.reload();
    // location.href = "";
    atualizarLista();
}
function criar(){
    event.preventDefault();
    let produto = {
        item: document.getElementById('input_produto').value,
        quantidade: document.getElementById('input_quantidade').value,
    }
    if(item.trim() ==="" || quantidade.trim() ===""){
        alert('Preencha todos os campos');
        return;
    }
    fetch('http://localhost:8000/compras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto)
    }).then((response) => response.json())
    .then((data) => {
        alert("Produto adicionado com sucesso")
        atualizarLista();
        console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    formAdd.reset()
}

function chamarProduto(id) {
    fetch('http://localhost:8000/compras/' +id)
    .then(function(resposta){
        return resposta.json();
    })
    .then((produto) => {
        document.getElementById("editar_id").value = produto.id;
        editar_produto.value = produto.item;
        editar_quantidade.value = produto.quantidade;
    })
};
async function editar(){
    event.preventDefault();
    let id = document.getElementById('editar_id').value
    let produto = {
        item: document.getElementById('editar_produto').value,
        quantidade: document.getElementById('editar_quantidade').value,
    }
    await fetch('http://localhost:8000/compras/' +id,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(produto)
    }).then((response) => response.json())
    .then((data) => {
        alert("Produto editado com sucesso")
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
        });
    atualizarLista();
}
function marcarTodos(){
    let todos = document.querySelectorAll('[data-check="acao"]');
    todos.forEach((cadaCheck) => {
        cadaCheck.checked = true;
    });
}

atualizarLista();