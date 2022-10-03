function filtrar(){
    let expressao = input_busca.value.toLowerCase();
    let linhas = tabela_compras.getElementsByTagName('tr');
    for(let posicao in linhas) {
        if(isNaN(posicao)){
            continue;
        }
        let coluna1 = linhas[posicao].children[1].innerText.toLowerCase();
        let coluna2 = linhas[posicao].children[2].innerText.toLowerCase();
        let colunas = coluna1 + coluna2;
        if (colunas.includes(expressao)){
            linhas[posicao].style.display = '';
        }else{
            linhas[posicao].style.display = 'none';
        }
    }
}