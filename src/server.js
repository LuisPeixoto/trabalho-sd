var xmlrpc = require('xmlrpc')
var fs = require('fs')
 
var server = xmlrpc.createServer({ host: 'localhost', port: 9090 })

var contactsFile= fs.readFileSync('contacts.txt', 'utf8').split('\n');

server.on('send', function (err, params) {
    const userName = params[0];
    const msg = params[1];
    console.log(`${userName}: ${msg}`)

    err && console.log(err) 
})

server.on('sendContacts', function (err, params) {
    const userName = []
    const userNameFile = []
    const url = []
    params.forEach(contact => {
        userName.push(contact[0])
        userNameFile.push(contact[0])
    })

    const diference = userName.filter(contact => !userNameFile.includes(contact))

    diference.forEach(contactuser => {
        params.forEach(contact => {
            if (contact[0] === contactuser) {
                url.push(contact[1])
            }
        })
    })

    console.log(`${diference}: ${url}`)



    
})
console.log('Servidor rodando')
