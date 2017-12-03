/**
 * Hauslabor - Backend
 * 
 * Module responsável por atender as requisições externas e direcionar para o banco
 * 
 */
const _ = require('lodash');
const User = require('../user/user');

//CRUD construido com o RESTFUL
User.methods(['get', 'post', 'put', 'delete']);
User.updateOptions({new: true, runValidators: true});
User.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

//Funcões responsávei por padronizar as mensagens de erro
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

module.exports = User;