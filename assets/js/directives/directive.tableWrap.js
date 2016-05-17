/**
 * tableWrap
 * ------------------------------------------------------------------------
 * This wraps tables in a scrollable <div>
 */
angular.module('SailsWebsite')
.directive('tableWrap', function () {

  return {
    restrict: 'A',
    scope: true,
    link: function ($scope, el) {

      var $tables = $(el).find('table');

      $tables.wrap('<div class="table-wrapper"></div>');
    }
  };

});
