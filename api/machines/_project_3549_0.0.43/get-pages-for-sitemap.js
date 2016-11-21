module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "27407686-6bda-4fe7-9127-3a6c892517b6",
      "friendlyName": "Doc page metadatas",
      "description": "",
      "example": [{}],
      "required": true,
      "addedManually": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "id": "success",
      "friendlyName": "then",
      "description": "Normal outcome.",
      "example": [{
        "url": "http://sailsjs.com",
        "lastModified": "2015-01-01T06:00:00.000Z"
      }]
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var _ = require('lodash');

    // Start off with the hard-coded pages:
    var sitemapEntries = [{
      url: 'http://sailsjs.com',
      lastModified: '2014-01-01T06:00:00.000Z'
    }, {
      url: 'http://sailsjs.com/get-started',
      lastModified: '2014-06-25T06:00:00.000Z'
    }, {
      url: 'http://sailsjs.com/features',
      lastModified: '2014-06-25T06:00:00.000Z'
    }, {
      url: 'http://sailsjs.com/support',
      lastModified: '2014-06-25T06:00:00.000Z'
    }, {
      url: 'http://sailsjs.com/support/about-irc',
      lastModified: '2014-06-25T06:00:00.000Z'
    }, ];

    // Then grab the list of generated pages from the various jsmenus...
    _.each(inputs.docPageMetadatas, function(docPage) {
      var url;
      if (docPage.path.indexOf('version-notes') >= 0) {
        url = 'http://sailsjs.com/version-notes/' + docPage.displayNameSlug;
      } else url = 'http://sailsjs.com/documentation/' + docPage.slug;
      sitemapEntries.push({
        url: url,
        lastModified: docPage.lastModified || '2015-06-25T06:00:00.000Z'
      });
    });

    return exits.success(sitemapEntries);

  },
  "identity": "get-pages-for-sitemap"
};
