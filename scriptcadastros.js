// cadastrar usuarios

async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {
        nome,
        email,
        senha
    }

    console.log(data);
    try {
        const response = await fetch('http://localhost:3000/usuarios/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const results = await response.json();

        if (results.success) {
            console.log(results)
            alert(results.message)
        } else {
            alert(results.message)
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function logar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome_login').value;
    const senha = document.getElementById('senha_login').value;

    const data = { nome, senha };
    console.log(data);

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let results = await response.json();

        if (results.success) {
            let usuarioData = results;

            localStorage.setItem('informacoes', JSON.stringify(usuarioData));

            let html = document.getElementById('informacoes');
            let dados = JSON.parse(localStorage.getItem('informacoes'));
            console.log(dados);
            let perfil = dados.data.perfil;

            html.innerHTML = `<div style="display: block; flex-direction: column; align-items:end">
            id: ${dados.data.id}, nome: ${dados.data.nome}, email: ${dados.data.email}, perfil: ${dados.data.perfil}
            </div>`;
            html.style.display = "block";

        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao se conectar ao servidor.");
    }
}

// verificar se o usuário está logado ao carregar a página
window.addEventListener("load", () => {
    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById('informacoes');
        let dados = JSON.parse(localStorage.getItem('informacoes'));

        if (dados.data.perfil === "admin") {
            document.getElementById('informacoes').style.display = 'block';
        } else {
            document.getElementById('informacoes').style.display = 'none';
        }

        html.innerHTML = `<div style="display: block; flex-direction: column; align-items:end">
            id: ${dados.data.id}, nome: ${dados.data.nome}, email: ${dados.data.email}, perfil: ${dados.data.perfil}
            </div>`;
            html.style.display = "block";

        if (dados.data.perfil === "admin") {
            document.getElementById('cadastrar_produto').style.display = 'block';
        } else {
            document.getElementById('cadastrar_produto').style.display = 'none';
        }

    }
})

// função de logout (descomentada para uso)

function sairdaconta(event) {
    console.log(informacoes)
    localStorage.removeItem('informacoes');
    window.location.href = "indexformulario.html";
};


// cadastrar produtos

async function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome_produto').value;
    const quantidade = Number(document.getElementById('quantidade').value);
    const preco = Number(document.getElementById('preco').value);
    const file = document.getElementById('file').files[0];

    let formData = new FormData();
    formData.append('nome', nome);
    formData.append('quantidade', quantidade);
    formData.append('preco', preco);
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:3000/produto/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro ao cadastrar produto.");
        }

        const results = await response.json();

        if (results.success) {
            console.log(results);
            alert(results.message);
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro: " + error.message);
    }
}


// aparecer no html //

async () => {
    const listar = getElementById('produtos-catalago')

    const response = await fetch('http://localhost:3000/produto/listar')
    const result = await response.json();

    if (result.success) {
        const produtos = result.data;
        produtos.forEach(produtos => {
            const productDiv = document.createElement('div');
            productDiv.className = 'produtos-catalago';
            productDiv.dataset.productId = produtos.id_produtos; // Adiciona um ID único ao elemento

            productDiv.innerHTML = `
                <img src="${produtos.image_link}" alt="${produtos.produtos_nome}">
                <div class="produtos-nome">${produtos.produtos_nome}</div>
                <div class="produtos-preco">R$ ${produtos.preco}</div>
            `;

            productDiv.addEventListener('click', () => {
                window.location.href = `produtos-details.html?id=${produtos.id_produtos}`; 
            });

            productList.appendChild(productDiv);
        });
    }
}


// editar usuarios 

async function editar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {
        nome,
        email,
        senha
    }

    console.log(data);

    const response = await fetch('http://localhost:3000/usuario/editar/:id', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        console.log(results)
        alert(results.message)
    } else {
        alert(results.message)
    }
}

// deletar usuarios

async function deletar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {
        nome,
        email,
        senha
    }

    console.log(data);

    const response = await fetch('http://localhost:3000/usuario/deletar/:id', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        console.log(results)
        alert(results.message)
    } else {
        alert(results.message)
    }
}

// rafa fez

async function listarProdutos(event) {
    const response = await fetch('http://localhost:3000/produtos/listar', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        } 
    })


    const results = await response.json()

    if (results.success) {
        let produtoData = results.data
        const image = 'http://localhost:3000/uploads/'
        let html = document.getElementById('produtos-catalago')
        
        produtoData.forEach(produto => {
            console.log(produto)
            let card = `
            <div class="produtos-catalago">
                <a href="./produto1.html">
                </a>
                <div class="produtos-catalago-texto">
                    <h3>Concha da Ariel</h3>
                    <h3>Valor: 50.99 </h3>
                </div>
            </div>
            `
            html.innerHTML += card

        })
    } else {
        alert(results.message)
    }

}

function formEditarProduto(product) {
    // alert(4)
    console.log(product)
    let modal = document.getElementById('editar_produto')
 
    document.getElementById('id_produto').value = product.id
    document.getElementById('editar_titulo').value = product.titulo
    document.getElementById('editar_preco').value = product.price
    document.getElementById('imagem_produto').src = images + product.image
 
    modal.style.display = "block"
}
 
async function atualizarProduto(event) {
    event.preventDefault()
 
    let id = document.getElementById('id_produto').value
    let titulo = document.getElementById('editar_titulo').value
    let peco = document.getElementById('editar_preco').value
    let file = document.getElementById('editar_imagem').files[0]

    let formData = new FormData();
 
    formData.append('titulo', titulo)
    formData.append('peco', peco)
    formData.append('file', file)
 
    console.log(formData.get('titulo'), formData.get('preco'), formData.get('file'), id)
    const response = await fetch(`http://localhost:3000/produto/${id}`, {
        method: "PUT",
        body: formData
    })
 
    const results = await response.json()
 
    if(results.succes) {
        alert(results.message)
    } else {
        alert(results.message)
    }
}