var xmlrpc = require('xmlrpc')
const { saveContact, loadContacts } = require('./utils/file');
 
var server = xmlrpc.createServer({ host: 'localhost', port: 9090 })

server.on('send', function (err, params) {
    const userName = params[0];
    const msg = params[1];
    console.log(`${userName}: ${msg}`)

    err && console.log(err) 
})

server.on('sendContacts', function (err, params) {
    var contacts= loadContacts("contacts.txt", "username");

    params.forEach(element => {
        if(!contacts.includes(element[0])){
            saveContact('contacts.txt', `${element[0]} ${element[1]}\n`);
            console.log(`${element[0]} foi adicionado em sua lista de contatos`);
        }
    })
})
console.log('Servidor rodando')
