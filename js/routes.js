'use strict';

define(['angular', 'app'], function(angular, app) {

    return app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        $urlRouterProvider
            .when('','/view');
        $stateProvider
            .state(
                'appSelection', {
                    url: '/view',
                    templateUrl: 'html/partials/app_list.html',
                    controller: 'AppListController'
                })
            .state(
                'api', {
                    abstract: true,
                    url: '/view/:app/api',
                    templateUrl: 'html/partials/app_api_list.html',
                    controller: 'AppAPIListController'
                })
            .state(
                'api.list', {
                    url: '',
                    controller: function($scope, $stateParams, $uiService) {
                        $uiService.scrollTo($stateParams.app);
                    }
                })
            .state(
                'api.category', {
                    url: '/:category',
                    controller: function($scope, $stateParams, $uiService) {
                        $uiService.scrollTo($stateParams.app, $stateParams.category);
                    }
                })
            .state(
                'api.details', {
                    url: '/:category/:api',
                    controller: function($scope, $stateParams, $uiService) {
                        $uiService.scrollTo($stateParams.app, $stateParams.category, $stateParams.api);
                    }
                })
    })
    .run(function($rootScope, $location){
    });
});