
const xmlrpc = require('xmlrpc');
var readlineSync = require('readline-sync');

var client = xmlrpc.createClient("http://9783-177-131-164-62.ngrok.io")
var client2 = xmlrpc.createClient({ host: 'localhost', port: 9090 })

function sendMessage(userName) {
    var msg = readlineSync.question('#:');
    client2.methodCall('anAction', [userName, msg], function (error, value) {
    });
    
    client.methodCall('anAction', [userName, msg], function (error, value) {
    });

    setTimeout(function(){ // espera 0.5 segundo para enviar a proxima mensagem So assim que funciona
        sendMessage(userName);
    }, 500);
}

function Client() {
    var userName = readlineSync.question('Nome de usuario:');
    sendMessage(userName);    
}

Client()