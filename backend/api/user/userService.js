
const _ = require('lodash');
const User = require('./user');

User.methods(['get', 'post', 'put', 'delete']);
User.updateOptions({new: true, runValidators: true});

User.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

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
User.route('count', function(req, res, next) {
    User.count(function(error, value) {
        if(error) {
            res.status(500).json({errors: [error]});
        }else{
            res.json({value});
        }
    });
});
// ==========================================================================================

module.exports = User;