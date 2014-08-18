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
        .directive('oScrollspyListUl', function($timeout){
          var directiveDefinitionObject = {
            compile: function(tElement, tArrs, translude) {
              return {
                pre: function preLink(scope, iElement, iAttrs, controller) {

                },
                post: function postLink(scope, iElement, iAttrs, controller) {

                }
              }
            }
          };
          return directiveDefinitionObject;
        })
        .directive('oScrollspyListLi', function(){
          var directiveDefinitionObject = {
            compile: function(tElmenet, tArrs, translude) {
              return {
                pre: function preLink(scope, iElement, iAttrs, controller) {

                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                  if (scope.$last) {
                  }
                }
              }
            }
          };
          return directiveDefinitionObject;
        })
        .directive('oScrollspyListA', function($scrollspyService){
          var directiveDefinitionObject = {
            compile: function(tElmenet, tArrs, translude) {
              return {
                pre: function preLink(scope, iElement, iAttrs, controller) {

                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                  if ($(iAttrs.target).length > 0) {
                    console.log(iAttrs.target + " exists!");
                    $scrollspyService.scrollWatches.push({
                      'offset': $(iAttrs.target)['offset']().top,
                      'element': iAttrs.target
                    });
                    $scrollspyService.scrollWatches.sort(function(a,b){
                      return a.top - b.top;
                    });
                  } else {
                    console.log(iAttrs.target + " does not exist!");
                  }
                }
              }
            }
          };
          return directiveDefinitionObject;          
        })
        .directive('oScrollspyHref', function($scrollspyService){
          var directiveDefinitionObject = {
            compile: function(tElmenet, tArrs, translude) {
              return {
                pre: function preLink(scope, iElement, iAttrs, controller) {

                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                  console.log(iAttrs.id);
                }
              }
            }
          };
          return directiveDefinitionObject;          
        });
});