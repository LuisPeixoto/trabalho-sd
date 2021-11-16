var xmlrpc = require('xmlrpc')
 
var server = xmlrpc.createServer({ host: 'localhost', port: 9090 })

server.on('send', function (err, params) {
    const userName = params[0]; 
    const msg = params[1];
    console.log(`${userName}: ${msg}`)

    err && console.log(err) 
})
console.log('Servidor rodando')
