'use strict';

define(['angular', 'jquery'], function(angular, $) {

    /* Services */

    angular.module('apiApp.services', [])
    .factory('$uiService', function($stateParams, $compile, $http){
    	var uiService = {};

        uiService.scrollTo = function(app, category, api) {
            //Obtain the anchor
            var anchorName = "view__";
            if (app !== undefined) {
                anchorName = anchorName + app + '__' + 'api';
            }
            if (category !== undefined) {
                anchorName = anchorName + '__' + category;
            }
            if (api !== undefined) {
                anchorName = anchorName + '__' + api;
            }
            if ($('#' + anchorName).length > 0) {
                $(document.body).animate({
                    'scrollTop':   $('#' + anchorName).offset().top - 150
                }, 200);
            }
        };
    return uiService;
    })
});