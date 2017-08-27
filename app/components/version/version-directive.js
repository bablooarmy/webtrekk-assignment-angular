'use strict';

angular.module('myApp.version.version-directive', [])
.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}])
.directive('dropdownList', [function() {
  return {
    restrict: 'E',
    require: '?stepperValueModel',
    templateUrl: 'components/version/dropdown-list.html',
    scope: {
      isolateSelectedModel: '=stepperValueModel',
      stepperErrorClass: '@',
      stepperSuccessClass: '@'
    },
    link:{
      pre: function($scope, iElement, iAttrs) {
        var stepperLabelOnKeyUp = function(eventObj){
          var stepperVal = parseInt(iElement.find(".stepper-value").val());
          if(eventObj.which == 38){
            if(isNaN(stepperVal)){
              iElement.find(".stepper-value").val(1);
              iElement.find(".stepper-value").trigger("change");
              iElement.find(".stepper").addClass($scope.stepperSuccessClass);
            }
            else if(stepperVal === 1){
              iElement.find(".stepper-value").val((stepperVal+1));
              iElement.find(".stepper-value").trigger("change");
            }
          }
          else if(eventObj.which == 40){
            if(isNaN(stepperVal)){
              iElement.find(".stepper-value").val(1);
              iElement.find(".stepper-value").trigger("change");
              iElement.find(".stepper").addClass($scope.stepperSuccessClass);
            }
            else if(stepperVal === 2){
              iElement.find(".stepper-value").val((stepperVal-1));
              iElement.find(".stepper-value").trigger("change");
            }
          }
          else if(eventObj.which !== 9 && eventObj.which !==16){
            eventObj.preventDefault();
          }

        }
        var stepperOnChange = function(eventObj){
          if(eventObj.target.value == 1){
            iElement.find(".stepper-label").val("Male");
            $scope.isolateSelectedModel = "m";
          }
          else if(eventObj.target.value == 2){
            iElement.find(".stepper-label").val("Female");
            $scope.isolateSelectedModel = "w";
          }
          else{
            iElement.find(".stepper-label").val("");
            $scope.isolateSelectedModel = null;
          }
        };
        iElement.find(".stepper-value").bind("change", stepperOnChange);
        iElement.find(".stepper-label").bind("keydown", stepperLabelOnKeyUp);
        if(iAttrs)
          if(iAttrs.stepperValueClass)
          iElement.find(".stepper-value").addClass(iAttrs.stepperValueClass);
          if(iAttrs.stepperValueRequired)
          iElement.find(".stepper-value").attr("required", "");
          if(iAttrs.stepperValueName)
          iElement.find(".stepper-value").attr("name", iAttrs.stepperValueName);
          if(iAttrs.stepperLabelPlaceholder)
          iElement.find(".stepper-label").attr("placeholder", iAttrs.stepperLabelPlaceholder);
      },
      post:function($scope, iElement, iAttrs){
        if($scope.isolateSelectedModel){
          if($scope.isolateSelectedModel === "m"){
            iElement.find(".stepper-value").val(1);
            iElement.find(".stepper-value").trigger("change");
          }
          else if($scope.isolateSelectedModel === "w"){
            iElement.find(".stepper-value").val(2);
            iElement.find(".stepper-value").trigger("change");
          }
          iElement.find(".stepper").addClass($scope.stepperSuccessClass);
        }
      }
    }

  };
}])
.directive('formatLifetimeValue', [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: {
              post:function (scope, element, attrs, ngModel) {
                // Specify how UI should be updated
                ngModel.$render = function() {
                  if(ngModel.$viewValue && ngModel.$viewValue.length>2 && ngModel.$viewValue.indexOf(',') ===-1)
                  applyFormat();//initialize
                  element[0].value = ngModel.$viewValue || '';
                };

                // Listen for change events to enable binding
                element.on('blur keypress change', function(e) {
                  if(parseInt(e.key) >= 0 && parseInt(e.key) <= 9){
                    scope.$evalAsync(applyFormat);
                  }
                  else{
                    e.preventDefault();
                  }
                });

                // Write data to the model
                function applyFormat() {
                  var formattedValue;

                  if (ngModel.$viewValue){
                    var inputNumbers = ngModel.$viewValue.replace( /[^0-9]/g, '');
                    if(inputNumbers.length >= 3) {
                      formattedValue = inputNumbers.substr(0,inputNumbers.length-2)+','+inputNumbers.substr(-2,2);
                    }
                    else{
                      formattedValue = ngModel.$viewValue;
                    }
                    ngModel.$setViewValue(formattedValue);
                    ngModel.$rollbackViewValue();
                  }
                }
              }
            }
          };
    }]);
