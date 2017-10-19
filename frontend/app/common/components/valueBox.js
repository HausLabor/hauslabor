(function(){
    angular.module('hauslabor').component('valueBox', {
        bindings: {
            grid: '@',
            colorClass: '@',
            value: '@',
            text: '@',
            iconClass: '@'
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
        <div class="small-box {{ $ctrl.colorClass }}">
        <div class="inner">
        <h3>{{ $ctrl.value }}</h3>
        <p>{{ $ctrl.text }}</p>
        </div>
        <div class="icon">
        <i class="fa {{ $ctrl.iconClass }}"></i>
        </div>
        </div>
        </div>
        `
    })
})();