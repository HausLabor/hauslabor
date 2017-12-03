/**
 * Hauslabor - Frontend
 * 
 * Modulo responsável pela autenticação do usuário
 * 
 */
(function () {
    angular.module('hauslabor').factory('auth', [
        '$http',
        'consts',
        AuthFactory
    ]);
    function AuthFactory($http, consts) {

        let user = null
        function getUser() {
            if (!user) {
                user = JSON.parse(localStorage.getItem(consts.userKey));
            }
            return user;
        }

        function signup(user, callback) {
            user.privacyPolicy = confirm('Estou de acordo com os termos de Politica de Privacidade!'); //privacyPolicy();
            submit('signup', user, callback);
        }

        function login(user, callback) {
            submit('login', user, callback);
        }

        function submit(url, user, callback) {
            $http.post(`${consts.oapiUrl}/${url}`, user)
                .then(resp => {
                    localStorage.setItem(consts.userKey, JSON.stringify(resp.data)); //coloca o usuario no local storage
                    $http.defaults.headers.common.Authorization = resp.data.token;
                    if (callback) callback(null, resp.data);
                }).catch(function (resp) {
                    if (callback) callback(resp.data.errors, null);
                });
        }

        function logout(callback) {
            user = null;
            localStorage.removeItem(consts.userKey);
            $http.defaults.headers.common.Authorization = '';
            if (callback) callback(null);
        }

        function completeUser(){
            const updateUser = `${consts.apiUrl}/users/${user._id}`;
            $http.put(updateUser, { 'completeUser': true }).then(function (response) {
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            })
        }
        
        //Grava a decisão do usúario, se está de acordo com o termo ou não.
        function privacyPolicy(user){
            const updateUser = `${consts.apiUrl}/users/${user._id}`;
            $http.put(updateUser, { 'privacyPolicy': user.privacyPolicy }).then(function (response) {
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            })
        }

        //Grava o ultimo acesso do usuário
        function updateLastAcess(){
            const updateUser = `${consts.apiUrl}/users/${user._id}`;
            $http.put(updateUser, { 'lastacess': Date() }).then(function (response) {
                msgs.addSuccess('Operação realizada com sucesso!');
            }).catch(function (response) {
                msgs.addError(response.data.errors);
            })
        }

        //Valida o token
        function validateToken(token, callback) {
            if (token) { //Verifica se existe um token na variavél token
                $http.post(`${consts.oapiUrl}/validateToken`, { token })
                    .then(resp => {
                        if (!resp.data.valid) {
                            logout()
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }
                        if (callback) callback(null, resp.data.valid)
                    }).catch(function (resp) {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token inválido.')
            }
        }

        return { signup, login, logout, getUser, validateToken, completeUser, updateLastAcess, privacyPolicy }
    }
})();