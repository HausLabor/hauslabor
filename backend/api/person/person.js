/**
 * Hauslabor - Backend
 * 
 * Module responsável por padronizar a estrutura das collections e seus documentos
 * 
 */
const restful = require('node-restful');
const mongoose = restful.mongoose; //Mapeamento da API REST

//------- Estrutura de Contatos
const contactsSchema = new mongoose.Schema({
    type: { type: String, required: [true, 'Informe o tipo do contato!'], 
        uppercase: true, enum: ['EMERGENCIA', 'CELULAR', 'FIXO'] },
    contact: { type: String, required: [true, 'Informe o contato!'] },
    status: { type: Boolean, required: [true, 'Informe o Status do Contato!']}
});
//------- Contatos
//------- EStrutura de Documentos
const docspecialistSchema = new mongoose.Schema({
    type: { type: String, required: [true, 'Informe o tipo do documento!'], uppercase: true, enum: ['CRBM', 'CRM','CR.'] },
    registration: { type: String, required: [true, 'Informe o documento!'] },
    specialist: { type: String, required: [true, 'Informe a especialidade!'] }
});

const documentsSchema = new mongoose.Schema({
    rg: { type: String, required: false },
    cpf: { type: String, required: [true, 'Informe o CPF!'] },
    docSpecialist: [docspecialistSchema],
    status: { type: Boolean, required: [false, 'Informe o Status da Documento!']}
});
//------- Documentos
//------- Estrutura de Endereços
const addressesSchema = new mongoose.Schema({
    number: { type: String, required: [false, 'Informe o número do endereço!'] },
    city: { type: String, required: false },
    zipcode: { type: String, required: [false, 'Informe o CEP!'] },
    status: { type: Boolean, required: [true, 'Informe o Status do Endereço!']}
});
//------- Endereços
//------- Estrutura de Doenças
const illnessSchema = new mongoose.Schema({
    type: { type: String, required: [false, 'Informe o tipo da doença!'], 
        uppercase: true, enum: ['AUTOIMUNE', 'CARDIACA', 'HEPATICA', 'PSIQUICA', 'RESPIRATÓRIA', 'VIRAL', 'OUTROS'] },
    description: { type: String, required: [false, 'Informe o nome da doença!'] },
    observation: { type: String, required: false },
    status: { type: Boolean, required: [true, 'Informe o Status da Doença!']}
});
//------- Doenças
//------- Estrutura de Cirurgias
const surgerySchema = new mongoose.Schema({
    type: { type: String, required: [false, 'Informe o tipo da cirurgia!'], 
        uppercase: true, enum: ['BUCOMAXILOFACIAL', 'NEUROLÓGICA', 'OFTALMOLÓGICA', 'CARDÍACA', 'VASCULAR', 'ORTOPÉDICA', 'OBSTÉTRICA', 'ONCOLÓGICA', 'PLÁSTICA', 'RECONSTRUTIVA', 'ESTÉTICA', 'ROBÓTICA', 'OUTROS'] },
    description: { type: String, required: [false, 'Informe o nome da cirurgia!'] },
    observation: { type: String, required: false },
    status: { type: Boolean, required: [true, 'Informe o Status da Cirurgia!']}
});
//------- Cirurgias
//------- Estrutura de Vicios
const addictionSchema = new mongoose.Schema({
    type: { type: String, required: [false, 'Informe o tipo do vício!'], 
        uppercase: true, enum: ['ÁLCOOL', 'JOGO', 'NARCÓTICO', 'COMPORTAMENTAL', 'OUTROS'] },
    description: { type: String, required: [false, 'Informe o nome vício!'] },
    observation: { type: String, required: false },
    status: { type: Boolean, required: [true, 'Informe o Status do Vício!']}
});
//------- Vicios
//------- Estrutura de Medicamentos
const drugSchema = new mongoose.Schema({
    type: { type: String, required: [false, 'Informe o tipo do medicamento!'], 
        uppercase: true, enum: ['FITOTERÁPICO', 'ALOPÁTICO', 'HOMEOPÁTICO', 'SIMILAR', 'GENÉRICO', 'OUTROS'] },
    description: { type: String, required: [false, 'Informe o nome do medicamento!'] },
    observation: { type: String, required: false },
    othen: { type: String, required: [false, 'Informe a frequência do medicamento!'] },
    status: { type: Boolean, required: [true, 'Informe o Status do Medicamento!']}
});
//------ Medicamentos
//------ Estrutura de Atividades Fisica
const physicalactivitySchema = new mongoose.Schema({
    type: { type: String, required: true, uppercase: [false, 'Informe o tipo da Atividade Física!'], 
        enum: ['AERÓBICO', 'ANAERÓBICO', 'ALONGAMENTO', 'OUTROS'] },
    description: { type: String, required: [false, 'Informe o nome da Atividade Física!'] },
    observation: { type: String, required: false },
    othen: { type: String, required: [false, 'Informe a frequencia da Atividade Física!'] },
    status: { type: Boolean, required: [true, 'Informe o Status da Atv. Fisica!']}
});
//------ Atividade Fisica
//------ Estrutura de Notificações
const notificationSchema = new mongoose.Schema({
    type: { type: String, uppercase: true, required: [true, 'Informe o tipo da Notificação!'], 
        enum: ['PACIENTE', 'ESPECIALISTA', 'HARDWARE', 'ADMIN'] },
    name: { type: String, required: true, uppercase: true},
    description: { type: String, required: [true, 'Informe a Notificação!'] },
    status: { type: Boolean, required: [true, 'Informe o Status da Notificação!']}
});
//------ Notificações
//------ Estrutura de Exames
const examinationSchema = new mongoose.Schema({
    typeInput: { type: String, required: [true, 'Informe o tipo do Exame!'], 
        uppercase: true, enum: ['AUTOMATICO', 'MANUAL'] },
    typeExam: { type: String, required: true },
    description: { type: String, required: [true, 'Informe o Exame!'] },
    result: { type: String, required: [true, 'Informe o resultado do Exame!'] },
    lastActivity: { type: String, required: [true, 'Informe a ultima Atividade!'] },
    datehour: { type: Date, required: [true, 'Informe a Data/Hora do Exame!'] },
    observation: { type: String, required: false },
    notification: [notificationSchema],
    status: { type: Boolean, required: [true, 'Informe o Status da Exame!']}
});
//------ Exames
//------- Estrutura principal de Pacientes
const patientSchema = new mongoose.Schema({
    weight: { type: Number, required: [true, 'Informe o Peso!'] },
    height: { type: Number, required: [true, 'Informe a Altura!'] },
    profession: { type: String, required: [true, 'Informe a Profissão!'] },
    illnesses: [illnessSchema],
    surgeries: [surgerySchema],
    addictions: [addictionSchema],
    drugs: [drugSchema],
    physicalactivities: [physicalactivitySchema],
    examinations: [examinationSchema],
    notifications: [notificationSchema],
    status: { type: Boolean, required: [true, 'Informe o Status do Paciente!']}
});
//------- Pacientes
// Estrutura principal da Pessoa
const personSchema = new mongoose.Schema({
    type: { type: String, required: [true, 'Informe o tipo do Paciente!'], 
        uppercase: true, enum: ['PACIENTE', 'ESPECIALISTA', 'HARDWARE', 'ADMINISTRADOR'] },
    name: { type: String, required: [true, 'Informe o Name da Pessoa!'] },
    dtnasc: { type: Date, required: [true, 'Informe a Data de Nascimento!'] },
    sex: { type: String, required: [true, 'Informe o Sexo!'], 
        uppercase: true, enum: ['MASCULINO', 'FEMININO'] },
    birthplace: { type: String, required: [true, 'Informe a Nacionalidade!'], upercase: true },
    contacts: [contactsSchema],
    documents: documentsSchema,
    addresses: [addressesSchema],
    patient: patientSchema,
    //ref: { type: String, required: [true, 'Informe o Sexo!']},
    status: { type: Boolean, required: [true, 'Informe o Status da Pessoa!']}
});
//------- Pessoa

//Recebe UserID para que seja criado ou buscadno na collection correta do usuário, pois cada usuário tem a sua collection especifica
module.exports = function(userID) {
    return restful.model('Person', personSchema, String(userID));
}