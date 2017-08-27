'use strict';

angular.module('myApp.customers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customers', {
    templateUrl: 'customers/customers.html',
    controller: 'CustomersCtrl',
    resolve: {
      isAllCustomersAvailable: ['customerFactory',function(customerFactory){return customerFactory.initializaCustomersMasterData(); }]
    }
  });
}])

.controller('CustomersCtrl',
['$scope','$location', 'isAllCustomersAvailable', 'customerFactory',
function($scope, $location, isAllCustomersAvailable, customerFactory) {
  $scope.allCustomers = customerFactory.getCustomers();
  $scope.goto = function(path, id){
    if(id){
      $location.path(path+'/'+id);
    }
    else{
      $location.path(path);
    }
  }
  $scope.doDelete = function(id){
    $scope.allCustomers = customerFactory.deleteCustomer(id);
  }
  //sorting
  $scope.propertyName = 'lastname';
  $scope.reverse = false;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
}]);
