'use strict';

define(['angular', 'app'], function(angular, app) {

    return app.config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/view/', {
                templateUrl: 'html/partials/app_list.html',
                controller: 'AppListController'
            })
            .when('/view/:app/api/', {
                templateUrl: 'html/partials/app_api_list.html',
                controller: 'AppAPIListController'
            })
            .otherwise({
                redirectTo: '/view/'
            })
    });
});