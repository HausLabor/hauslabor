/**
 * Hauslabor - Frontend
 * 
 * Module Auth Controlle responsável controle de autenticação
 * 
 */
(function() {
    angular.module('hauslabor').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])
    function AuthController($location, msgs, auth) {
        const vm = this; //Recebe o scope corrente

        vm.loginMode = true;
        
        vm.changeMode = () => vm.loginMode = !vm.loginMode; //Alterna o modo de login e cadastrar

        vm.login = () => {
            //Autentica o login, caso houver erro retorna a mensagem para o browser, senão direciona para a aplicação
            auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/')); 
        }
        
        vm.signup = () => {
            //Cadastra e autentica o usuário, caso houver erro retorna a mensagem para o browser, senão direciona para a aplicação
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'));
        }

        //Coleta o usuário corrente
        vm.getUser = () => auth.getUser();
        
        //Realiza o logout
        vm.logout = () => {
            auth.updateLastAcess();
            auth.logout(() => $location.path('/'));
            //console.log('Logout...');
        }

        //Acessa o perfil do usuário
        vm.perfil = () => {
            $location.path('/person');
            //console.log('Acessar o perfil do usuário...');
        }
    }
})();