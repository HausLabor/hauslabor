const express = require('express');
const auth = require('./auth');

const userID = 'users';

module.exports = function(server) {

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /*
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router();
    server.use('/api', protectedApi);
    
    protectedApi.use(auth)
    
    //Routes of API
    const personService = require('../api/person/personService');
    personService(userID).register(protectedApi, '/person');
    
    const userSummaryService = require('../api/userSummary/userSummaryService');
    protectedApi.route('/userSummary').get(userSummaryService.getSummary);
}
