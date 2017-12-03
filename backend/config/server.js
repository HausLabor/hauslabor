/**
 * Hauslabor - Backend
 * 
 * Module Server, inicia o backend e configura a porta que ficará escutando
 * 
 */
// Port do server backend
const port = 3003
// Importando as dependencias
const bodyParser = require('body-parser'); //middleware parser da requisição
const express = require('express');
const server = express();
const allowCors = require('./cors');
const queryParser = require('express-query-int');

//Middleware Parser
server.use(bodyParser.urlencoded({ extended: true})); //Parser do body
server.use(bodyParser.json()); //Parser do json
server.use(allowCors);
server.use(queryParser());

server.listen(port, function() {
    console.log(`Backend is running on port ${port}.`);

    //***Verificar se foi setado corretamente a variavel de ambiente***
    //console.log(process.env.AUTH_SECRET); 
    //console.log(process.env.MONGOLAB_URI);
});

module.exports = server;