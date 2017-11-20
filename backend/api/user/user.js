const restful = require('node-restful');
const mongoose = restful.mongoose; //Mapeamento da API REST

//------- Estrutura de Observador
/*const watcherSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: { type: String, required: true},
    tokenID: { type: String, required: true },
    status: { type: Boolean, required: true}
});*/
//------- Observador
//------- Estrutura de Usuários
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o Nome do Usuário!'] },
    password: { type: String, min: 6, max: 12, required: [true, 'Informe a Senha do Usuário!']},
    email: { type: String, required: true }, //Login GMail
    access: { type: String, required: [true, 'Informe o tipo de acesso!'], uppercase: true, enum: ['PACIENTE', 'ESPECIALISTA', 'HARDWARE', 'ADMINISTRADOR'] }, //Type 1 - PACIENTE / 2 - ESPECIALISTA / 3 - HARDWARE / 4 - ADMINISTRADOR 
    lastacess: { type: Date, require: true},
    completeUser: { type: Boolean, require: true},
    privacyPolicy: { type: Boolean, require: [true, 'Informe se está de acordo com a Politica de Privacidade'] }, //Privacy Policy
    //watchers: [watcherSchema],
    status: { type: Boolean, required: [false, 'Informe o status do Usuário!']} //Status True or False
});
//------- Usuários

module.exports = restful.model('User', userSchema);