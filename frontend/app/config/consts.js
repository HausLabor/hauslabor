angular.module('hauslabor').constant('consts', {
  appName: 'HausLabor',
  version: '1.0',
  owner: 'Git - HausLabor',
  year: '2017',
  site: 'https://github.com/HausLabor/hauslabor',
  apiUrl: 'http://localhost:3003/api',
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
