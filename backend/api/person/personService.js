
const _ = require('lodash');
const Person = require('./person');

//const userID = '';

/*User.route('partient', {
    detail:true,
    handler: function(req, res, next){
        userID = UserSummary.findUserID(req.params.id['']);
        console.log(req.params.id);
        console.log(userID);
        next();
    }
})
*/
//Person(userID).methods(['get', 'post', 'put', 'delete']);
//Person(userID).updateOptions({new: true, runValidators: true});
//Person(userID).after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

const getPerson = (req, res, next) =>{
    const userId = req.user._id.toString();
    Person(userId).findOne({ 'status': true }, (err, person) => {
        if(err) {
            return sendErrorsOrNext
        }else if(!person){
            return res.json(person = {});
        }else {
            return res.json(person);
        }

    })
}

const postPerson = (req, res, next) =>{
    const userId = req.user._id.toString();
    const type = req.body.type || '';
    const name = req.body.name || '';
    const dtnasc = req.body.dtnasc || '';
    const sex = req.body.sex || '';
    const birthplace = req.body.birthplace || '';
    const contacts = req.body.contacts || [];
    const documents = req.body.documents || {};
    const addresses = req.body.addresses || [];
    const patient = req.body.patient || {};
    const status = true; 
    patient.status = req.body.patient.status || '';
    documents.status = true;
    

    const newPerson = { type, name, dtnasc, sex, birthplace, contacts: contacts, documents, addresses, patient, status};

    Person(userId).create(newPerson, (err, result) => {
        if(err){ 
            console.log(err)
            return sendErrorsFromDB(res, err);
        }else{   
            console.log('saved to database');
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
    const patient = req.body.patient || {};
    const status = req.body.status || '';

    const newPerson = { type, name, dtnasc, sex, birthplace, contacts, documents, addresses, patient, status};

    console.log('UpdatePerson: '+ id)
    //console.log(person)
    
    Person(userId).findById(id, function(err, person) {
        if(err){
            console.log('Error updating person: '+ err);
            sendErrorsFromDB(null, err);
        } else {
            person = newPerson;
        }
        Person(userId).update({'_id': id },person, {multi: true},function(err, result) {
            if(err){
                console.log('Error updating person: '+ err);
                sendErrorsFromDB(null, err);
            }else{
                return res.status(200).json(person);
            }
        })
    })
}

const deletePerson = (req, res, next) =>{
    const userId = '' + req.user._id;
    Person(userId).findOne({ 'status': true }, (err, person) => {
        if(err) return sendErrorsOrNext;
        res.json(person);
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


module.exports = {getPerson, postPerson, updatePerson};