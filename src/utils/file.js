var fs = require('fs');

module.exports ={
    loadContacts: function(path, type = false) {//carrega os contatos do txt
        const contacts =  fs.readFileSync(path, 'utf8').split('\n');
        return contacts.map(contact => type ? contact.split(' ')[0] : contact.split(' '));
    },
    saveContact: function(path, data) {//salva os contatos no txt
        fs.appendFileSync(path, data);
    }
}