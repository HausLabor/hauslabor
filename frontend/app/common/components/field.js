(function(){
    angular.module('hauslabor').component('field', {
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            placeholder: '@',
        },
        controller: [
            'gridSystem',
            function(gridSystem) {
                const self = this;
                //onInit garante que será chamado a function somente depois que os binfings estiver iniciado.
                this.$onInit = () => self.gridClasses = gridSystem.toCssClasses(self.grid);
            }
        ],
        template:`
        <div class="{{ $ctrl.gridClasses }}">
            <div class="form-group">
                <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
                <input id="{{ $ctrl.id }}" class="form-control" placeholder="{{ $ctrl.placeholder }}" />
            </div>
        </div>
        `
    })
})();