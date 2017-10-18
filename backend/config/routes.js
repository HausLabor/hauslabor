const express = require('express');

module.exports = function(server) {

    //API Routes
    const router = express.Router();
    server.use('/api', router);

    //routes of API
    const userService = require('../api/user/userService');
    userService.register(router, '/users');

    const userSummaryService = require('../api/userSummary/userSummaryService');
    router.route('/userSummary').get(userSummaryService.getSummary);
}
