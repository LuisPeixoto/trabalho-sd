const xmlrpc = require('xmlrpc');
var readlineSync = require('readline-sync');
const fs = require('fs');

var contactsFile= fs.readFileSync('contacts.txt', 'utf8').split('\n');
var contacts= contactsFile.map(contact => contact.split(' '));

var myServer = xmlrpc.createClient({ host: 'localhost', port: 9090 })

var receiver = [myServer]

function receiverContact (contact) {
    receiver.push(xmlrpc.createClient(contact[1]))
}

function sendServer(userName, msg) {
    receiver.forEach((client) => {
        client.methodCall('send', [userName, msg])
    })
}

function sendMessage(userName) {
    var msg = readlineSync.question('#:');
    sendServer(userName, msg);
    
    setTimeout(function(){ // espera 0.5 segundo para enviar a proxima mensagem So assim que funciona
        sendMessage(userName);
    }, 500);
}

function sendContacts() {
    receiver.forEach((client) => {
        client.methodCall('sendContacts', contacts)
    })
}

function Client() {

    const options = [["Enviar mensagens para lista de contatos"], ["Enviar lista de contatos"]]
    
    var OptionsSelected = readlineSync.keyInSelect(options, 'Selecione uma opcao:');
    var inputSelected = readlineSync.keyInSelect(contacts, 'Selecione um contato:');
    var selectedContact = contacts[inputSelected];

    if(OptionsSelected == 0) {
        if (inputSelected !== -1) {
            var userName = readlineSync.question('Nome de usuario:');
            receiverContact(selectedContact)
            sendMessage(userName);
        }
    } else {
        receiverContact(selectedContact)
        sendContacts()
    }

    

}

Client()