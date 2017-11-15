(function(){
    angular.module('hauslabor').component('text', {
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            text: '@',
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
            <div class="box-body" id="{{ $ctrl.id }}">
                <p class="text-muted">{{ $ctrl.text }}</p>
            </div>
            </div>
        </div>
        `
    })
})();