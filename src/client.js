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

function Client() {

    const options = [["send", "Enviar mensagens para lista de contatos"], ["sendContacts", "Enviar lista de contatos"]]
    
    var OptionsSelected = readlineSync.keyInSelect(options, 'Selecione uma opcao:');

    if(OptionsSelected == 0) {
    var inputSelected = readlineSync.keyInSelect(contacts, 'Selecione um contato:');
    var selectedContact = contacts[inputSelected];
    
        if (inputSelected !== -1) {
            var userName = readlineSync.question('Nome de usuario:');
            receiverContact(selectedContact)
            sendMessage(userName);
        }
    } else {
        myServer.methodCall('sendContacts', contacts);
    }

    

}

Client()