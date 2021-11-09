const xmlrpc = require('xmlrpc');
var readlineSync = require('readline-sync');
var client = xmlrpc.createClient({ host: 'localhost', port: 9090, path: '/'})

function sendMessage(userName) {
    var msg = readlineSync.question('#:');
    client.methodCall('anAction', [userName, msg], function (error, value) {
    });

    setTimeout(function(){ // espera 0.5 segundo para enviar a proxima mensagem So assim que funciona
        sendMessage(userName);
    }, 500);
}

async function Client() {
    var userName = readlineSync.question('Nome de usuario:');
    sendMessage(userName);    
}

Client()