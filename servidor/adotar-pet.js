
function adotarPets(requisicao, resposta) {

    resposta.write(`

        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adotar Pets</title>
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
        <a class="navbar-brand" href="login.html">
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
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Sair</a>
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
        <form method="POST" action='/adotar-pets' class="row">
            <div class="form-group col-6">
                <label for="nomePet">Selecione o interessado</label>
                <select name="interessado" class="form-control">
    `);

    for (let i = 0; i < requisicao.session.ListaInteressados.length; i++) {
        resposta.write(`<option>${requisicao.session.ListaInteressados[i].nomeCompleto}</option>`);
    }
    resposta.write(`
                </select>
            </div>
            <div class="form-group col-6">
                <label for="raca">Selecione o Pet</label>
                <select name="pet" class="form-control">
            `);

    for (let i = 0; i < requisicao.session.listaPet.length; i++) {
        resposta.write(`<option>${requisicao.session.listaPet[i].nomePet}</option>`);
    }

    resposta.write(`
            </select>
            </div>
            <div class="col-12">
            <button type="submit" class="btn btn-enviar">Adotar</button>
            </div>
        </form>

<div class="container">
        <h3>Tabela de adoções</h3>
        <table  class="table table-dark table-striped-columns">
            <tr>
                <th class="text-center">Interessado</th>
                <th class="text-center">Pet</th>
                <th class="text-center">Data da adoção</th>
            </tr>
            `)


    for (let i = 0; i < requisicao.session.listaAdocoes.length; i++) {
        resposta.write('<tr>');
        resposta.write(`<td>${requisicao.session.listaAdocoes[i].interessado}`);
        resposta.write(`<td>${requisicao.session.listaAdocoes[i].pet}`);
        resposta.write(`<td>${requisicao.session.listaAdocoes[i].dataAdocao}`);
        resposta.write('</tr>');
    }


    resposta.write(
        `
        </table>
        </div>


    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
</body>

</html>
        
        
        
        `)



    console.log(requisicao.session);

    resposta.end();

}

function realizarAdocao(requisicao, resposta) {


    const interessado = requisicao.body.interessado
    const pet = requisicao.body.pet
    const dataAdocao = new Date();

    requisicao.session.listaAdocoes.push({
        interessado,
        pet,
        dataAdocao
    })

    resposta.redirect('/adotar-pets');
}

export {
    realizarAdocao,
    adotarPets,
}

export default adotarPets