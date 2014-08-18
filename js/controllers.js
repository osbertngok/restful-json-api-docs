'use strict';

define(['angular', 'services'], function(angular) {

    return angular.module('apiApp.controllers', ['apiApp.services'])

    .controller('AppListController',
        function($scope, dataPromise) {
            console.log('DEBUG :: ' + 'AppListController called');
            $scope.data = dataPromise.data;
        }
    )      
    .controller('AppAPIListController',
        function($scope, $stateParams, dataPromise, $scrollspyService) {
            console.log('DEBUG :: ' + 'AppAPIListController called');
            $scope.data = dataPromise.data;
            $scope.$stateParams = $stateParams;
            $scope.hasArrayAttribute = function (api, attribute) {
                return api && api[attribute] && api[attribute] instanceof Array && api[attribute].length > 0;
            };
            $scope.isUndefined = function(p) {
                return p === undefined;
            };
            $scrollspyService.clear();
        }
    );
});