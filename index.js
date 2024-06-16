import express from 'express';
//path deixa pasta de arquivo publico
import path from 'path';

const host = '0.0.0.0';
const porta = 3000;

/**
 * Importa a função PaginaListaPet do arquivo que está na pasta servidor.
 */
import { cadastroPet, PaginaListaPet } from './servidor/lista-pet.js';



import PaginalistaInteressados, { cadastroInteressado } from './servidor/lista-interessados.js';







const app = express();
//configurar o express para manipular corretamente os dados qndo forem submetido via metodo POST
app.use(express.urlencoded({ extended: true }));//habilita a biblioteta queryString 


/**
 * Todas as páginas que não precisam de lógica, estão dentro da pasta PUBLICO
 * Esses são HTML puros que servem apenas para renderizar as páginas simples
 * como: 
 * Login, página inicial, etc......
 */
app.use(express.static(path.join(process.cwd(), 'publico')));


app.get("/lista-pet", PaginaListaPet);
app.post("/cadastro-pet", cadastroPet);


app.get("/lista-interessados", PaginalistaInteressados);
app.post("/cadastro-interessado", cadastroInteressado);




app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})