import express from 'express';
import path from 'path';

const host = '0.0.0.0';

const porta = 3000;

let listaFornecedor = [];

const app = express();
//configurar o express para manipular corretamente os dados qndo forem submetido via metodo POST
app.use(express.urlencoded({ extended: true }));//habilita a biblioteta queryString 

app.use(express.static(path.join(process.cwd(), 'publico')));


function cadastrarFornecedor(requisicao, resposta) {

    const razaoSocial = requisicao.body.razaoSocial;
    const nomeFantasia = requisicao.body.nomeFantasia;
    const cnpj = requisicao.body.cnpj;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;

    //verificando campos preenchidos
    if (razaoSocial && nomeFantasia && cnpj && endereco && cidade && estado && cep && email && telefone) {

        listaFornecedor.push({

            razaoSocial: razaoSocial,
            nomeFantasia: nomeFantasia,
            cnpj: cnpj,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            cep: cep,
            email: email,
            telefone: telefone
        });
        resposta.redirect('/listarFornecedor');
    }

    else {

        resposta.write(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />


</head>

<body>
    <main class="container d-flex flex-column justify-content-center align-items-center">
        <div class="card w-50 p-4 border-0 mt-5">
            <div class="card-body text-center">
               

                    <h3 class="text-center mb-5">Cadastre-se</h3>
                    <div class="container mb-5">
                        <form method="POST" action='/cadastrarFornecedor' class=" border row g-2">
                            <div class="mb-3">
                                <label for="razao" class="form-label">Razão Social:</label><br>
                                <input type="text" class="form-control" id="razao" name="razaoSocial" value="${razaoSocial}"
                                    placeholder="">`);

        if (razaoSocial == "") {

            resposta.write(`<div my-2 class="alert alert-danger" role="alert">
                            Por favor, informe a Razão Social.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="nome" class="form-label">Nome Fantasia:</label><br>
                                <input type="text" class="form-control" id="nome" name="nomeFantasia" value="${nomeFantasia}"
                                    placeholder="">`);

        if (nomeFantasia == "") {

            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o Nome Fantasia.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="cnpj" class="form-label">CNPJ:</label><br>
                                <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" value="${cnpj}">`);
        if (cnpj == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o CNPJ.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="mb-3">
                                <label for="endereco" class="form-label">Endereço:</label><br>
                                <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}"
                                    placeholder="">`);
        if (endereco == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o Endereço.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="col-md-5">
                                <label for="cidade" class="form-label">Cidade:</label><br>
                                <input type="text" class="form-control" id="cidade" name="cidade"value="${cidade}" placeholder="">`);
        if (cidade == "") {

            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe a Cidade.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="col-md-3">
                                <label for="estado" class="form-label">UF</label><br>
                                <select type="text" class="form-select" id="estado" name="estado" value="${estado}">
                                    <option selected disabled value="">Escolha um estado...</option>
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>`);
        if (!estado) {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, selecione um Estado.
                        </div>`);
        }

        resposta.write(`</div>
                            <div class="col-md-4">
                                <label for="cep" class="form-label">CEP:</label><br>
                                <input type="text" class="form-control" id="cep" name="cep" value="${cep}" placeholder="00000-000">`)
        if (cep == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o CEP.
                        </div>`);
        }

        resposta.write(`</div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">E-mail:</label><br>
                                <input type="text" class="form-control" id="email" name="email" value="${email}" placeholder="exemplo@gmail.com">`);
        if (email == "") {

            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o E-mail.
                        </div>`);
        }

        resposta.write(`</div>
                            <div class="col-md-4">
                                <label for="telefone" class="form-label">Telefone:</label><br>
                                <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}"
                                    placeholder="(99)99999-9999">`);
        if (telefone == "") {
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o Telefone.
                        </div>`);
        }
        resposta.write(`</div>
                            <div class="text-center">
                                <div class="col-12 mb-3 mt-3">
                                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                                    <a class="btn btn-secondary" href="/">Voltar</a>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
        </script>

</body>

</html>`);

        resposta.end();//finaliza o envio da resposta 

    }//fim do else
}


app.post('/cadastrarFornecedor', cadastrarFornecedor);

app.get('/listarFornecedor', (requisicao, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Listar</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write("<h1 class='text-center mt-3'>Lista de Fornecedores</h1>");
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<div class="container">');
    resp.write('<table class="table table-dark table-striped-columns">');
    resp.write('<tr>');
    resp.write('<th class="text-center">Razão Social</th>');
    resp.write('<th class="text-center">Nome Fantasia</th>');
    resp.write('<th class="text-center">CNPJ</th>');
    resp.write('<th class="text-center">Endereço</th>');
    resp.write('<th class="text-center">Cidade</th>');
    resp.write('<th class="text-center">UF</th>');
    resp.write('<th class="text-center">CEP</th>');
    resp.write('<th class="text-center">E-mail</th>');
    resp.write('</tr>');
    for (let i = 0; i < listaFornecedor.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaFornecedor[i].razaoSocial}`);
        resp.write(`<td>${listaFornecedor[i].nomeFantasia}`);
        resp.write(`<td>${listaFornecedor[i].cnpj}`);
        resp.write(`<td>${listaFornecedor[i].endereco}`);
        resp.write(`<td>${listaFornecedor[i].cidade}`);
        resp.write(`<td>${listaFornecedor[i].estado}`);
        resp.write(`<td>${listaFornecedor[i].cep}`);
        resp.write(`<td>${listaFornecedor[i].email}`);
        resp.write('</tr>');
    }
    resp.write('<a href="/">Inicio</a>');
    resp.write('<br><br>');
    resp.write('</table>');
    resp.write('</div>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});


//quando usuario enviar uma requisição do tipo post para endpoint 'http://localhost:3000//cadastrarFornecedor'
//executa a função a funcção cadastrarFornecedor();
app.post('/cadastrarFornecedor', cadastrarFornecedor);

app.listen(porta, host, () => {

    console.log(`Servidor rodando em http://${host}:${porta}`);
})