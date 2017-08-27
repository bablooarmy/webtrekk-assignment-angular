'use strict';

angular.module('myApp.customerNavigation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/navigation/:customerId', {
    templateUrl: 'customers/navigation/navigation.html',
    controller: 'CustomerNavigationCtrl',
    resolve: {
      isAllNavigationAvailable: ['customerFactory',function(customerFactory){
        return customerFactory.initializaCustomersNavigationData();
      }]
    }
  });
}])

.controller('CustomerNavigationCtrl',
  ['$scope', '$location','$routeParams','customerFactory',
  function($scope, $location, $routeParams, customerFactory) {
  $scope.navigation = customerFactory.getNavigationForCustomer($routeParams.customerId);
  $scope.goto = function(path, id){
    if(id){
      $location.path(path+'/'+id);
    }
    else{
      $location.path(path);
    }
  }
  //sorting
  $scope.propertyName = 'timestamp';
  $scope.reverse = false;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
}]);
