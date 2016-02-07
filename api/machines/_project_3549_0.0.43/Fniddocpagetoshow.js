module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "573ef066-9a67-49a4-9f2e-f7b91a77524f",
      "friendlyName": "docPageMetadatas",
      "description": "",
      "example": [{}],
      "required": true,
      "addedManually": true
    },
    "slug": {
      "id": "f35abb0e-6a92-4f9a-90ce-5aaf68e66653",
      "friendlyName": "slug",
      "description": "The name of the docs section you're trying to navigate to",
      "example": "dance-party",
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
      "example": {
        "path": "concepts/some-doc-page.ejs",
        "slug": "concepts/some-doc-page",
        "displayName": "Some Doc Page",
        "children": [
          "concepts/some-doc-page/child-section.ejs"
        ],
        "id": "concepts-some-doc-page",
        "parent": "concepts/0home.ejs",
        "isChild": true,
        "isParent": true,
        "displayNameSlug": "some-doc-page",
        "parentDisplayName": "--",
        "version": "0.4.6"
      }
    },
    "notFound": {
      "friendlyName": "not found",
      "description": "",
      "example": "abc123"
    },
    "caseDoesntMatch": {
      "id": "0aa0e91b-6dfb-4e6c-9a9c-3ab97e345416",
      "friendlyName": "case doesn't match",
      "description": "This exit is traversed if this machine detects a doc template which is the same except for letter case.  Returns the slug (w/ the proper case).",
      "example": "concepts/some-doc-page"
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    try {

      // Ensure requested view is one of the allowed nav items.
      var docPageToShow = _.find(inputs.docPageMetadatas, function(docPage) {
        // Do a case-insensitive match and equate whitespace, %20 (URL-encoded spacebar), and dashes
        if (inputs.slug.toLowerCase() === docPage.slug.toLowerCase()) {
          return true;
        }
        return false;
      });

      // If the capitalization is different, redirect to the lowercased path instead of just showing the page
      if (!_.isUndefined(docPageToShow) && (docPageToShow.slug !== inputs.slug)) {
        return exits.caseDoesntMatch(docPageToShow.slug);
      }
    } catch (e) {
      // Rather than traversing the error exit, exit as "notFound".
      console.error('Unexpected error in "Find doc template to show":', e);
      return exits.notFound();
    }

    if (!docPageToShow) {
      return exits.notFound();
    }



    return exits.success(docPageToShow)
  },
  "identity": "Fniddocpagetoshow"
};