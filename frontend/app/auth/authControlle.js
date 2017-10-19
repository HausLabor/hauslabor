(function () {
    angular.module('hauslabor').controller('AuthCtrl', [
        '$location',
        'msgs',
        AuthController
    ])
    function AuthController($location, msgs) {
        const vm = this

        vm.getUser = () => ({ name: 'Usuário MOCK', email: 'mock@cod3r.com.br', ultAccess:'13 Jan 2017' })
        
        vm.logout = () => {
            console.log('Logout...')
        }
    }
})();