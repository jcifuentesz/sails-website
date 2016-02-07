angular.module('SailsWebsite').controller('VersionNotesCtrl', [
  '$scope',
  '$window',
  function($scope, $window) {

    // Get the id of the permalink, if there is one.
    var permalink = $window.location.hash.split('#?')[1];

    if(permalink) {
      // Now scroll to that spot on the page
      $(function onceDOMIsReadyOrNowIfItsAlreadyReady(){
        $('html, body').animate({
          scrollTop: $('#'+permalink).offset().top - 100
        }, 500);
      });

    }

  }


]);



