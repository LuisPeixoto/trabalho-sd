const xmlrpc = require('xmlrpc');
var readlineSync = require('readline-sync');

var receiver = xmlrpc.createClient("http://9783-177-131-164-62.ngrok.io")
var myServer = xmlrpc.createClient({ host: 'localhost', port: 9090 })

function sendServer(userName, msg) {
    [receiver,myServer].forEach((client) => {
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
    var userName = readlineSync.question('Nome de usuario:');
    sendMessage(userName);    
}

Client()