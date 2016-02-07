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
