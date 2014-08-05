'use strict';

angular.module('tldrmeApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.article = {};

    $scope.summarize = function() {
      $http.post('/tease', {
        url: $scope.url
      }).success(function(summary) {
        $scope.summary = summary;
      });
    };

    $scope.summary = '';
  });
