/**
 * Hauslabor - Backend
 * 
 * Module responsável por atender as requisições externas e direcionar para o banco
 * 
 */
const _ = require('lodash');
const db = require('../../config/database');
const Person = require('./person');
const userSummaryService = require('../userSummary/userSummaryService');

//#############################################################################################################

const getPerson = (req, res, next) =>{
    const userId = req.user._id.toString();
    Person(userId).findOne({ 'status': true }, (err, person) => {
        if(err) {
            return sendErrorsOrNext
        }else if(!person){
            return res.json(person = {});
        }else {
            //console.log('Passou em getPerson')
            return res.json(person);
        }

    })
}

const createPerson = (req, res, next) =>{
    const userId = req.user._id.toString();
    const type = req.body.type || '';
    const name = req.body.name || '';
    const dtnasc = req.body.dtnasc || '';
    const sex = req.body.sex || '';
    const birthplace = req.body.birthplace || '';
    const contacts = req.body.contacts || [];
    const documents = req.body.documents || {};
    const addresses = req.body.addresses || [];
    const status = true; 
    documents.status = true;
    let newPerson = {};

    if(type == 'PACIENTE'){
        const patient = req.body.patient || {};
        patient.status = req.body.patient.status || '';
        newPerson = { type, name, dtnasc, sex, birthplace, contacts, documents, addresses, patient, status};
    }else{
        newPerson = { type, name, dtnasc, sex, birthplace, contacts, documents, addresses, status};
    }
    
    Person(userId).create(newPerson, (err, result) => {
        if(err){ 
            console.log(err)
            return sendErrorsFromDB(res, err);
        }else{   
            console.log('Saved to database');
            return res.status(200).json(result);
        }
    })
}

const updatePerson = (req, res, next) =>{
    const userId = req.user._id.toString();
    const id = req.params.id;
    const type = req.body.type || '';
    const name = req.body.name || '';
    const dtnasc = req.body.dtnasc || '';
    const sex = req.body.sex || '';
    const birthplace = req.body.birthplace || '';
    const contacts = req.body.contacts || [];
    const documents = req.body.documents || {};
    const addresses = req.body.addresses || [];
    const status = req.body.status || '';
    let newPerson = {};
    
    if(type == 'PACIENTE'){
        const patient = req.body.patient || {};
        patient.status = req.body.patient.status || '';
        newPerson = { type, name, dtnasc, sex, birthplace, contacts, documents, addresses, patient, status};
    }else{
        newPerson = { type, name, dtnasc, sex, birthplace, contacts, documents, addresses, status};
    }

    console.log('UpdatePerson: '+ id)
    console.log(newPerson)    
    Person(userId).findById(id, function(err, person) {
        if(err){
            console.log('Error updating person: '+ err);
            sendErrorsFromDB(null, err);
        } else {
            Person(userId).update({'_id': id },newPerson, {multi: true},function(err, result) {
                if(err){
                    console.log('Error updating person: '+ err);
                    sendErrorsFromDB(null, err);
                }else{
                    return res.status(200).json(newPerson);
                }
            })
        }
    })
}

const deletePerson = (req, res, next) =>{
    const userId = '' + req.user._id;

    db.dropCollection(userId, function(err, result) {
        if(err) return sendErrorsOrNext();
        res.status(200).json(result);
    });
}

//#############################################################################################################
//Funções responsável em padronizar os retornos do banco e erros
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({ errors });
}

function sendErrorsOrNext(req, res, next){
    const bundle = res.locals.bundle;

    if(bundle.errors) {
        var errors = parseErrors(bundle.errors);

        res.status(500).json({errors});
    } else {
        next();
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = [];
    _.forIn(nodeRestfulErrors, error => errors.push(error.message));
    return errors;
}

module.exports = { getPerson, createPerson, updatePerson, deletePerson };