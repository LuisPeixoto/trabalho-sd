const xmlrpc = require('xmlrpc');
const { loadContacts } = require('./utils/file');
const { sendAllContacts, receiverContact, selectContacts } = require('./utils/contacts');
const { message } = require('./utils/message');
var readlineSync = require('readline-sync');

var contacts= loadContacts('contacts.txt');
const myServer = xmlrpc.createClient({ host: 'localhost', port: 9090 })
var receiver = [myServer]

function Client() {
    const options = [
        ["Enviar mensagens para lista de contatos"], ["Enviar lista de contatos"]
    ]
    
    const selectedOption = readlineSync.keyInSelect(options, 'Selecione uma opcao:');
    if (selectedOption == -1) return;

    const selectedContact = selectContacts(contacts)
    if (selectedContact == -1) return;
 
    receiver = receiverContact(receiver, selectedContact)
    
    if(selectedOption == 0) {
        var userName = readlineSync.question('Nome de usuario:');
        message(receiver, userName);
    } else {
        sendAllContacts(receiver, contacts)
    }  
}

Client()