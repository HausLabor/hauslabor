(function(){
    angular.module('hauslabor').component('listBox', {
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            values: '@',
            model: '=',
            readonly: '<',
        },
        controller: [
            'gridSystem',
            'options',
            function(gridSystem, options) {
                const self = this;
                //onInit garante que será chamado a function somente depois que os binfings estiver iniciado.
                this.$onInit = () => {
                    self.gridClasses = gridSystem.toCssClasses(self.grid);
                    self.optionArray = options.toOptions(self.values)
                }
            }
        ],
        template:`
                <select class="form-control" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly">
                    <option ng-repeat="option in $ctrl.optionArray">{{ option }}</option>
                </select>
        `
    })
})();