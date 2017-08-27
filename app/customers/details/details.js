'use strict';

angular.module('myApp.customerDetail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:customerId', {
    templateUrl: 'customers/details/details.html',
    controller: 'CustomerDetailCtrl',
    resolve: {
      customer: ['$route','customerFactory',function($route, customerFactory){
        return customerFactory.getCustomerById($route.current.params.customerId);
      }]
    }
  });
}])

.controller('CustomerDetailCtrl',
['$scope','$location', '$routeParams', 'customer', 'customerFactory',
function($scope, $location, $routeParams, customer, customerFactory) {
  $scope.customer = customer;
  $scope.goto = function(path, id){
    if(id){
      $location.path(path+'/'+id);
    }
    else{
      $location.path(path);
    }
  };
  $scope.submitForm = function() {
			// check to make sure the form is completely valid
			if ($scope.customerForm.$valid) {
        if($scope.customer.isAdd){
          customerFactory.saveCustomer($scope.customer, true);
        }
				else{
          customerFactory.saveCustomer($scope.customer, false);
        }
        $scope.goto('/customers');
			}
      else{
        alert('Please enter all required details');
      }

	};
  $scope.dateOptions = {
    dateDisabled: false,
    formatYear: 'yy',
    maxDate: new Date(),
    minDate: new Date(1900, 1, 1),
    startingDay: 1
  };
  $scope.lastcontactDatePicker = {opened:false};
  $scope.openLastcontactDatePicker = function() {
    $scope.lastcontactDatePicker.opened = true;
  };
  $scope.birthdayDatePicker = {opened:false};
  $scope.openBirthdayDatePicker = function() {
    $scope.birthdayDatePicker.opened = true;
  };
}]);
