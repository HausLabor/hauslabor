/**
 * Hauslabor - Backend
 * 
 * Module responsável por carregar o server, database e routes.
 * 
 */
const server = require('./config/server');
require('./config/database');
require('./config/routes')(server);