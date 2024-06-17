

let listaPet = [];

function PaginaListaPet(requisicao, resposta) {

    resposta.write('<!DOCTYPE html>');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<meta charset="utf-8">');
    resposta.write('<title>Listar</title>');
    resposta.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resposta.write('</head>');
    resposta.write('<body>');
    resposta.write("<h1 class='text-center mt-3'>Lista de Pets</h1>");
    resposta.write('<br>');
    resposta.write('<br>');
    resposta.write('<div class="container">');
    resposta.write('<table class="table table-dark table-striped-columns">');
    resposta.write('<tr>');
    resposta.write('<th class="text-center">Nome do pet</th>');
    resposta.write('<th class="text-center">Raça</th>');
    resposta.write('<th class="text-center">Idade em ano</th>');
    resposta.write('</tr>');
    for (let i = 0; i < requisicao.session.listaPet.length; i++) {
        resposta.write('<tr>');
        resposta.write(`<td>${requisicao.session.listaPet[i].nomePet}`);
        resposta.write(`<td>${requisicao.session.listaPet[i].raca}`);
        resposta.write(`<td>${requisicao.session.listaPet[i].idade}`);
        resposta.write('</tr>');
    }
    resposta.write('<a href="cadastro-pet.html">Voltar</a>');
    resposta.write('<br><br>');
    resposta.write('</table>');
    resposta.write('</div>');
    if (requisicao.cookies.dataUltimoAcesso) {

        resposta.write('<p>')
        resposta.write('Seu ultimo acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
        resposta.write('<p>');

    }

    resposta.write('</body>');
    resposta.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resposta.write('</html>');

    resposta.end();
}

function cadastroPet(requisicao, resposta) {

    const nomePet = requisicao.body.nomePet;
    const raca = requisicao.body.raca;
    const idade = requisicao.body.idade;

    console.log(requisicao.body);

    //verificando campos preenchidos (post)
    if (nomePet && raca && idade) {

        requisicao.session.listaPet.push({

            nomePet: nomePet,
            raca: raca,
            idade: idade
        });
        resposta.redirect('/lista-pet');

    }


    else {

        resposta.write(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adotar pet</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .content-section {
            padding: 40px 0;
        }

        .card-custom {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .card-body {
            flex: 1;
        }

        .card-img {
            width: 150px;
            height: 100%;
            object-fit: cover;
        }

        .link-voltar {
            color: #ff6600;
            font-weight: bold;
        }

        .link-voltar:hover {
            color: #ff6600;
            text-decoration: none;
        }

        .btn-enviar {
            background-color: white;
            border: 1px solid #ff6600;
            color: #ff6600;
            font-weight: bold;
        }

        .btn-enviar:hover {
            background-color: #ff6600;
            color: white;
        }
    </style>
</head>

<body>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="index.html">
            <img src="https://png.pngtree.com/png-clipart/20230813/original/pngtree-paw-print-circle-flat-icon-paw-pet-puppy-vector-picture-image_10585775.png"
                width="30" height="30" class="d-inline-block align-top" alt="Logo">
        </a>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="cadastro-interessado.html">Cadastro de Interessados</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="cadastro-pet.html">Cadastro de Pets</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/adotar-pets">Adotar Pets</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Link Voltar -->
    <div class="container mt-3">
        <a href="index.html" class="link-voltar">Voltar</a>
    </div>

    <!-- Formulário -->
    <div class="container content-section">
        <h2>Cadastre um Pet</h2>
        <form method="POST" action='/cadastro-pet'>
            <div class="form-group">
                <label for="nomePet">Nome do Pet</label>
                <input type="text" class="form-control" name="nomePet" id="nomePet" placeholder="" value="${nomePet}"/>`);

        if (nomePet == "") {

            resposta.write(`<div my-2 class="alert alert-danger" role="alert">
                            Por favor, informe o nome do pet.
                        </div>`);
        }
        resposta.write(`</div>
            <div class="form-group">
                <label for="raca">Raça</label>
                <input type="text" class="form-control" name="raca" id="raca" placeholder="" value="${raca}"/>`);

        if (raca == "") {

            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe a raça do pet.
                        </div>`);
        }
        resposta.write(` </div>
            <div class="form-group">
                <label for="idade">Idade em ano</label>
                <input type="text" class="form-control" name="idade" id="idade" placeholder="" value="${idade}"/>`);
        if (idade == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe a idade do pet.
                        </div>`);
        }
        resposta.write(`</div>
            <button type="submit" class="btn btn-enviar">Enviar</button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
</body>

</html>`);
    }

    resposta.end();
}

export {
    cadastroPet,
    PaginaListaPet
}


export default PaginaListaPet;