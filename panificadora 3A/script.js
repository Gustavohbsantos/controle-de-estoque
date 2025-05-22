// Inicializa a lista de produtos do localStorage ou cria uma lista vazia
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Seleciona os elementos do DOM
const form = document.getElementById("form-produto");
const tabela = document.getElementById("tabela-produto"); // Corrigido para 'tabela-produto'
const busca = document.getElementById("busca");

// Função para salvar os dados no localStorage
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Função para desenhar a tabela com os produtos
function atualizarTabela() {
    // Limpa a tabela antes de atualizar
    tabela.innerHTML = "";

    // Filtro de busca
    const filtro = busca.value.toLowerCase();

    // Percorre todos os produtos
    produtos.forEach((produto, index) => {
        if (produto.nome.toLowerCase().includes(filtro)) {
            const tr = document.createElement("tr");

            // Colunas da tabela
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.marca}</td>
                <td>${produto.unidade}</td>
                <td>${produto.categoria}</td>
                <td>
                    <button class="acao remover" onclick="removerProduto(${index})">Excluir</button>
                </td>
            `;

            tabela.appendChild(tr);
        }
    });
}

// Adiciona um novo produto
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById("nome").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const unidade = document.getElementById("unidade").value;
    const categoria = document.getElementById("categoria").value;

    // Cria um novo objeto de produto
    const novoProduto = {
        nome,
        marca: quantidade, // Corrigido para 'marca'
        unidade,
        categoria
    };

    // Adiciona na lista
    produtos.push(novoProduto);

    // Atualiza a tabela e salva
    salvarDados();
    atualizarTabela();

    // Limpa o formulário
    form.reset();
});

// Altera a quantidade do produto
function alterarQuantidade(index, valor) {
    produtos[index].quantidade += valor;

    // Evita quantidade negativa
    if (produtos[index].quantidade < 0) {   
        produtos[index].quantidade = 0;
    }

    salvarDados();
    atualizarTabela();
}

// Remove um produto da lista
function removerProduto(index) {
    produtos.splice(index, 1);
    salvarDados();
    atualizarTabela();
}

// Atualiza a tabela ao digitar no campo de busca
busca.addEventListener("input", atualizarTabela);

// Primeira renderização
atualizarTabela();