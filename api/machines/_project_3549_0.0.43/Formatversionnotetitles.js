module.exports = {
  "inputs": {
    "sections": {
      "friendlyName": "sections",
      "description": "The array of version note sections to format",
      "example": [
        "0.8.x"
      ],
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
        "title": "0.8.x",
        "version": "0.8.0"
      }]
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var _ = require('lodash');

    inputs.sections = _.map(inputs.sections, function(section) {
      var formattedSection = section.replace(/x/g, '0');
      section = {
        title: section,
        version: formattedSection
      };
      return section;
    });

    return exits.success(inputs.sections);
  },
  "identity": "Formatversionnotetitles"
};