const express = require('express');

module.exports = function(server) {

    //API Routes
    const router = express.Router();
    server.use('/api', router);

    //Login
    const authService = require('');
    authService.register(router, '/auth');

    //AuthUser
    const authUserService = require('../api/user/authUserService');
    userService.register(router, '/authUsers');

    //Coletar o UserID
    const userService = require('../api/user/userService');
    userService.register(router, '/users/:userID');

    const userSummaryService = require('../api/userSummary/userSummaryService');
    router.route('/userSummary').get(userSummaryService.getSummary);
}
