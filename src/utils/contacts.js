const xmlrpc = require('xmlrpc');
var readline = require('readline-sync');

module.exports = {
    receiverContact: function(receiver, contact) {
        receiver.push(xmlrpc.createClient(contact[1]))
        return receiver
    },

    sendAllContacts: function(receiver, contacts) {
        receiver.forEach((client) => {
            client.methodCall('sendContacts', contacts)
        })
    },

    selectContacts: function(contacts) {
        const input = readline.keyInSelect(contacts, 'Selecione um contato:')
        return input == -1 ? -1 : contacts[input]
    }
}