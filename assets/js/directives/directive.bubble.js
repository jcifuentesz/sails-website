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
    template: '<span is="bubble-heart"></span>',
    restrict: 'E',
    // require: 'ngModel',
    scope: {
      type: '@',
      colors: '='
    },
    link: function (scope, element){
      var $bubbleHeart = element.find('[is="bubble-heart"]');

      // Determine if the bubble type has a `?` suffix (if so, it is uncertain)
      var isUncertain;
      if (scope.type.match(/\?$/)) {
        isUncertain = true;
      }

      // Interpret `object` as `dictionary`
      if ( scope.type.match(/object/i) ) {
        scope.type = 'dictionary';
      }

      // Interpret `*` as `json`
      if ( scope.type.match(/^\*$/i) ) {
        scope.type = 'JSON';
      }

      // Also get the "raw type" (used for class name) by stripping off the `?` suffix
      var rawType = scope.type.replace(/\?$/, '');
      rawType = rawType.toLowerCase();

      // Also determine the "display type" (used for displaying, of course)
      var displayType = scope.type;
      // displayType = displayType.replace(/\?$/, '');
      //
      // Normally, types are capitalized.
      // But there are a few special exceptions:
      if (displayType.match(/json/i)) {
        displayType = displayType.replace(/json/i, 'JSON');
      }
      else if (displayType.match(/req/i)) {
        displayType = displayType.replace(/req/i, 'req');
      }
      else {
        displayType = _.capitalize(displayType);
      }



      // If colors are enabled, add the "colors" class to communicate that little tidbit to styletown.
      if (scope.colors) {
        $bubbleHeart.addClass('colors');
      }

      // If relevant, add the "uncertain" class.
      if (isUncertain) {
        $bubbleHeart.addClass('uncertain');
      }

      // Now dip the bubble's heart into the dye and scratch some text onto it.
      $bubbleHeart.addClass(rawType);
      $bubbleHeart.text(displayType);
    }
  };

}]);
