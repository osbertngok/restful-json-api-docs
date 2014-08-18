'use strict';

define(['angular', 'services'], function(angular, services) {

    /* Directives */

    angular.module('apiApp.directives', ['apiApp.services'])
        .directive('appVersion', ['version',
            function(version) {
                return function(scope, elm, attrs) {
                    elm.text(version);
                };
            }
        ])
        .directive('oScrollspyListA', function($scrollspyService){
          var directiveDefinitionObject = {
            compile: function(tElmenet, tArrs, translude) {
              return {
                pre: function preLink(scope, iElement, iAttrs, controller) {

                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                  if ($(iAttrs.target).length > 0) {
                    $scrollspyService.addWatch($(iAttrs.target)['offset']().top, iAttrs.target);
                  } else {
                  }
                }
              }
            }
          };
          return directiveDefinitionObject;          
        });
});