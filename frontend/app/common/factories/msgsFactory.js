/**
 * Hauslabor - Frontend
 * 
 * Module responsável pela padronização das mensagem
 * 
 */
(function() {
    angular.module('hauslabor').factory('msgs', [
    'toastr',
    MsgsFactory
])

function MsgsFactory(toastr) {

    function addSuccess(msgs) {
        addMsg(msgs, 'Sucesso', 'success');
    }
    
    function addError(msgs) {
        addMsg(msgs, 'Erro', 'error');
    }
    
    function addMsg(msgs, title, method) {
        if(msgs instanceof Array) {
            msgs.forEach(msg => toastr[method](msg, title)); //Percorre o array da mensagem
        } else {
            toastr[method](msgs, title);
        }
    }    
    return { addSuccess, addError }
}
})();