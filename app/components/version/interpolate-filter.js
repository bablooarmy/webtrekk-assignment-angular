'use strict';

angular.module('myApp.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}])
.filter('genderFormat', [function() {
  return function(text) {
    return String(text)==='m'?"Male":"Female";
  };
}])
.filter('birthFormat', [function() {
  return function(dateOfBirthString) {
    var today = new Date();
    var birthDate = new Date(dateOfBirthString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    //even if birth month and birth day is greater than today's month or today will decrement by 1 to get precise age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
  };
}]);
