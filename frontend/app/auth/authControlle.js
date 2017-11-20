(function() {
    angular.module('hauslabor').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])
    function AuthController($location, msgs, auth) {
        const vm = this;

        vm.loginMode = true;
        
        vm.changeMode = () => vm.loginMode = !vm.loginMode;

        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'));
        }
        
        vm.signup = () => {
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'));
        }

        vm.getUser = () => auth.getUser();
        
        vm.logout = () => {
            auth.updateLastAcess();
            auth.logout(() => $location.path('/'));
            //console.log('Logout...');
        }

        vm.perfil = () => {
            $location.path('/person');
            console.log('Acessar o perfil do usuário...');
        }
    }
})();