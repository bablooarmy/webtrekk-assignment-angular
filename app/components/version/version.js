'use strict';

angular.module('myApp.version', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])

.value('version', '0.1')
.factory('customerFactory', ['$http','$filter', '$q',function($http, $filter, $q){
  var initializaCustomersMasterData = function(){
    var deferred = $q.defer();
    var customerData = JSON.parse(localStorage.getItem("Customers"));
    if(!customerData){
      $http({
              method: 'GET',
              url: 'data/CustomerData.json',
              headers: {
                'Content-Type': 'application/json'
              }

            }).success(function(response){
              localStorage.setItem("Customers", JSON.stringify(response));
              deferred.resolve(response);
            }).error(function(){
              console.log("error while fetching customer master data");
              deferred.reject("error while fetching customer master data");
        });
      }
      else{
        deferred.resolve(customerData);
      }
      return deferred.promise;
  }
  var initializaCustomersNavigationData = function(){
    var deferred = $q.defer();
    var navigationData = JSON.parse(localStorage.getItem("Navigations"));
    if(!navigationData){
      $http({
                  method: 'GET',
                  url: 'data/NavigationData.json',
                  headers: {
                    'Content-Type': 'application/json'
                  }

                }).success(function(response){
                  localStorage.setItem("Navigations", JSON.stringify(response));
                  deferred.resolve(response);
                }).error(function(){
                  console.log("error while fetching customer navigation data");
                  deferred.reject("error while fetching customer navigation data");
            });
    }
    else{
      deferred.resolve(navigationData);
    }
    return deferred.promise;
  }
  var getCustomers = function(){
    var listOfCustomers = JSON.parse(localStorage.getItem("Customers"));
    return listOfCustomers;
  }
  var getCustomerById = function(customerId){
    var filteredCustomers = $filter('filter')(getCustomers(), {'id':customerId});
    var formattedCustomer;
    if(filteredCustomers && filteredCustomers.length==1){
      formattedCustomer = filteredCustomers[0];
      formattedCustomer.lastcontact = new Date(filteredCustomers[0].lastcontact);
      formattedCustomer.birthday = new Date(filteredCustomers[0].birthday);
      formattedCustomer.isAdd = false;
      return formattedCustomer;
    }
    return {'id': getCustomers().length+1, 'isAdd': true};
  }
  var saveCustomer = function(customer, isAdd){
    var listOfCustomers = getCustomers();
    if(isAdd){
      listOfCustomers.push(customer);
    }
    else{
      listOfCustomers = $filter('filter')(listOfCustomers, {'id':'!'+customer.id});
      listOfCustomers.push(customer);
    }
    localStorage.setItem('Customers', JSON.stringify(listOfCustomers));
    return listOfCustomers;
  }
  var deleteCustomer = function(customerId){
    var listOfCustomersAfterDeletion = $filter('filter')(getCustomers(), {'id':'!'+customerId});
    localStorage.setItem('Customers', JSON.stringify(listOfCustomersAfterDeletion));
    return listOfCustomersAfterDeletion;
  }
  var getNavigations = function(){
    var listOfNavigations = JSON.parse(localStorage.getItem("Navigations"));
    return listOfNavigations;
  }
  var getNavigationForCustomer = function(customerId){
    var navigationForCustomer = {};
    navigationForCustomer.list = $filter('filter')(getNavigations(), {'id':customerId});
    navigationForCustomer.customer = getCustomerById(customerId);
    return navigationForCustomer;
  }
  return {
    initializaCustomersMasterData,
    initializaCustomersNavigationData,
    getCustomers,
    getCustomerById,
    saveCustomer,
    deleteCustomer,
    getNavigationForCustomer};

}]);
