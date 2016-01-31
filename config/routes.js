module.exports.routes = {
  "get /security-policy": {
    "target": "Security-policyController.find"
  },
  "get /support": {
    "target": "SupportController.find"
  },
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /getstarted": {
    "target": "GetstartedController.find"
  },
  "get /support/about-irc": {
    "target": "SupportController.aboutirc"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /features": {
    "target": "FeaturesController.find"
  },
  "get /old-homepage": {
    "target": "Old-homepageController.find"
  },
  "get /old-features": {
    "target": "Old-featuresController.find"
  },
  //////////////////////////////////////////////////////////////////////////////////////////
  // future-proof broken links to backwards-compatible socket methods:
  "get /documentation/reference/web-sockets/sails-sockets/sails-sockets-id": '/documentation/reference/web-sockets/sails-sockets/get-id',
  "get /documentation/reference/web-sockets/sails-sockets/sails-sockets-broadcast": '/documentation/reference/web-sockets/sails-sockets/broadcast',
  "get /documentation/reference/web-sockets/sails-sockets/sails-sockets-blast": '/documentation/reference/web-sockets/sails-sockets/blast',
  "get /documentation/reference/web-sockets/sails-sockets/sails-sockets-join": '/documentation/reference/web-sockets/sails-sockets/join',
  "get /documentation/reference/web-sockets/sails-sockets/sails-sockets-leave": '/documentation/reference/web-sockets/sails-sockets/leave',
  //////////////////////////////////////////////////////////////////////////////////////////
  "get /documentation/*": {
    "target": "DocumentationController.*"
  },
  "post /refresh": {
    "target": "RefreshController.find"
  },
  "get /documentation": {
    "target": "DocumentationController.find"
  },
  "get /resources": {
    "target": "ResourcesController.find"
  },
  "get /version-notes/:versionnote": {
    "target": "Version-notesController.$versionnote",
    "skipAssets": true
  }
};
