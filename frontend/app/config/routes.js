angular.module('hauslabor').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider.state('dashboardPaciente', {
            url: "/dashboardPaciente",
            templateUrl:"paciente/dashboard.html"
        }).state('dashboardEspecialista', {
            url:"/dashboardEspecialista",
            templateUrl: "especialista/dashboard.html"
        }).state('exames', {
            url:"/exames",
            templateUrl:"exames/exames.html"
        })
        $urlRouterProvider.otherwise('/dashboardPaciente')
    }
]);