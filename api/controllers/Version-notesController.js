var Machine = require("machine");
module.exports = {
    '$versionnote': function(req, res) {
        Machine.build({
            inputs: {
                "versionnote": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Resolve path
                sails.machines['2806adc7-0289-473a-8843-020526771565_1.2.0'].resolve({
                    "paths": ["views/partials/doc-menus/version-notes.jsmenu"]
                }).exec({
                    "error": function(resolvePath) {
                        return exits.respond({
                            data: "Failed at 'Resolve path'",
                            action: "respond_with_value_and_status",
                            status: 500
                        });

                    },
                    "success": function(resolvePath) {
                        // Read JSON file
                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_5.3.0'].readJson({
                            "source": resolvePath,
                            "schema": [{
                                templateTitle: "Foo-bar.ejs",
                                fullPathAndFileName: "idk/Foo-Bar.ejs",
                                data: {
                                    displayName: "Foo Bar"
                                },
                                children: ["idk/Foo-Bar/whatevs.ejs"],
                                isChild: true,
                                isParent: true,
                                parent: "idk"
                            }]
                        }).exec({
                            "error": function(readJSONFile) {
                                return exits.respond({
                                    data: "Failed at 'Read JSON file'",
                                    action: "respond_with_value_and_status",
                                    status: 500
                                });

                            },
                            "doesNotExist": function(readJSONFile) {
                                return exits.respond({
                                    data: "Failed at 'Read JSON file' (doesNotExist)",
                                    action: "respond_with_value_and_status",
                                    status: 500
                                });

                            },
                            "couldNotParse": function(readJSONFile) {
                                return exits.respond({
                                    data: "Failed at 'Read JSON file' (couldNotParse)",
                                    action: "respond_with_value_and_status",
                                    status: 500
                                });

                            },
                            "success": function(readJSONFile) {
                                // Marshal menu metadata
                                sails.machines['_project_3549_0.0.43'].MarshaldocPageMetadata({
                                    "docPageMetadatas": readJSONFile
                                }).exec({
                                    "error": function(marshalMenuMetadata) {
                                        return exits.respond({
                                            data: "Failed at 'Marshal menu metadata'",
                                            action: "respond_with_value_and_status",
                                            status: 500
                                        });

                                    },
                                    "success": function(marshalMenuMetadata) {
                                        // Find dictionary by...
                                        sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_5.2.0'].findOne({
                                            "array": marshalMenuMetadata,
                                            "criteria": {
                                                displayNameSlug: inputs.versionnote
                                            }
                                        }).exec({
                                            "error": function(findDictionaryBy) {
                                                return exits.respond({
                                                    data: "Failed at 'find dictionary by...'",
                                                    action: "respond_with_value_and_status",
                                                    status: 500
                                                });

                                            },
                                            "notFound": function(findDictionaryBy) {
                                                return exits.respond({
                                                    action: "respond_with_status",
                                                    status: 200
                                                });

                                            },
                                            "success": function(findDictionaryBy) {
                                                return exits.respond({
                                                    data: {
                                                        currentPage: findDictionaryBy,
                                                        title: (findDictionaryBy && findDictionaryBy.displayName) + " | Sails.js Version Notes"
                                                    },
                                                    action: "display_view",
                                                    status: 200,
                                                    view: "version-notes"
                                                });

                                            }
                                        });

                                    }
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};