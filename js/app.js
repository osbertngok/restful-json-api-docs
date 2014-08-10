define(['require',
    'angular',
    'angular.route',
    'angular.uiroute',
    'services',
    'controllers',
    'directives'
], function(require,
    angular,
    angularDummy) {

    return angular.module('apiApp', ['ngRoute', 'ui.router', 'apiApp.services', 'apiApp.controllers', 'apiApp.directives']);
});