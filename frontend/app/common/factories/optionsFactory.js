/**
 * Hauslabor - Frontend
 * 
 * Module responável por remover os espaços de uma string e organizar em uma array
 * 
 */
(function(){
    
    angular.module('hauslabor').factory('options', [function() {
        
        function toOptions(values) {
            const option = values ? values.split(' ') : []
            return option
        }
        
        return { toOptions }
    }])
})();