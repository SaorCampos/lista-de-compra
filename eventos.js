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
                <td>${cadaItem.id}</td>
                <td>${cadaItem.item}</td>
                <td>${cadaItem.quantidade}</td>
                <td>
                    <button onclick="excluir(${cadaItem.id})" class="btn btn-danger">
                        Excluir
                    </button>
                    <button class="btn btn-warning">
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
    fetch('http://localhost:8000/compras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto)
    }).then((response) => response.json())
    .then((data) => {
        atualizarLista();
        console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    formAdd.reset()
}
function editar(id){
    event.preventDefault();
    let produto = {
        item: document.getElementById('nome').value,
        quantidade: document.getElementById('quantia').value,
    }
    fetch('http://localhost:8000/compras/' +id,{
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
}
atualizarLista();