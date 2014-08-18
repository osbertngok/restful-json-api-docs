'use strict';

define(['angular', 'jquery'], function(angular, $) {

  /* Services */

  angular.module('apiApp.services', [])
  .factory('$uiService', function(){
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
          'scrollTop':   $('#' + anchorName).offset().top - 100
        }, 200);
      }
    };
    return uiService;
  })
  .factory('$scrollspyService', function(){
    var scrollspyService = {};

    scrollspyService.$body          = $('body');
    scrollspyService.$scrollElement = $(window);
    scrollspyService.selector       = '#api-table-of-contents .nav li > a';
    scrollspyService.activeTarget   = null;

    scrollspyService.options = {offset : 200, target: '#api-table-of-contents'};

    scrollspyService.scrollWatches = [];

    scrollspyService.dirty = false;

    scrollspyService.setDirty = function() {
      scrollspyService.dirty = true;
    }

    scrollspyService.isDirty = function() {
      return scrollspyService.dirty;
    }

    scrollspyService.addWatch = function(offset, element) {
      scrollspyService.scrollWatches.push({
        'offset': offset,
        'element': element
      });
      scrollspyService.setDirty();
    }

    scrollspyService.clear = function () {
      scrollspyService.scrollWatches = [];
      scrollspyService.dirty = false;
    }

    scrollspyService.getScrollHeight = function () {
      return scrollspyService.$scrollElement[0].scrollHeight || Math.max(scrollspyService.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }

    scrollspyService.process = function () {
      var scrollTop    = scrollspyService.$scrollElement.scrollTop() + scrollspyService.options.offset
      var scrollHeight = scrollspyService.getScrollHeight()
      var maxScroll    = scrollspyService.options.offset + scrollHeight - scrollspyService.$scrollElement.height()
      var activeTarget = scrollspyService.activeTarget
      var i

      if (scrollspyService.isDirty()) {
        scrollspyService.scrollWatches.sort(function(a,b){
          return a.offset - b.offset;
        });
        scrollspyService.dirty = false;
      }

      if (scrollspyService.scrollHeight != scrollHeight) {
        scrollspyService.refresh()
      }

      if (scrollTop >= maxScroll) {
        return activeTarget != (i = scrollspyService.scrollWatches[scrollspyService.scrollWatches.length - 1].element) && scrollspyService.activate(i)
      }

      if (activeTarget && scrollTop <= scrollspyService.scrollWatches[0].offset) {
        return activeTarget != (i = scrollspyService.scrollWatches[0].element) && scrollspyService.activate(i)
      }

      for (i = scrollspyService.scrollWatches.length; i--;) {
        activeTarget != scrollspyService.scrollWatches[i].element
          && scrollTop >= scrollspyService.scrollWatches[i].offset
          && (!scrollspyService.scrollWatches[i + 1] || scrollTop <= scrollspyService.scrollWatches[i + 1].offset)
          && scrollspyService.activate(scrollspyService.scrollWatches[i].element)
      }
    }

    scrollspyService.activate = function (target) {
      scrollspyService.activeTarget = target

      $(scrollspyService.selector)
        .parentsUntil(this.options.target, '.active')
        .removeClass('active')

      var selector = this.selector +
          '[data-target="' + target + '"],' +
          this.selector + '[href="' + target + '"]'

      var active = $(selector)
        .parents('li')
        .addClass('active')

      if (active.parent('.dropdown-menu').length) {
        active = active
          .closest('li.dropdown')
          .addClass('active')
      }

      active.trigger('activate.bs.scrollspy');
    }

    scrollspyService.refresh = function() {

    };

    $(window).on('scroll', scrollspyService.process);

    return scrollspyService;
  })
});