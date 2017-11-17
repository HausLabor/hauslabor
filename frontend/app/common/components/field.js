(function(){
    angular.module('hauslabor').component('field', {
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            placeholder: '@',
            type: '@',
            model: '=',
            readonly: '<',
            mask: '@',
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
                <input id="{{ $ctrl.id }}" class="form-control" placeholder="{{ $ctrl.placeholder }}" 
                    type="{{ $ctrl.type }}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly" data-inputmask=""mask": "{{ $ctrl.mask }}"" data-mask />
                <span class="input-group-btn">
            </div>
        </div>
        `
    })
})();