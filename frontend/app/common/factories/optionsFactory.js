(function(){
    
    angular.module('hauslabor').factory('options', [function() {
        
        function toOptions(values) {
            const option = values ? values.split(' ') : []
            return option
        }
        
        return { toOptions }
    }])
})();