const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//const db_passwd = '1234';
//const db_user = 'root';
//const db_port = '27017';
const db_local = 'localhost';
const db_name = 'db_hauslabor';

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : `mongodb://${db_local}/${db_name}`;
//const url = `mongodb://${db_local}/${db_name}`;
module.exports = mongoose.connect(url, {useMongoClient: true});
//module.exports = mongoose.connect(`mongodb://${db_user}:${db_passwd}@localhost:${db_port}/db_hauslabor`);

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."
