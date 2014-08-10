'use strict';

define(['angular', 'jquery', 'bootstrap'], function(angular, $) {

    /* Services */

    angular.module('apiApp.services', [])
    .factory('$uiService', function($stateParams, $compile, $http){
    	var uiService = {};

    	uiService.currentUI = null;

    	uiService.initializeAppList = function($scope) {
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

    	uiService.initializeAppAPIList = function($scope) {
            d3.select('#breadcrumb-app').text($stateParams.app);

            // Fixed Sidebar
            $(document).ready(function(){
                $('.api-sidebar').affix({
                    offset: {
                        top: 100
                    }
                })

            })
            d3.json('json/' + $stateParams.app + "/api.json", function(error, data) {
                if (error) {
                    console.log(error);
                } else {
					// Right Panel
					d3.select('.api-sidebar')
                        .append('ul')
                        .classed('api-category-list-toc', true)
                        .classed('nav', true)

                    .selectAll('li')
                        .data(data)
                        .enter()
                        .append('li')
                        .classed('api-category-toc', true)

                    .each(function(d) {
                        d3.select(this)
                            .append('a')
                            .attr('href', '#!/view/' + $stateParams.app + '/api/' + d.name)
                            .attr('data-target', function(d) {
                                return '#view__' + $stateParams.app + '__api__' + d.name
                            })
                            .classed('api-category-title-toc', true)
                            .text(function(d) {
                                return d.displayName;
                            })
                        d3.select(this)
                            .append('ul')
                            .classed('nav', true)
                        
                        .selectAll('li')
                            .data(d.api)
                            .enter()
                            .append('li')
                            .classed('api-row-toc', true)

                        .each(function(d) {
                            // TITLE
                            d3.select(this)
                                .classed(d.requestType.toLowerCase(), true)

                            .each(function(d) {
                                // GET / POST / PUT / DELETE
                                d3.select(this)
                                    .append('div')
                                    .classed('request-type', true);
                                // URL
                                $(this).append($compile('<a class="url" ui-sref="' + "api.details({app:'" + $stateParams.app + "', category:'" + d3.select(this.parentNode).datum().name +"', api:'" + d.name + "'})" + '" '
                                    + 'data-target="' + '#view__' + $stateParams.app + '__api__' + d3.select(this.parentNode).datum().name + '__' + d.name + '"'
                                    + '>' + d.URL + '</a>')($scope))
                            })
                        })
                    })
                
                	// Left Panel
                    d3.select('#api-category-list').selectAll('div')
                        .data(data)
                        .enter()
                        .append('div')
                        .classed('api-category', true)

                    .each(function(d) {
                        d3.select(this)
                            .append('h2')
                            .attr('id', function(d) {
                                return 'view__' + $stateParams.app + '__api__' + d.name
                            })
                            .classed('page-header', true)
                            .text(function(d) {
                                return d.displayName;
                            })
                        d3.select(this).selectAll('div')
                            .data(d.api)
                            .enter()
                            .append('div')
                            .attr('id', function(d){
                                return 'view__' + $stateParams.app + '__api__' + d3.select(this.parentNode).datum().name + '__' + d.name
                            })
                            .classed('api-row', true)

                        .each(function(d) {
                            // TITLE
                            d3.select(this)
                                .classed(d.requestType.toLowerCase(), true)
                                .append('div')
                                .classed('api-row-title', true)
                                .classed('container-fluid', true)
                                .on('click', function(d) {
                                    $(this.parentNode).find('div.api-row-detail')
                                        .toggleClass('hidden');
                                })

                            .each(function(d) {
                                // GET / POST / PUT / DELETE
                                d3.select(this)
                                    .append('div')
                                    .classed('request-type', true)
                                    .text(function(d) {
                                        return d.requestType;
                                    });
                                // URL
                                d3.select(this)
                                    .append('div')
                                    .classed('url', true)
                                    .text(function(d) {
                                        return d.URL;
                                    });
                                // Description
                                d3.select(this)
                                    .append('div')
                                    .classed('description', true)
                                    .text(function(d) {
                                        return d.description;
                                    })

                            })
                            // DETAILS
                            d3.select(this)
                                .append('div')
                                .classed('api-row-detail', true)
                                .classed('container-fluid', true)
                                //.classed('hidden', true)

                            .each(function(d) {
                                // Examples (Header)
                                d3.select(this)
                                    .append('h3')
                                    .classed('page-header', true)
                                    .text('Examples')
                                d3.select(this)
                                    .append('h4')
                                    .text('Request')

                                if (d.parameters && d.parameters instanceof Array && d.parameters.length > 0) {
                                    d3.select(this)
                                        .append('pre')
                                        .append('code')

                                    .each(function(d) {
                                        d3.select(this)
                                            .append('span')
                                            .text('{ ' + "\n")
                                        d3.select(this).selectAll('span.param-row')
                                            .data(d.parameters)
                                            .enter()
                                            .append('span')
                                            .classed('param-row', true)
                                            .classed('optional', function(d) {
                                                return !d.required;
                                            })
                                            .text(function(d) {
                                                return '  "' + d.name + '" : "' + d.example[0] + '",' + "\n"
                                            });
                                        d3.select(this)
                                            .append('span')
                                            .text('}')
                                    })
                                } else {
                                    d3.select(this)
                                        .append('p')
                                        .text('None.');
                                }

                                //Response
                                d3.select(this)
                                    .append('h4')
                                    .text('Response')

                                if (d.response && d.response instanceof Array && d.response.length > 0) {
                                    d3.select(this)
                                        .append('pre')
                                        .append('code')

                                    .each(function(d) {
                                        if (d.responseArray) {
                                            d3.select(this)
                                                .append('span')
                                                .text('[{ ' + "\n")
                                        } else {
                                            d3.select(this)
                                                .append('span')
                                                .text('{ ' + "\n")
                                        }
                                        d3.select(this).selectAll('span.param-row')
                                            .data(d.response)
                                            .enter()
                                            .append('span')
                                            .classed('param-row', true)
                                            .text(function(d) {
                                                return '  "' + d.name + '" : "' + d.example[0] + '",' + "\n"
                                            });
                                        if (d.responseArray) {
                                            d3.select(this)
                                                .append('span')
                                                .text('}, ...]');
                                        } else {
                                            d3.select(this)
                                                .append('span')
                                                .text('}');
                                        }
                                    })
                                } else if (d.response) {
                                    d3.select(this)
                                        .append('p')
                                        .text(d.response);
                                } else {
                                    d3.select(this)
                                        .append('p')
                                        .text('None.');
                                }

                                // Parameters (Header)
                                d3.select(this)
                                    .append('h3')
                                    .classed('page-header', true)
                                    .text('Request Parameter List')
                                if (d.parameters && d.parameters instanceof Array && d.parameters.length > 0) {
                                    // Parameter Table
                                    d3.select(this)
                                        .append('table')
                                        .classed('table', true)

                                    .each(function(d) {
                                        d3.select(this)
                                            .append('thead')
                                            .append('tr')

                                        .each(function(d) {
                                            d3.select(this)
                                                .append('th')
                                                .text('Field Name');

                                            d3.select(this)
                                                .append('th')
                                                .text('Required?');

                                            d3.select(this)
                                                .append('th')
                                                .text('Description');

                                            d3.select(this)
                                                .append('th')
                                                .text('Example 1');

                                            d3.select(this)
                                                .append('th')
                                                .text('Example 2');

                                            d3.select(this)
                                                .append('th')
                                                .text('Example 3');
                                        })
                                        d3.select(this)
                                            .append('tbody')

                                        .each(function(d) {
                                            d3.select(this).selectAll('tr')
                                                .data(d.parameters)
                                                .enter()
                                                .append('tr')

                                            .each(function(d) {
                                                d3.select(this)
                                                    .append('td')
                                                    .text(d.name);

                                                d3.select(this)
                                                    .append('td')
                                                    .text(function(d) {
                                                        return d.required ? 'Required' : 'Optional'
                                                    });

                                                d3.select(this)
                                                    .append('td')
                                                    .text(d.description);

                                                d3.select(this)
                                                    .append('td')
                                                    .text((d.example[0] !== undefined) ? d.example[0] : '')

                                                d3.select(this)
                                                    .append('td')
                                                    .text((d.example[1] !== undefined) ? d.example[1] : '')

                                                d3.select(this)
                                                    .append('td')
                                                    .text((d.example[2] !== undefined) ? d.example[2] : '')
                                            })
                                        })
                                    })
                                } else {
                                    d3.select(this)
                                        .append('p')
                                        .text('None.');
                                }

                                // Response Parameter List
                                d3.select(this)
                                    .append('h3')
                                    .classed('page-header', true)
                                    .text('Response Parameter List')
                                if (d.response && d.response instanceof Array && d.response.length > 0) {
                                    // Response Parameter Table
                                    d3.select(this)
                                        .append('table')
                                        .classed('table', true)

                                    .each(function(d) {
                                        d3.select(this)
                                            .append('thead')
                                            .append('tr')

                                        .each(function(d) {
                                            d3.select(this)
                                                .append('th')
                                                .text('Field Name');

                                            d3.select(this)
                                                .append('th')
                                                .text('Description');

                                            d3.select(this)
                                                .append('th')
                                                .text('Example 1');

                                            d3.select(this)
                                                .append('th')
                                                .text('Example 2');

                                            d3.select(this)
                                                .append('th')
                                                .text('Example 3');
                                        })
                                        d3.select(this)
                                            .append('tbody')

                                        .each(function(d) {
                                            d3.select(this).selectAll('tr')
                                                .data(d.response)
                                                .enter()
                                                .append('tr')

                                            .each(function(d) {
                                                d3.select(this)
                                                    .append('td')
                                                    .text(d.name);

                                                d3.select(this)
                                                    .append('td')
                                                    .text(d.description);

                                                d3.select(this)
                                                    .append('td')
                                                    .text((d.example[0] !== undefined) ? d.example[0] : '')

                                                d3.select(this)
                                                    .append('td')
                                                    .text((d.example[1] !== undefined) ? d.example[1] : '')

                                                d3.select(this)
                                                    .append('td')
                                                    .text((d.example[2] !== undefined) ? d.example[2] : '')
                                            })
                                        })
                                    })
                                } else if (d.response) {
                                    d3.select(this)
                                        .append('p')
                                        .text(d.response);
                                } else {
                                    d3.select(this)
                                        .append('p')
                                        .text('None.');
                                }

                                // Errors (Header)
                                d3.select(this)
                                    .append('h3')
                                    .classed('page-header', true)
                                    .text('Errors')
                                if (d.errors && d.errors instanceof Array && d.errors.length > 0) {
                                    // Error Table
                                    d3.select(this)
                                        .append('table')
                                        .classed('table', true)

                                    .each(function(d) {
                                        d3.select(this)
                                            .append('thead')
                                            .append('tr')

                                        .each(function(d) {
                                            d3.select(this)
                                                .append('th')
                                                .text('HTTP Code');

                                            d3.select(this)
                                                .append('th')
                                                .text('Error Code');

                                            d3.select(this)
                                                .append('th')
                                                .text('Description');
                                        })
                                        d3.select(this)
                                            .append('tbody')

                                        .each(function(d) {
                                            d3.select(this).selectAll('tr')
                                                .data(d.errors)
                                                .enter()
                                                .append('tr')

                                            .each(function(d) {
                                                d3.select(this)
                                                    .append('td')
                                                    .text(d.httpCode);

                                                d3.select(this)
                                                    .append('td')
                                                    .text(d.code);

                                                d3.select(this)
                                                    .append('td')
                                                    .text(d.description);
                                            })
                                        })
                                    })
                                } else {
                                    d3.select(this)
                                        .append('p')
                                        .text('None.');
                                }

                            })
                        })
                    })
                    $('body').scrollspy({ 
                        target: '.api-sidebar',
                        offset: 200
                    });
                    uiService.scrollTo($stateParams.app, $stateParams.category, $stateParams.api);
                }
            })	
    	}

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