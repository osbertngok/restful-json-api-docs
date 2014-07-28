'use strict';

define(['angular', 'jquery', 'd3', 'services'], function(angular, $, d3) {

    return angular.module('apiApp.controllers', ['apiApp.services'])

    .controller('AppListController', ['$scope',
        function($scope) {
            d3.json('json/app_list.json', function(error, data) {
                if (error) {
                    console.log(error);
                } else {
                    d3.select('#app-list table').classed('hidden', false)
                    d3.select('#app-list table tbody')
                        .selectAll('tr')
                        .data(data)
                        .enter()
                        .append('tr')
                        .each(function(d) {
                            d3.select(this)
                                .append('td')
                                .append('a')
                                .attr('href', function(d) {
                                    return "#!/view/" + d.name + "/api";
                                })
                                .text(function(d) {
                                    return d.name;
                                });
                            d3.select(this)
                                .append('td')
                                .text(function(d) {
                                    return d.description;
                                });
                        })
                }

            });
        }
    ])
        .controller('AppAPIListController',
            function($scope, $routeParams) {
                d3.select('#breadcrumb-app').text($routeParams.app);
                d3.json('json/' + $routeParams.app + "/api.json", function(error, data) {
                    console.log(data);
                    if (error) {
                        console.log(error);
                    } else {
                        d3.select('#api-category-list').selectAll('div')
                            .data(data)
                            .enter()
                            .append('div')
                            .classed('api-category', true)
                            .each(function(d) {
                                d3.select(this)
                                    .append('h2')
                                    .text(function(d) {
                                        return d.name;
                                    })
                                d3.select(this).selectAll('div')
                                    .data(d.api)
                                    .enter()
                                    .append('div')
                                    .classed('api-row', true)

                                .each(function(d) {
                                    d3.select(this)
                                        .classed(d.requestType.toLowerCase(), true)
                                        .append('div')
                                        .classed('request-type', true)
                                        .text(function(d) {
                                            return d.requestType;
                                        });
                                })
                            })
                    }
                })
            }
    );
});