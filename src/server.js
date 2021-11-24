var xmlrpc = require('xmlrpc')
var fs = require('fs')
 
var server = xmlrpc.createServer({ host: 'localhost', port: 9090 })

server.on('send', function (err, params) {
    const userName = params[0];
    const msg = params[1];
    console.log(`${userName}: ${msg}`)

    err && console.log(err) 
})

server.on('sendContacts', function (err, params) {
    var contactsFile= fs.readFileSync('contacts.txt', 'utf8').split('\n');
    var contacts= contactsFile.map(contact => contact.split(' ')[0]);
    
    params.forEach(element => {
        if(!contacts.includes(element[0])){
            fs.appendFileSync('contacts.txt', `${element[0]} ${element[1]}\n`);
            console.log(`${element[0]} foi adicionado em sua lista de contatos`);
        }
    })
})
console.log('Servidor rodando')
