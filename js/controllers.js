'use strict';

define(['angular', 'jquery', 'd3', 'services'], function(angular, $, d3) {

    return angular.module('apiApp.controllers', ['apiApp.services'])

    .controller('AppListController',
        function($scope, $uiService) {
            console.log('DEBUG :: ' + 'AppListController called');
            $uiService.initializeAppList();
        }
    )      
    .controller('AppAPIListController',
        function($scope, $uiService, $state, $rootScope) {
            console.log('DEBUG :: ' + 'AppAPIListController called');
            $uiService.initializeAppAPIList($scope);
        }
    );
});