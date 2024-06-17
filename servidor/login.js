//função para verificar se o usuario esta autenticado

let usuarioAutenticado = false; //aplicação possui esse conteudo visivel para todos os seus usuarios

function UsuarioEstaAutenticado(requisicao, resposta, next) {

    if (requisicao.session.usuarioAutenticado) {

        next();//permitir que a requisição continue a ser processada

    }
    else {

        resposta.redirect('login.html');
    }

}

function autenticarUsuario(requisicao, resposta) {

    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

    console.log(requisicao.body.usuario);
    console.log(requisicao.body.senha);


    if (usuario == 'admin' && senha == '123') {

        //garantindo que o usuario esta autenticado com true
        requisicao.session.usuarioAutenticado = true;
        //lista nova de interessado
        requisicao.session.ListaInteressados = [];
        //lista nova de pet
        requisicao.session.listaPet = [];

        // lista nova de adocoes
        requisicao.session.listaAdocoes = []

        //registrar o acesso
        // requisicao.session.ultimoAcesso = new Date();

        resposta.cookie('dataUltimoAcesso', new Date().toLocaleString(), {

            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        });

        resposta.redirect('/');
    }
    else {

        resposta.write('<p>Usuario  ou senha invalida</p>');
        resposta.write('<a href="/login.html">Voltar </a>');

        resposta.end();
    }
}
export {

    autenticarUsuario,
    UsuarioEstaAutenticado


}


export default UsuarioEstaAutenticado