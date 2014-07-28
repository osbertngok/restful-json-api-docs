define(['require',
    'angular',
    'angular.route',
    'services',
    'controllers',
    'directives'
], function(require,
    angular,
    angularDummy) {

    return angular.module('apiApp', ['ngRoute', 'apiApp.services', 'apiApp.controllers', 'apiApp.directives']);
});