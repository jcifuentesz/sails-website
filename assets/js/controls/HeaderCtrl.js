angular.module('SailsWebsite').controller('HeaderCtrl', [
  '$scope',
  '$window',
  '$timeout',
  '$location',
  function($scope, $window, $timeout, $location) {

    $scope.menu = {};
    $scope.menu.visible = false;
    $scope.versionDropdown = {};
    $scope.versionDropdown.visible = false;

    // Check for the old '/#/' and '/#!/' links and redirect to the right place.
    if($window.location.hash && window.location.hash.indexOf('#?') < 0) {
      var redirectTo = $window.location.hash.replace(/#/g, '').replace(/!/g, '');
      if(redirectTo[0] === '/') {
        redirectTo = redirectTo.replace(/\//, '');
      }
      var q;
      if($window.location.hash.indexOf('?q=') > -1) {
        q = '?q='+$window.location.hash.split('?q=')[1];
        redirectTo = redirectTo + q;
      }
      $window.location.href = redirectTo;
    }

    // Qualifiers
    $scope.getIsCurrentPage = function(path) {
      var current = $window.location.pathname;
      return current === '/' + path;
    };

    $scope.getIsDocumentationPage = function() {
      var currentPath = $window.location.pathname;
      if(currentPath.indexOf('documentation') > 0) {
        return true;
      }
      else return false;
    };

    $scope.getIsSupportPage = function() {
      var currentPath = $window.location.pathname;
      if(currentPath.indexOf('support') > 0) {
        return true;
      }
      else if(currentPath.indexOf('security-policy') > 0) {
        return true;
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


    $scope.intent = angular.extend($scope.intent || {}, {
      toggleVersionDropdown: function() {
        console.log('TOGGLE DAT');
        if($scope.versionDropdown.visible) {
          $scope.intent.hideVersionDropdown();
        }
        else {
          $scope.intent.showVersionDropdown();
        }
      },

      showVersionDropdown: function() {
        $scope.versionDropdown.visible = true;
      },

      hideVersionDropdown: function() {
        $scope.versionDropdown.visible = false;
      },

      showMenu: function() {
        $scope.menu.visible = true;
      },

      hideMenu: function() {
        $scope.menu.visible = false;
      },

      goTo: function(path) {
        $scope.intent.hideMenu();
        // Give it time for the nice menu animation before navigating.
        $timeout(function() {
          $window.location.href = path;
        }, 300);
      }
    });


  }
]);
