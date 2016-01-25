/**
 * Bubble directive.
 * ------------------------------------------------------------------------
 * This is a custom directive that shows type labels.
 *
 * Usage:
 * ```
 * <bubble type="typeOfThing" colors="boolean"></bubble>
 * ```
 *
 * ------------------------------------------------------------------------
 * MIT License
 * © 2014 Rachael Shaw & contributors
 */
angular.module('SailsWebsite')

.directive('bubble', [function () {

  // actual directive.
  return {
    template: '<span class="{{type === \'object\' ? \'dictionary\' : type}}" ng-class="{colors: colors === true}">{{type === \'object\' ? \'dictionary\' : type}}</span>',
    restrict: 'E',
    require: 'ngModel',
    scope: {
      type: '@',
      colors: '='
    }
  };

}]);
