const _ = require('lodash');
const User = require('../user/user');

//Funcao middleware
function getSummary(req, res) {
    var imc;
    User.aggregate({
        //Precisa alterar para buscar um usuário e pegar o peso e altuar
        $project: { weight: {$sum: "$person.patient.weight"}, height: {$sum: "$person.patient.height"}}
    },{
        $group: {_id: null, weight: {$sum: "$weight"} , height: {$sum: "$height"}}
    },{
        $project: {weight: "$weight", height: "$height", imc: {$divide: ["$weight", {$multiply: ["$height","$height"]}]}}
    },{
        $project: {_id: 0, height: 1, weight: 1, imc: 1}
    }, function(error, result){
       if(error) {
           res.status(500).json({errors: [error]});
       } else {
           res.json(_.defaults(result[0], {height: 0, weight: 0, imc: 0}));
       }
    });
}

module.exports = { getSummary }