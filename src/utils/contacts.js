const xmlrpc = require('xmlrpc');
var readline = require('readline-sync');

module.exports = {
    receiverContact: function(receiver, contact) {//pega o contato escolhido e coloca como destinatario
        receiver.push(xmlrpc.createClient(contact[1]))
        return receiver
    },

    sendAllContacts: function(receiver, contacts) {//enviar contatos
        receiver.forEach((client) => {
            client.methodCall('sendContacts', contacts)
        })
    },

    selectContacts: function(contacts) {//mostra os contatos atual a serem escolhidos
        const input = readline.keyInSelect(contacts, 'Selecione um contato:')
        return input == -1 ? -1 : contacts[input]
    }
}