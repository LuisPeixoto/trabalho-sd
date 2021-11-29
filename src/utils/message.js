var readlineSync = require('readline-sync');

const Message = {
    message(receiver, userName) {
        var msg = readlineSync.question('#:')
        Message.sendMessage(receiver, userName, msg);

        setTimeout(function(){ // espera 0.5 segundo para enviar a proxima mensagem
            Message.message(receiver, userName);
        }, 500);
    },

    sendMessage(receiver, userName, msg) {
        receiver.forEach((client) => {
            client.methodCall('sendMessage', [userName, msg])
        })
    },    
}
module.exports = Message;
