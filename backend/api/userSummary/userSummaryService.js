const _ = require('lodash');
const User = require('../user/user');

function countUser(req, res) {
    User.count(function (error, value) {
        if (error) {
            res.status(500).json({ errors: [error] });
        } else {
            res.json({ value });
        }
    });
}

const findUserID = (req, res, next) => {

    const email = req.body.email || req.query.email || '';
    const emailRegex = /\S+@\S+\.\S+/;//validar o e-mail

    if (!email.match(emailRegex)) {
        return res.status(400).send({
            errors: ['O e-mail informado está inválido']
        })
    }
    User.findOne({ email }, (err, user) => {
        console.log('FindUserID');
        //console.log(user);
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (!user._id) {
//            console.log(user);
            return res.status(400).send({ errors: ['Falha na localização, contate um Administrador.'] })
        } else {
            console.log('FindOne: '+ user._id)
            req.user = user;
            return next();
        }
    });
}

module.exports = { countUser, findUserID }