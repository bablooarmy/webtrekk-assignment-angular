'use strict';

describe('myApp.customers module', function() {
  var $controller;
  beforeEach(module('myApp.customers'));

  describe('customer detail controller', function(){
    // Angular strips the underscores when injecting
    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));

    it('should ....', function($controller) {
      //spec body
      var $scope = {};
      var customerNavigationCtrl = $controller('CustomerNavigationCtrl', {$scope: $scope});
      expect(customerNavigationCtrl).toBeDefined();
    });
  });
});
