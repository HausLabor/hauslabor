const _ = require('lodash');
const Person = require('./person');

const userID = 'users';

Person(userID).methods(['get', 'post', 'put', 'delete']);
Person(userID).updateOptions({new: true, runValidators: true});

Person(userID).after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

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

//Rota utilizada apenas pelo Administrador do Sistema, para contar todos os usuário cadastrados
Person(userID).route('count', function(req, res, next) {
    Person(userID).count(function(error, value) {
        if(error) {
            res.status(500).json({errors: [error]});
        }else{
            res.json({value});
        }
    });
});
// ==========================================================================================

module.exports = Person;