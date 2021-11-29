const xmlrpc = require('xmlrpc');//biblioteca que cria servidores RPC
const { loadContacts } = require('./utils/file');// carrega a lista de contatos
const { sendAllContacts, receiverContact, selectContacts } = require('./utils/contacts');//importando as funções do contacts
const { message } = require('./utils/message');
var readlineSync = require('readline-sync');

var contacts= loadContacts('contacts.txt');//carrega os contatos
const myServer = xmlrpc.createClient({ host: 'localhost', port: 9090 })//enviamos as mensagens pro nosso proprio servidor para conseguir ver a conversa completa
var receiver = [myServer]

function Client() {
    const options = [
        ["Enviar mensagens para lista de contatos"], ["Enviar lista de contatos"]//opções do que fazer
    ]
    
    const selectedOption = readlineSync.keyInSelect(options, 'Selecione uma opcao:');//opção selecionada
    if (selectedOption == -1) return;

    const selectedContact = selectContacts(contacts)//contato selecionado
    if (selectedContact == -1) return;
 
    receiver = receiverContact(receiver, selectedContact)//destinatario
    
    if(selectedOption == 0) {//opção de enviar mensagem
        var userName = readlineSync.question('Nome de usuario:');//pergunta o nome do usuario
        message(receiver, userName);
    } else {
        sendAllContacts(receiver, contacts)//opção de enviar os contatos
    }  
}

Client()