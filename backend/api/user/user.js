const restful = require('node-restful');
const mongoose = restful.mongoose; //Mapeamento da API REST

//------- Estrutura de Observador
const watcherSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: { type: String, required: true},
    tokenID: { type: String, required: true },
    status: { type: Boolean, required: true}
});
//------- Observador
//------- Estrutura de Usuários
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o Nome do Usuário!'] },
    password: { type: String, min: 6, max: 12, required: [true, 'Informe a Senha do Usuário!']},
    login: { type: String, required: false }, //Login GMail
    access: { type: Number, min: 1, max: 4, required: [true, 'Informe o nivel de acesso do Usuário!']}, //Type 1 - PACIENTE / 2 - ESPECIALISTA / 3 - HARDWARE / 4 - ADMINISTRADOR 
    tokenID: { type: String, required: true},
    watchers: [watcherSchema],
    status: { type: Boolean, required: [true, 'Informe o status do Usuário!']} //Status True or False
});
//------- Usuários

module.exports = restful.model('User', userSchema);