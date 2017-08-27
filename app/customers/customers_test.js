'use strict';

describe('myApp.customers module', function() {
  var $controller;
  var mockedCustomerFactory;
  beforeEach(module('myApp.customers', function($provide) {
    mockedCustomerFactory = {
      getCustomers: function(){
        return [{"id":1, "firstname":"Peter", "lastname":"Smith", "birthday":"1996-10-12","gender":"m","lastcontact":"2013-06-01","lifetime":19112},
        {"id":2, "firstname":"Anna", "lastname":"Hopp", "birthday":"1987-05-03","gender":"w","lastcontact":"2013-07-08","lifetime":5099},
        {"id":3, "firstname":"Christian", "lastname":"Cox", "birthday":"1991-02-21","gender":"m","lastcontact":"2013-08-01","lifetime":0},
        {"id":4, "firstname":"Roxy", "lastname":"Fox", "birthday":"1979-06-30","gender":"w","lastcontact":"2012-01-29","lifetime":21312},
        {"id":5, "firstname":"Eric", "lastname":"Adam", "birthday":"1969-11-21","gender":"m","lastcontact":"2013-03-18","lifetime":101991}];
      },
      deleteCustomer: function(customerId){
        return [
        {"id":2, "firstname":"Anna", "lastname":"Hopp", "birthday":"1987-05-03","gender":"w","lastcontact":"2013-07-08","lifetime":5099},
        {"id":3, "firstname":"Christian", "lastname":"Cox", "birthday":"1991-02-21","gender":"m","lastcontact":"2013-08-01","lifetime":0},
        {"id":4, "firstname":"Roxy", "lastname":"Fox", "birthday":"1979-06-30","gender":"w","lastcontact":"2012-01-29","lifetime":21312},
        {"id":5, "firstname":"Eric", "lastname":"Adam", "birthday":"1969-11-21","gender":"m","lastcontact":"2013-03-18","lifetime":101991}];
      }
    };
    $provide.value('customerFactory', mockedCustomerFactory);
  }));

  describe('customers controller', function(){
    // Angular strips the underscores when injecting
    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));

    describe('Test sort by usecases', function() {
      var $scope, controller;

      beforeEach(function() {
        $scope = {};
        controller = $controller('CustomersCtrl', { $scope: $scope, isAllCustomersAvailable: true });
      });

      it('Changes "reverse=false" to "reverse=true" when previous "propertyName" is same', function() {
        $scope.propertyName = 'lastname';
        $scope.reverse = false;
        $scope.sortBy('lastname');
        expect($scope.reverse).toEqual(true);
      });

      it('Changes "reverse=true" to "reverse=false" when previous "propertyName" is same', function() {
        $scope.propertyName = 'lastname';
        $scope.reverse = true;
        $scope.sortBy('lastname');
        expect($scope.reverse).toEqual(false);
      });

      it('Sets "reverse" false when rever=false & previous "propertyName" is not same', function() {
        $scope.propertyName = 'lastname';
        $scope.reverse = false;
        $scope.sortBy('firtname');
        expect($scope.reverse).toEqual(false);
      });
      it('Sets "reverse" false when previous "propertyName" is not same', function() {
        $scope.propertyName = 'lastname';
        $scope.reverse = true;
        $scope.sortBy('firtname');
        expect($scope.reverse).toEqual(false);
      });

      it('All customers data count should be > 0', function() {
        expect($scope.allCustomers.length).toBeGreaterThan(0);
      });
      it('All customers data count should be 5', function() {
        expect($scope.allCustomers.length).toEqual(5);
      });
      it('After deleting customer with id = 1, allcustomers count decrements by 1', function() {
        var totalCount = $scope.allCustomers.length;
        $scope.doDelete(1);
        expect($scope.allCustomers.length).not.toEqual(5);
        expect($scope.allCustomers.length).toEqual(4);
        expect($scope.allCustomers.length).toBeLessThan(totalCount);
      });
    });
  });
});
