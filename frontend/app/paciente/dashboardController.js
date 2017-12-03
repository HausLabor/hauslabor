/**
 * Hauslabor - Frontend
 * 
 * Module Dashboard Controlle responsável controle do dashobard
 * 
 */
(function(){
    angular.module('hauslabor').controller('DashboardCtrl', [
        '$http',
        'auth',
        DashboardController
    ])
    
    function DashboardController($http, auth) {

        var vm = this;
        const user = auth.getUser();

        //Coleta os dados do Paciente e grava no scope
        vm.getSummary = function() {
            const url = 'http://localhost:3003/api/personSummary';
            $http.get(`${url}?email=${user.email}`).then(function(response) {
                const {weight = 0, height = 0, imc = 0} = response.data;
                vm.weight = weight;
                vm.height = height;
                vm.imc = (weight / (height * height));   
            })
        }
        
        vm.getSummary();
    }
})();