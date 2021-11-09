var xmlrpc = require('xmlrpc')
 
var server = xmlrpc.createServer({ host: 'localhost', port: 9090 })

server.on('anAction', function (err, params, callback) {
    const userName = params[0]; 
    const msg = params[1];
    console.log(`${userName}: ${msg}`)

    callback(null, 'aResult')
})
console.log('XML-RPC server listening on port 9091')
