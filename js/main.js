'use strict';
// Bootstraping for requireJS

require.config({
    baseUrl: './js',
    paths: {
        jquery: 'lib/jquery/jquery.min',
        angular: 'lib/angularjs/angular',
        'angular.route': 'lib/angularjs/angular-route.min',
        'angular.uiroute': 'lib/angularjs/angular-ui-router',
        "angular.strap": 'lib/angular-strap/angular-strap',
        d3: 'lib/d3/d3.min',
        bootstrap: 'lib/bootstrap/bootstrap'
    },
    shim: {
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angular.route": {
            deps: ["angular"]
        },
        "angular.uiroute": {
            deps: ["angular"]
        },
        "angular.strap": {
            deps: ["angular"]
        },
        bootstrap: {
            deps: ["jquery"]
        }
    }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular', 'app', 'routes'], function(angular, app, routes) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
})