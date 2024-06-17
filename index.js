import express from 'express';
//path deixa pasta de arquivo publico
import path from 'path';

//sessão para cada usuario utilizando o modulo session com o comando npm install express-session
import session from 'express-session';


//cookies (instalar cookieParser( npm install cookie-parser))
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

/**
 * Importa a função PaginaListaPet do arquivo que está na pasta servidor.
 */
import { cadastroPet, PaginaListaPet } from './servidor/lista-pet.js';



import { PaginalistaInteressados, cadastroInteressado } from './servidor/lista-interessados.js';


import { UsuarioEstaAutenticado, autenticarUsuario } from './servidor/login.js';


import { realizarAdocao, adotarPets } from './servidor/adotar-pet.js';


const app = express();
//configurar o express para manipular corretamente os dados qndo forem submetido via metodo POST
app.use(express.urlencoded({ extended: true }));//habilita a biblioteta queryString 

app.use(session({

    secret: 'secret', //chave para acessar os dados
    resave: true, //salva a sessaõ a cada requisição HTTP
    saveUninitialized: true,
    cookie: { //tempo de vida da sessão
        maxAge: 1000 * 60 * 30 //30min
    }
}));

app.use(cookieParser());


/**
 * Todas as páginas que não precisam de lógica, estão dentro da pasta PUBLICO
 * Esses são HTML puros que servem apenas para renderizar as páginas simples
 * como: 
 * Login, página inicial, etc......
 */





app.post('/login', autenticarUsuario);
// app.get('/login', (requisicao, resposta) => {

//     resposta.redirect('/login.html');
// }
// )

app.get('/logout', (requisicao, resposta) => {

    requisicao.session.destroy();
    resposta.redirect('/login.html');
})

app.use(express.static(path.join(process.cwd(), 'publico')));

//permitir acesso ao conteudo da pasta protegidos
//verificar antes se o usuario esta autenticado

app.use(UsuarioEstaAutenticado, express.static(path.join(process.cwd(), 'protegidos')));

app.get("/adotar-pets", adotarPets);
app.post("/adotar-pets", realizarAdocao);


app.get("/lista-pet", PaginaListaPet);
app.post("/cadastro-pet", cadastroPet);


app.get("/lista-interessados", PaginalistaInteressados);
app.post("/cadastro-interessado", cadastroInteressado);


app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})