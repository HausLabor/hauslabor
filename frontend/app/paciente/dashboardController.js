(function(){
    angular.module('hauslabor').controller('DashboardCtrl', [
        '$http',
        DashboardController
    ])
    
    function DashboardController($http) {
        
        var vm = this;
        
        vm.getSummary = function() {
            const url = 'http://localhost:3003/api/userSummary';
            $http.get(url).then(function(response) {
                const {weight = 0, height = 0, imc = 0} = response.data;
                vm.weight = weight;
                vm.height = height;
                vm.imc = (weight / (height * height));   
            })
        }
        
        vm.getSummary();
    }
})();