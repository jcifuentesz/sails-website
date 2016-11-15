module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "f09f3994-de73-4499-a1e3-b55cc3467d5b",
      "friendlyName": "Doc Page Metadatas",
      "description": "",
      "typeclass": "array",
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
        "path": "creating-a-machinepack/Getting-Started.ejs",
        "slug": "creating-a-machinepack/getting-started",
        "displayName": "Foo Bar",
        "children": [
          "some/unique/path/like/this.ejs"
        ],
        "id": "creating-a-machinepack/getting-started",
        "parent": "creating-a-machinepack",
        "isChild": true,
        "isParent": false,
        "displayNameSlug": "foo-bar",
        "parentDisplayName": "idk",
        "version": "0.3.6",
        "isDeprecated": false,
        "isMethod": false,
        "isTableOfContents": false,
        "isOverviewPage": false,
        "notShownOnWebsite": false
      }]
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var path = require('path');
    var _ = require('lodash');


    // Before formatting the metadata, sort each doc page's `children` array,
    // First by whether it has children (i.e. can be expanded), then alphabetically.
    var docPageMetadatas = _.map(inputs.docPageMetadatas, function sortDocPageChildren(docPage) {
      if (docPage.children && docPage.children.length > 0) {

        // Create an array with data about the docPage's children
        var childrenData = [];

        _.each(docPage.children, function makeListOfChildrenWithData(child) {
          var childData = _.find(inputs.docPageMetadatas, {
            fullPathAndFileName: child
          });
          childrenData.push(childData);
        });

        // Now sort it by'isParent' and 'displayName'.
        childrenData = _.sortByOrder(childrenData, ['isParent', 'displayName'], [false, true]);
        // Grab out the deprecated pages
        var deprecatedChildPages = _.remove(childrenData, function(pageData) {
          return pageData.data.isDeprecated;
        });
        // Grab out the method pages
        var methodChildPages = _.remove(childrenData, function(pageData) {
          return pageData.data.pageType === 'method';
        });
        // Now re-add the method pages at the end,
        // followed by the deprecated pages.
        childrenData = childrenData.concat(methodChildPages).concat(deprecatedChildPages);

        // Now put it back the way it was.
        // (As an array of `fullPathAndFileName`s)
        var sortedChildren = [];
        _.each(childrenData, function(child) {
          sortedChildren.push(child.fullPathAndFileName);
        });
        docPage.children = sortedChildren;
      }
      return docPage;
    });


    // Marshal menu metadata
    _.reduce(docPageMetadatas, function normalizeEachDocPage(memo, docPage) {

      // If this template is not to be shown (e.g. in the case of a README):
      if(docPage.data.notShownOnWebsite === 'true') {
        docPage.notShownOnWebsite = true;
      }
      else {
        docPage.notShownOnWebsite = false;
      }


      // Rename `fullPathAndFileName`
      docPage.path = docPage.fullPathAndFileName;

      // Whether this template is a table of contents
      if(docPage.data.isTableOfContents === 'true') {
        docPage.isTableOfContents = true;
      }
      else {
        docPage.isTableOfContents = false;
      }

      // Whether this template is not to be shown in the navigation
      // (e.g. in the case of an overview section)
      if(docPage.data.isOverviewPage === 'true') {
        docPage.isOverviewPage = true;
      }
      else {
        docPage.isOverviewPage = false;
      }


      // Determine the display name-- either use the data bundled as <docmeta> tags, or
      // take the slug and make a reasonable guess based on some formatting conventions.
      docPage.displayName = docPage.data.displayName || _.startCase(docPage.path); //slug.replace(/-/g, ' ');


      // Create the 'slug'

      // Create an empty array, in order to build up the slug.
      var slugParts = [];
      // Add the kebab-cased display name of the selected page
      // (But only if it's not the top-level, aka this template is used and is in the navigation)
      if (!docPage.isOverviewPage && !docPage.isTableOfContents) {
        slugParts.push(_.kebabCase(docPage.displayName));
      }


      // Build up the array of parents for the slug.
      if (docPage.parent) {
        getSlugParts(docPage.parent);
      }

      // Now convert the array into a string, remove the commas, and set it as the slug.
      docPage.slug = slugParts.join().replace(/,/g, '');
      // Get the name of the docs section this is from (e.g. 'concepts') by grabbing it from the beginning of the path
      docPage.topSection = docPage.path.split('/')[0] + '/';
      // Remove any excess slashes
      if (docPage.slug[0] === '/') {
        docPage.slug = docPage.slug2.replace(/\//, '');
      }
      // Add the overall doc section to the beginning of the slug
      docPage.slug = docPage.topSection + docPage.slug;



      // The recursive function for collecting the 'parents' of this docPage.
      function getSlugParts(parentPath) {
        // Find the parent data so we can grab `displayName`
        var slugParent = _.find(inputs.docPageMetadatas, {
          fullPathAndFileName: parentPath
        });

        if (slugParent && !slugParent.data.isOverviewPage === 'true' && !slugParent.data.isTableOfContents === 'true') {
          var parentDisplayName = slugParent.data.displayName || _.startCase(slugParent.path);
          // Convert the parent's display name to kebabcase and add a slash to the end
          parentDisplayName = _.kebabCase(parentDisplayName) + '/';
          // now add it to the beginning of the `slugParts` array
          slugParts.unshift(parentDisplayName);
          // If the parent has a parent, take the recursive step.
          if (slugParent.parent) {
            getSlugParts(slugParent.parent);
          }
        }
      }





      // then create an id for places where slug makes things tricky,
      // that's just the slug with dashes instead of slashes.
      docPage.id = docPage.slug.toLowerCase().replace(/[^a-z0-9]/g, '-');


      docPage.version = docPage.data.version || '';

      docPage.displayNameSlug = docPage.displayName.replace(/ /g, '-').replace(/\./g, 'point').toLowerCase();

      docPage.isDeprecated = docPage.data.isDeprecated;

      docPage.isMethod = docPage.data.isMethod;

      var pathSections = docPage.path.split('/');
      var parentPathIndex = pathSections.length - 2;
      docPage.parentDisplayName = pathSections[parentPathIndex];


      // Normalize each child in the array using the same logic we used to generate our slug
      docPage.children = _.map(docPage.children, function slugifyEachChild(child) {
        return child.toLowerCase();
      });

      if (docPage.children.length) {
        docPage.isParent = true;
      }

      memo.push(docPage);
      return memo;
    }, []);

    // Now, update the 'isChild' flag for any section whose parent is an 'overview' or 'table of contents' page.
    // (These will be considered top-level nav items, instead of being nested under the parent item.)
    docPageMetadatas = _.map(docPageMetadatas, function(docPage) {
      if (docPage.parent) {
        var parent = _.find(docPageMetadatas, {path: docPage.parent});
        if(parent && (parent.isOverviewPage || parent.isTableOfContents)) {
          docPage.isChild = false;
          docPage.parent = '';
        }
      }
      return docPage;
    });


    inputs.docPageMetadatas = docPageMetadatas;

    // Now sort the metadatas, first by 'isParent', then by 'displayName'.
    inputs.docPageMetadatas = _.sortByOrder(inputs.docPageMetadatas, ['isParent', 'displayName'], [false, true]);


    // Sort the pages by version, if applicable.
    inputs.docPageMetadatas = inputs.docPageMetadatas.sort(function(a, b) {
      if(a.version === '' && b.version === '') {
        return 0;
      }
      else if(a.version === '') {
        return -1;
      }
      else if(b.version === '') {
        return 1;
      }
      else {
        var semver = require('semver');
        var comparison = semver.rcompare(a.version, b.version);
        return comparison;
      }
    });

    // Grab out the deprecated pages
    var deprecatedPages = _.remove(inputs.docPageMetadatas, function(pageData) {
      return pageData.isDeprecated;
    });
    // Grab out the method pages
    var methodPages = _.remove(inputs.docPageMetadatas, function(pageData) {
      return pageData.pageType === 'method';
    });
    // Then re-add the method pages at the end,
    // followed by the deprecated pages.
    inputs.docPageMetadatas = inputs.docPageMetadatas.concat(methodPages).concat(deprecatedPages);
    return exits.success(inputs.docPageMetadatas);
  },
  "identity": "MarshaldocPageMetadata"
};
