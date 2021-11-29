var readlineSync = require('readline-sync');//pega os dados do usuario

const Message = {
    message(receiver, userName) {
        var msg = readlineSync.question('#:')//recebe a mensagem escrita
        Message.sendMessage(receiver, userName, msg);//chamando a função de enviar

        setTimeout(function(){ // espera 0.5 segundo para enviar a proxima mensagem
            Message.message(receiver, userName);//recursividade para poder mandar varias mensagens
        }, 500);
    },

    sendMessage(receiver, userName, msg) {//função para enviar
        receiver.forEach((client) => {
            client.methodCall('sendMessage', [userName, msg])
        })
    },    
}
module.exports = Message;
