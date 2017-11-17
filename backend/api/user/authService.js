const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user');
const env = require('../../.env');

const mongoose = require('mongoose');
const conection = require('../../config/database');

const emailRegex = /\S+@\S+\.\S+/;//validar o e-mail
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/; //validar a senha

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({ errors });
}

const update = (req, res, next) =>{
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirm_password || '';
    const access = req.body.access || '';
    const lastacess = Date() || '';
    const status = true; //req.body.status || ''
    const completeUser = false;
    const privacyPolicy = req.body.privacyPolicy || false;

    if (!email.match(emailRegex)) {
        return res.status(400).send({
            errors: ['O e-mail informado está inválido']
        })
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."
            ]
        })
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash, lastacess, access, completeUser, status }) //incluir os demais campos de cadastro do usuário
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err);
                } else {
                    login(req, res, next);
                }
            });
        }
    });
}
const login = (req, res, next) => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    
    User.findOne({ email, 'status': true }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
                //expiresIn: "10 seconds"
            })
            const { _id, name, email, lastacess, completeUser, access } = user;
            res.json({ _id, name, email, completeUser, lastacess, access, token })
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || '';

    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err });
    });
}

const signup = (req, res, next) => {
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirm_password || '';
    const access = req.body.access || '';
    const lastacess = Date() || '';
    const status = true; //req.body.status || ''
    const completeUser = false;
    const privacyPolicy = req.body.privacyPolicy || '';

    if (!email.match(emailRegex)) {
        return res.status(400).send({
            errors: ['O e-mail informado está inválido']
        })
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."
            ]
        })
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash, lastacess, access, completeUser, status }) //incluir os demais campos de cadastro do usuário
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err);
                } else {
                    login(req, res, next);
                }
            });
        }
    });
}

module.exports = { login, signup, validateToken };