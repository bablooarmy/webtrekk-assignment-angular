'use strict';

describe('myApp.version module', function() {
  beforeEach(module('myApp.version'));

  describe('app-version directive', function() {
    it('should print current version', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });
  describe('format-lifetime-value directive', function() {
    it('should format number > 2 example from "12345" to "123,45"', function() {
      inject(function($compile, $rootScope) {
        var inputElement = angular.element('<input type="text" ng-model="lifetimevalue" format-lifetime-value>');
        $compile(inputElement)($rootScope);
        $rootScope.$digest();
        $rootScope.lifetimevalue = "12345";
        $rootScope.$apply();
        expect(inputElement.val()).toEqual('123,45');
      });
    });
    it('should not format number 0 to 99', function() {
      inject(function($compile, $rootScope) {
        var inputElement = angular.element('<input type="text" ng-model="lifetimevalue" format-lifetime-value>');
        $compile(inputElement)($rootScope);
        $rootScope.$digest();
        $rootScope.lifetimevalue = "99";
        $rootScope.$apply();
        expect(inputElement.val()).toEqual('99');
      });
    });
  });
  describe('dropdown-list directive', function() {
     var $compile;
     var $scope;
     var $httpBackend;
     var elem;

     // Load the templates module
     beforeEach(module('directiveTemplates'));

     // Angular strips the underscores when injecting
     beforeEach(inject(function(_$compile_, _$rootScope_) {
         $compile = _$compile_;
         $scope = _$rootScope_.$new();
         elem = angular.element('<dropdown-list stepper-error-class="has-error" stepper-success-class="has-success" stepper-value-model="gender" stepper-value-name="gender" stepper-label-placeholder="Gender" stepper-value-required="true" stepper-value-class="form-control"></dropdown-list>');
         $compile(elem)($scope);
         // Now run a $digest cycle to update your template with new data
         $scope.$digest();
     }));
     it('should render label as per value passed in by $scope m->Male, w->Female', function() {
        elem.scope().gender = "m";
        // Run the $digest cycle again
        $scope.$digest();
        // Verify that the $scope variables are in the template
        expect(elem.isolateScope().isolateSelectedModel).toEqual("m");
        //expect(elem.find('input').eq(1).val()).toEqual("Male");

        // Do it again with new values
        elem.scope().gender = "w";

        // Run the $digest cycle again
        $scope.$digest();
        // Verify that the $scope variables are in the template
        expect(elem.isolateScope().isolateSelectedModel).toEqual("w");
        //expect(elem.find('input').eq(1).val()).toEqual("Female");
      });
  });
});
