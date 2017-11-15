(function(){
    angular.module('hauslabor').factory('tabs', [ TabsFactory ])

    function TabsFactory() {
        function show(owner, {
            tabDetail = false,
            tabList = false,
            tabCreate = false,
            tabUpdate = false,
            tabDelete = false
        }) { //Corpo do método
            owner.tabDetail = tabDetail;
            owner.tabList = tabList;
            owner.tabCreate = tabCreate;
            owner.tabUpdate = tabUpdate;
            owner.tabDelete = tabDelete;
        }
        return { show };
    }
})();