/**
 * Hauslabor - Frontend
 * 
 * Module responsável pelas rotas do fontend
 * 
 */
    angular.module('hauslabor').config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $stateProvider.state('dashboardPaciente', {
                url: "/dashboardPaciente",
                templateUrl: "paciente/dashboard.html"
            }).state('dashboardEspecialista', {
                url: "/dashboardEspecialista",
                templateUrl: "especialista/dashboard.html"
            }).state('exames', {
                url: "/exames",
                templateUrl: "exames/exames.html"
            }).state('person', {
                url: "/person?page",
                templateUrl: "person/person.html"
            })
            //$urlRouterProvider.otherwise('/dashboardPaciente')
            $httpProvider.interceptors.push('handleResponseError');
        }
    ])
    .run([
        '$rootScope',
        '$http',
        '$location',
        '$window',
        'auth',
        function ($rootScope, $http, $location, $window, auth) {
            validateUser()
            $rootScope.$on('$locationChangeStart', () => validateUser())
            function validateUser() {
                
                const user = auth.getUser()
                const authPage = '/auth.html'
                const isAuthPage = $window.location.href.includes(authPage)
                
                if (!user && !isAuthPage) {
                    $window.location.href = authPage
                } else if (user && !user.isValid) {
                    auth.validateToken(user.token, (err, valid) => {
                        if (!valid) {
                            $window.location.href = authPage
                        } else {
                            user.isValid = true
                            $http.defaults.headers.common.Authorization = user.token
                            
                            if (user.completeUser == true) {
                                console.log(user)
                                if(user.access == 'PACIENTE'){
                                    isAuthPage ? $window.location.href = '/' : $location.path('/dashboardPaciente')
                                } else if (user.access == 'ESPECIALISTA'){
                                    isAuthPage ? $window.location.href = '/' : $location.path('/dashboardEspecialista')
                                } else {
                                    isAuthPage ? $window.location.href = '/' : $location.path('/exames')
                                }
                            } else {
                                isAuthPage ? $window.location.href = '/' : $location.path('/person')
                            }
                        }
                    })
                }
            }
        }
    ]);