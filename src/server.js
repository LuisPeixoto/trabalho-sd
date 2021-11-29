var xmlrpc = require('xmlrpc')//biblioteca que cria servidores RPC
const { saveContact, loadContacts } = require('./utils/file');//importa as funções de salvar nos arquivos
 
var server = xmlrpc.createServer({ host: 'localhost', port: 9090 })//criando o servidor

server.on('sendMessage', function (err, params) {//função que recebe as mensagens e mostra na tela
    const userName = params[0];
    const msg = params[1];
    console.log(`${userName}: ${msg}`)

    err && console.log(err) 
})

server.on('sendContacts', function (err, params) {//função para enviar minha lista de contatos para outras pessoas
    var contacts= loadContacts("contacts.txt", "username");//pega os contatos da lista 

    params.forEach(element => {
        if(!contacts.includes(element[0])){//verificar se o contato já existe
            saveContact('contacts.txt', `${element[0]} ${element[1]}\n`);//se não existe, salvar o contato
            console.log(`${element[0]} foi adicionado em sua lista de contatos`);
        }
    })
})
console.log('Servidor rodando')
