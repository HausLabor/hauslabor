const _ = require('lodash');
const Person = require('../person/person');

//######################### EXAMINATIONS #############################################

const getExamination = (req, res, next) =>{
    const userId = ''+req.user._id;
    Person(userId).find({ 'patient.examinations.status': true }, (err, person) => {
        if(err) {
            return sendErrorsOrNext
        }else if(!person){
            return res.json(person = {});
        }else {
            console.log(person)
            return res.json(person);
        }

    })
}
const createExaminations= (req, res, next) => {
    const userId = ''+req.user._id;
    const _id = req.body._id;
    const typeInput = 'MANUAL';
    const typeExam = req.body.typeExam;
    const description = req.body.description;
    const result = req.body.result;
    const lastActivity = req.body.lastActivity;
    const datehour = req.body.datehour;
    const observation = req.body.observation;
    const status = req.body.status;
    const notification = req.body.notification;

    const newExaminations = { typeInput, typeExam, description, result, lastActivity, datehour, observation, status, notification }

    Person(userId).update({ '_id': req.body.person_id }, { $push: { 'patient.examinations': newExaminations}}, function(err, result) {
        if(err){
            sendErrorsFromDB(res, err);
        } else {
            return res.status(200).json(newExaminations);
        }
    })
}

const updateExaminations= (req, res, next) => {
    const userId = ''+req.user._id;
    const _id = req.body._id;
    const typeInput = 'MANUAL';
    const typeExam = req.body.typeExam;
    const description = req.body.description;
    const result = req.body.result;
    const lastActivity = req.body.lastActivity;
    const datehour = req.body.datehour;
    const observation = req.body.observation;
    const status = req.body.status;
    const notification = req.body.notification;

    const newExaminations = { typeInput, typeExam, description, result, lastActivity, datehour, observation, status, notification }

    Person(userId).updateOne({'_id': req.body.person_id, 'patient.examinations._id': req.body._id }, { 'patient.examinations.$': [newExaminations]}, function(err, result) {
 
        if(err){
            sendErrorsFromDB(res, err);
        } else {
            return res.status(200).json(newExaminations);
        }
    })
}

const deleteExaminations= (req, res, next) => {
    const userId = ''+req.user._id;
    const _id = req.body._id;
    const typeInput = 'MANUAL';
    const typeExam = req.body.typeExam;
    const description = req.body.description;
    const result = req.body.result;
    const lastActivity = req.body.lastActivity;
    const datehour = req.body.datehour;
    const observation = req.body.observation;
    const status = false;
    const notification = req.body.notification;

    const newExaminations = { typeInput, typeExam, description, result, lastActivity, datehour, observation, status, notification }

    Person(userId).updateOne({'_id': req.body.person_id, 'patient.examinations._id': req.body._id }, { 'patient.examinations.$': [newExaminations]}, function(err, result) {
 
        if(err){
            sendErrorsFromDB(res, err);
        } else {
            return res.status(200).json(newExaminations);
        }
    })
}

//#############################################################################################################

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


module.exports = { getExamination, createExaminations, updateExaminations, deleteExaminations };