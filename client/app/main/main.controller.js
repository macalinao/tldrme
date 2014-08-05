'use strict';

angular.module('tldrmeApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.article = {};

    $scope.summarize = function() {
      $http.post('/tease', $scope.article).success(function(summary) {
        $scope.summary = summary;
      });
    };

    $scope.summary = '';
  });
