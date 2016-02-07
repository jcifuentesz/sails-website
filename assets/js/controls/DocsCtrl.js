angular.module('SailsWebsite').controller('DocsCtrl', [
  '$scope',
  '$window',
  '$timeout',
  '$location',
  function($scope, $window, $timeout, $location) {

    /**************
    * Initially...
    ***************/

    // Set the exposed menu data on the $scope
    $scope.menuData = window.MENU_DATA;

    // Make empty arrays of 'expanded' and 'parent' menu items --
    // (We'll add stuff here later in order to show the
    // 'expanded' and 'current parent' styles in the UI.)
    $scope.expandedMenuItems = [];
    $scope.parentMenuItems = [];

    // Get the id of the permalink, if there is one.
    var permalink = $window.location.hash.split('#?')[1];

    if(permalink) {
      // Now scroll to that spot on the page
      $(function onceDOMIsReadyOrNowIfItsAlreadyReady(){
        $('html, body').animate({
          scrollTop: $('#'+permalink).offset().top - 50
        }, 500);
      });
    }

    // TODO: update this when we aren't using '?page='
    // Find the slug for the page we're on:
    var currentSlug = $window.location.pathname.replace(/\/documentation\//, '');
    // Some slugs have spaces, which are changed to '%20' in the URL --
    // replace any occurences of '%20' with a space,
    // so it matches the slug in the menu data.
    // Also, get rid of the '#?' from the permalinks.
    currentSlug = currentSlug.replace(/#\?.+$/, '');
    // Use the slug to find the data for the page we're currently on
    var currentPage = _.find($scope.menuData, {slug: currentSlug});
    // Then mark that menu item as 'expanded' by adding it to `$scope.expandedMenuItems`
    $scope.expandedMenuItems.push(currentPage.slug);
    // If it's a child, also expand the parent.
    if(currentPage.isChild) {
      expandParent(currentPage.parent);
    }






    /*******************
     * Helper functions
     *******************/

    /**
     * Given a particular slug, find the first menu item in `$scope.menuData`
     * that has that slug as a child in its "children" array (aka its parent.)
     *
     * If we find said parent, then push its id (aka slug) onto `$scope.expandedMenuItems`.
     * If we don't, throw an Error beause `currentParent.id` will be like `undefined.id`.
     *
     * Back to the case where we do find said parent, if it has any parents of its own, then
     * call this function again, recursively, to expand that parent.
     *
     * TODO: fix throwy thing
     *
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    function expandParent(parentPath) {
      // Find the menu item that has the current 'path' as a child.
      var currentParent = _.find($scope.menuData, {path: parentPath});
      // Add the parent's id to the array of expanded things.
      $scope.expandedMenuItems.push(currentParent.path);
      // And to the array of 'parentMenuItems' to set 'current-parent' styles in the UI.
      // (Because this won't get run if someone is just expanding things;
      // it only happens after navigating to a menu item.)
      $scope.parentMenuItems.push(currentParent.path);
      // If this parent also has a parent, call the function again.
      if(currentParent.isChild) {
        expandParent(currentParent.parent);
      }
    }




    /*************
     * Qualifiers
     *************/

    $scope.getIsCurrent = function(slug) {
      // TODO: update this when we aren't using '?page='
      if($window.location.pathname.replace(/\/documentation\//, '') === slug) {
        return true;
      } else {
        return false;
      }
    };


    $scope.getIsParent = function(path) {
      if(_.contains($scope.parentMenuItems, path)) {
        return true;
      }
      else return false;
    };


    $scope.getIsExpanded = function(path) {
      if(_.contains($scope.expandedMenuItems, path)) {
        var menuItem = _.find($scope.menuData, {path: path});
        if(menuItem.children.length > 0) {
          return true;
        }
        else return false;
      }
      else return false;
    };

     $scope.getIsCurrentDocSection = function(path) {
      var currentPath = $window.location.pathname;
      if(currentPath.indexOf(path) > 0) {
        return true;
      }
      else return false;
    };


    /*********************************
    * Events triggered by user intent
    **********************************/
    $scope.intent = angular.extend($scope.intent || {}, {

      toggleExpanded: function(slug) {
        console.log('running!');
        // If the slug is in the list of expanded items, remove it
        // so that it will no longer have the 'expanded' styles in the UI
        if(_.contains($scope.expandedMenuItems, slug)) {
          _.remove($scope.expandedMenuItems, function(item) {
            return item === slug;
          });
        }
        // Otherwise, add it to the list so it will 'expand' in the UI.
        else {
          $scope.expandedMenuItems.push(slug);
        }
      }

    });

  }
]);
