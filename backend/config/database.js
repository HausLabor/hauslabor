const mongoose = require('mongoose');

//const db_passwd = '1234';
//const db_user = 'root';
//const db_port = '27017';

module.exports = mongoose.connect('mongodb://localhost/db_hauslabor', 
{useMongoClient: true});
//module.exports = mongoose.connect(`mongodb://${db_user}:${db_passwd}@localhost:${db_port}/db_hauslabor`);

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."
