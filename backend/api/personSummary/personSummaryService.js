/**
 * Hauslabor - Backend
 * 
 * Module responsável por atender as requisições externas e direcionar para o banco
 * 
 */
const _ = require('lodash');
const Person = require('../person/person');

//Função middleware coleta a altura, peso e calcula o IMC, retorna uma resposta com json
function getSummary(req, res) {
    const userId = '' + req.user._id;
    
    Person(userId).aggregate({
        $match: { status: true }
    }, {
            $project: { weight: "$patient.weight", height: "$patient.height" }
        }, {
            $project: { weight: "$weight", height: "$height", imc: { $divide: ["$weight", { $multiply: ["$height", "$height"] }] } }
        }, {
            $project: { _id: 0, height: 1, weight: 1, imc: 1 }
        }, function (error, result) {
            if (error) {
                res.status(500).json({ errors: [error] });
            } else {
                res.json(_.defaults(result[0], { height: 0, weight: 0, imc: 0 }));
            }
        });
}
//Retornar um json com os exames já cadastrados
function getExaminations(req, res) {
    const userId = '' + req.user._id;

    Person(userId).aggregate({
        $match: { status: true }
    }, {
            $project: { examinations: "$patient.examinations" }
        },{
            $project: { _id: 0, examinations: 1 }
        }, function (error, result) {
            if (error) {
                res.status(500).json({ errors: [error] });
            } else {
                console.log(result[0]);
                res.json(_.defaults(result[0], { examinations: null }));
            }
        });
}

//Conta a quantidade de Exames a pessoa já cadastrou - utilizado na paginação
function countExaminations(req, res) {
    const userId = '' + req.user._id;

    Person(userId).aggregate({
        $match: { status: true }
    }, {
            $project: { count: { $size: "$patient.examinations"} }
        },{
            $project: { _id: 0, count: 1 }
        }, function (error, result) {
            if (error) {
                res.status(500).json({ errors: [error] });
            } else {
                res.json(_.defaults(result[0], { count: 0 }));
            }
        });
}
module.exports = { getSummary, getExaminations, countExaminations }