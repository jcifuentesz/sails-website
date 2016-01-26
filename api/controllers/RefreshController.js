var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Get request header
                sails.machines['642f6a3d-70db-4cbb-ab9b-d93cec84142a_0.3.2'].getRequestHeader({
                    "header": "X-Hub-Signature"
                }).setEnvironment({
                    req: req
                }).exec({
                    "error": function(getRequestHeader) {
                        return exits.error({
                            data: getRequestHeader,
                            status: 500
                        });

                    },
                    "success": function(getRequestHeader) {
                        // Get environment variable
                        sails.machines['_project_3549_0.0.43'].getEnvironmentVariable({
                            "varName": "GITHUB_HOOK_SECRET"
                        }).setEnvironment({
                            req: req
                        }).exec({
                            "error": function(getEnvironmentVariable) {
                                return exits.error({
                                    data: getEnvironmentVariable,
                                    status: 500
                                });

                            },
                            "success": function(getEnvironmentVariable) {

                                // Compare encrypted GitHub token
                                // see https://github.com/18F/github-webhook-validator/blob/master/index.js#L71
                                var algorithmAndHash = getRequestHeader.split('=');
                                if (algorithmAndHash.length !== 2) {
                                  return exits.error({
                                      data: new Error('Invalid X-Hub-Signature header from GitHub!'),
                                      status: 500
                                  });
                                }

                                // Below, we'll simulate the raw request body by re-encoding the JSON-encoded request body.
                                var rawRequestBodyString;
                                try {
                                  rawRequestBodyString = JSON.stringify(req.body);
                                }
                                catch (e) {
                                  return exits.error({
                                      data: new Error('Invalid request from GitHub:'+e.stack),
                                      status: 500
                                  });
                                }

                                // Now use hmac to validate the x-hub-signature header
                                try {
                                  // Replace bufferEq() once https://github.com/nodejs/node/issues/3043 is
                                  // resolved and the standard library implementation is available.
                                  var hmac = require('crypto').createHmac(algorithmAndHash[0], getEnvironmentVariable);
                                  var computed = new Buffer(hmac.update(rawRequestBodyString, 'utf8').digest('hex'));
                                  var header = new Buffer(algorithmAndHash[1]);
                                  var isMatch = bufferEq(computed, header);
                                  if (!isMatch) {
                                    return exits.respond({
                                      data: "You seem to be up to no good!",
                                      action: "respond_with_value_and_status",
                                      status: "401"
                                    });
                                  }
                                } catch (err) {
                                  return exits.respond({
                                    data: "You seem to be up to no good!",
                                    action: "respond_with_value_and_status",
                                    status: "401"
                                  });
                                }


                                // // If equal (===)
                                // sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_1.2.0'].ifEqual({
                                //     "a": getEnvironmentVariable,
                                //     "b": getRequestHeader
                                // }).exec({
                                //     "error": function(ifEqual) {
                                //         return exits.error({
                                //             data: ifEqual,
                                //             status: 500
                                //         });

                                //     },
                                //     "otherwise": function(ifEqual) {
                                //         return exits.respond({
                                //             data: "You seem to be up to no good!",
                                //             action: "respond_with_value_and_status",
                                //             status: "401"
                                //         });

                                //     },
                                //     "success": function(ifEqual) {
                                        // Compile reference docs
                                        sails.machines['_project_3549_0.0.43'].Compilemarkdowndocs({
                                            "path": "reference"
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "error": function(compileReferenceDocs) {
                                                return exits.error({
                                                    data: compileReferenceDocs,
                                                    status: 500
                                                });

                                            },
                                            "success": function(compileReferenceDocs) {
                                                // Compile anatomy docs
                                                sails.machines['_project_3549_0.0.43'].Compilemarkdowndocs({
                                                    "path": "anatomy"
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "error": function(compileAnatomyDocs) {
                                                        return exits.error({
                                                            data: compileAnatomyDocs,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(compileAnatomyDocs) {
                                                        // Compile concepts docs
                                                        sails.machines['_project_3549_0.0.43'].Compilemarkdowndocs({
                                                            "path": "concepts"
                                                        }).setEnvironment({
                                                            sails: sails
                                                        }).exec({
                                                            "error": function(compileConceptsDocs) {
                                                                return exits.error({
                                                                    data: compileConceptsDocs,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(compileConceptsDocs) {
                                                                // Compile getting started docs
                                                                sails.machines['_project_3549_0.0.43'].Compilemarkdowndocs({
                                                                    "path": "getting-started"
                                                                }).setEnvironment({
                                                                    sails: sails
                                                                }).exec({
                                                                    "error": function(compileGettingStartedDocs) {
                                                                        return exits.error({
                                                                            data: compileGettingStartedDocs,
                                                                            status: 500
                                                                        });

                                                                    },
                                                                    "success": function(compileGettingStartedDocs) {
                                                                        // Compile irc docs
                                                                        sails.machines['_project_3549_0.0.43'].Compilemarkdowndocs({
                                                                            "path": "support/irc"
                                                                        }).setEnvironment({
                                                                            sails: sails
                                                                        }).exec({
                                                                            "error": function(compileIrcDocs) {
                                                                                return exits.error({
                                                                                    data: compileIrcDocs,
                                                                                    status: 500
                                                                                });

                                                                            },
                                                                            "success": function(compileIrcDocs) {
                                                                                // Compile version notes
                                                                                sails.machines['_project_3549_0.0.43'].Compilemarkdowndocs({
                                                                                    "path": "version-notes"
                                                                                }).setEnvironment({
                                                                                    sails: sails
                                                                                }).exec({
                                                                                    "error": function(compileVersionNotes) {
                                                                                        return exits.error({
                                                                                            data: compileVersionNotes,
                                                                                            status: 500
                                                                                        });

                                                                                    },
                                                                                    "success": function(compileVersionNotes) {
                                                                                        // Compile security doc files
                                                                                        sails.machines['_project_3549_0.0.43'].Compilemarkdowndocs({
                                                                                            "path": "security"
                                                                                        }).setEnvironment({
                                                                                            sails: sails
                                                                                        }).exec({
                                                                                            "error": function(compileSecurityDocFiles) {
                                                                                                return exits.error({
                                                                                                    data: compileSecurityDocFiles,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "success": function(compileSecurityDocFiles) {
                                                                                                // Resolve path
                                                                                                sails.machines['2806adc7-0289-473a-8843-020526771565_1.2.0'].resolve({
                                                                                                    "paths": ["views/partials/doc-menus/" + "anatomy" + ".jsmenu"]
                                                                                                }).exec({
                                                                                                    "error": function(resolvePath2) {
                                                                                                        return exits.error({
                                                                                                            data: resolvePath2,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "success": function(resolvePath2) {
                                                                                                        // Read JSON file
                                                                                                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_5.3.0'].readJson({
                                                                                                            "source": resolvePath2,
                                                                                                            "schema": [{
                                                                                                                templateTitle: "Foo-Bar.ejs",
                                                                                                                fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                                                data: {
                                                                                                                    displayName: "Foo Bar"
                                                                                                                },
                                                                                                                children: ["idk/foo-bar/something.ejs"],
                                                                                                                isChild: true,
                                                                                                                isParent: true,
                                                                                                                parent: "idk.ejs"
                                                                                                            }]
                                                                                                        }).exec({
                                                                                                            "error": function(readJSONFile) {
                                                                                                                return exits.error({
                                                                                                                    data: readJSONFile,
                                                                                                                    status: 500
                                                                                                                });

                                                                                                            },
                                                                                                            "doesNotExist": function(readJSONFile) {
                                                                                                                return exits.error({
                                                                                                                    data: readJSONFile,
                                                                                                                    status: 500
                                                                                                                });

                                                                                                            },
                                                                                                            "couldNotParse": function(readJSONFile) {
                                                                                                                return exits.error({
                                                                                                                    data: readJSONFile,
                                                                                                                    status: 500
                                                                                                                });

                                                                                                            },
                                                                                                            "success": function(readJSONFile) {
                                                                                                                // Marshal menu metadata
                                                                                                                sails.machines['_project_3549_0.0.43'].MarshaldocPageMetadata({
                                                                                                                    "docPageMetadatas": readJSONFile
                                                                                                                }).exec({
                                                                                                                    "error": function(marshalMenuMetadata) {
                                                                                                                        return exits.error({
                                                                                                                            data: marshalMenuMetadata,
                                                                                                                            status: 500
                                                                                                                        });

                                                                                                                    },
                                                                                                                    "success": function(marshalMenuMetadata) {
                                                                                                                        // Resolve path
                                                                                                                        sails.machines['2806adc7-0289-473a-8843-020526771565_1.2.0'].resolve({
                                                                                                                            "paths": ["views/partials/doc-menus/" + "concepts" + ".jsmenu"]
                                                                                                                        }).exec({
                                                                                                                            "error": function(resolvePath3) {
                                                                                                                                return exits.error({
                                                                                                                                    data: resolvePath3,
                                                                                                                                    status: 500
                                                                                                                                });

                                                                                                                            },
                                                                                                                            "success": function(resolvePath3) {
                                                                                                                                // Read JSON file
                                                                                                                                sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_5.3.0'].readJson({
                                                                                                                                    "source": resolvePath3,
                                                                                                                                    "schema": [{
                                                                                                                                        templateTitle: "Foo-Bar.ejs",
                                                                                                                                        fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                                                                        data: {
                                                                                                                                            displayName: "Foo Bar"
                                                                                                                                        },
                                                                                                                                        children: ["idk/foo-bar/something.ejs"],
                                                                                                                                        isChild: true,
                                                                                                                                        isParent: true,
                                                                                                                                        parent: "idk.ejs"
                                                                                                                                    }]
                                                                                                                                }).exec({
                                                                                                                                    "error": function(readJSONFile2) {
                                                                                                                                        return exits.error({
                                                                                                                                            data: readJSONFile2,
                                                                                                                                            status: 500
                                                                                                                                        });

                                                                                                                                    },
                                                                                                                                    "doesNotExist": function(readJSONFile2) {
                                                                                                                                        return exits.error({
                                                                                                                                            data: readJSONFile2,
                                                                                                                                            status: 500
                                                                                                                                        });

                                                                                                                                    },
                                                                                                                                    "couldNotParse": function(readJSONFile2) {
                                                                                                                                        return exits.error({
                                                                                                                                            data: readJSONFile2,
                                                                                                                                            status: 500
                                                                                                                                        });

                                                                                                                                    },
                                                                                                                                    "success": function(readJSONFile2) {
                                                                                                                                        // Marshal menu metadata
                                                                                                                                        sails.machines['_project_3549_0.0.43'].MarshaldocPageMetadata({
                                                                                                                                            "docPageMetadatas": readJSONFile2
                                                                                                                                        }).exec({
                                                                                                                                            "error": function(marshalMenuMetadata2) {
                                                                                                                                                return exits.error({
                                                                                                                                                    data: marshalMenuMetadata2,
                                                                                                                                                    status: 500
                                                                                                                                                });

                                                                                                                                            },
                                                                                                                                            "success": function(marshalMenuMetadata2) {
                                                                                                                                                // Combine anatomy and concepts arrays
                                                                                                                                                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_5.2.0'].concat({
                                                                                                                                                    "firstArray": marshalMenuMetadata,
                                                                                                                                                    "secondArray": marshalMenuMetadata2
                                                                                                                                                }).exec({
                                                                                                                                                    "error": function(combineAnatomyAndConceptsArrays) {
                                                                                                                                                        return exits.error({
                                                                                                                                                            data: combineAnatomyAndConceptsArrays,
                                                                                                                                                            status: 500
                                                                                                                                                        });

                                                                                                                                                    },
                                                                                                                                                    "success": function(combineAnatomyAndConceptsArrays) {
                                                                                                                                                        // Resolve path
                                                                                                                                                        sails.machines['2806adc7-0289-473a-8843-020526771565_1.2.0'].resolve({
                                                                                                                                                            "paths": ["views/partials/doc-menus/" + "reference" + ".jsmenu"]
                                                                                                                                                        }).exec({
                                                                                                                                                            "error": function(resolvePath4) {
                                                                                                                                                                return exits.error({
                                                                                                                                                                    data: resolvePath4,
                                                                                                                                                                    status: 500
                                                                                                                                                                });

                                                                                                                                                            },
                                                                                                                                                            "success": function(resolvePath4) {
                                                                                                                                                                // Read JSON file
                                                                                                                                                                sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_5.3.0'].readJson({
                                                                                                                                                                    "source": resolvePath4,
                                                                                                                                                                    "schema": [{
                                                                                                                                                                        templateTitle: "Foo-Bar.ejs",
                                                                                                                                                                        fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                                                                                                        data: {
                                                                                                                                                                            displayName: "Foo Bar"
                                                                                                                                                                        },
                                                                                                                                                                        children: ["idk/foo-bar/something.ejs"],
                                                                                                                                                                        isChild: true,
                                                                                                                                                                        isParent: true,
                                                                                                                                                                        parent: "idk.ejs"
                                                                                                                                                                    }]
                                                                                                                                                                }).exec({
                                                                                                                                                                    "error": function(readJSONFile3) {
                                                                                                                                                                        return exits.error({
                                                                                                                                                                            data: readJSONFile3,
                                                                                                                                                                            status: 500
                                                                                                                                                                        });

                                                                                                                                                                    },
                                                                                                                                                                    "doesNotExist": function(readJSONFile3) {
                                                                                                                                                                        return exits.error({
                                                                                                                                                                            data: readJSONFile3,
                                                                                                                                                                            status: 500
                                                                                                                                                                        });

                                                                                                                                                                    },
                                                                                                                                                                    "couldNotParse": function(readJSONFile3) {
                                                                                                                                                                        return exits.error({
                                                                                                                                                                            data: readJSONFile3,
                                                                                                                                                                            status: 500
                                                                                                                                                                        });

                                                                                                                                                                    },
                                                                                                                                                                    "success": function(readJSONFile3) {
                                                                                                                                                                        // Marshal menu metadata
                                                                                                                                                                        sails.machines['_project_3549_0.0.43'].MarshaldocPageMetadata({
                                                                                                                                                                            "docPageMetadatas": readJSONFile3
                                                                                                                                                                        }).exec({
                                                                                                                                                                            "error": function(marshalMenuMetadata3) {
                                                                                                                                                                                return exits.error({
                                                                                                                                                                                    data: marshalMenuMetadata3,
                                                                                                                                                                                    status: 500
                                                                                                                                                                                });

                                                                                                                                                                            },
                                                                                                                                                                            "success": function(marshalMenuMetadata3) {
                                                                                                                                                                                // Resolve path
                                                                                                                                                                                sails.machines['2806adc7-0289-473a-8843-020526771565_1.2.0'].resolve({
                                                                                                                                                                                    "paths": ["views/partials/doc-menus/" + "version-notes" + ".jsmenu"]
                                                                                                                                                                                }).exec({
                                                                                                                                                                                    "error": function(resolvePath5) {
                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                            data: resolvePath5,
                                                                                                                                                                                            status: 500
                                                                                                                                                                                        });

                                                                                                                                                                                    },
                                                                                                                                                                                    "success": function(resolvePath5) {
                                                                                                                                                                                        // Read JSON file
                                                                                                                                                                                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_5.3.0'].readJson({
                                                                                                                                                                                            "source": resolvePath5,
                                                                                                                                                                                            "schema": [{
                                                                                                                                                                                                templateTitle: "Foo-Bar.ejs",
                                                                                                                                                                                                fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                                                                                                                                data: {
                                                                                                                                                                                                    displayName: "Foo Bar"
                                                                                                                                                                                                },
                                                                                                                                                                                                children: ["idk/foo-bar/something.ejs"],
                                                                                                                                                                                                isChild: true,
                                                                                                                                                                                                isParent: true,
                                                                                                                                                                                                parent: "idk.ejs"
                                                                                                                                                                                            }]
                                                                                                                                                                                        }).exec({
                                                                                                                                                                                            "error": function(readJSONFile4) {
                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                    data: readJSONFile4,
                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                });

                                                                                                                                                                                            },
                                                                                                                                                                                            "doesNotExist": function(readJSONFile4) {
                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                    data: readJSONFile4,
                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                });

                                                                                                                                                                                            },
                                                                                                                                                                                            "couldNotParse": function(readJSONFile4) {
                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                    data: readJSONFile4,
                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                });

                                                                                                                                                                                            },
                                                                                                                                                                                            "success": function(readJSONFile4) {
                                                                                                                                                                                                // Marshal menu metadata
                                                                                                                                                                                                sails.machines['_project_3549_0.0.43'].MarshaldocPageMetadata({
                                                                                                                                                                                                    "docPageMetadatas": readJSONFile4
                                                                                                                                                                                                }).exec({
                                                                                                                                                                                                    "error": function(marshalMenuMetadata4) {
                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                            data: marshalMenuMetadata4,
                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                        });

                                                                                                                                                                                                    },
                                                                                                                                                                                                    "success": function(marshalMenuMetadata4) {
                                                                                                                                                                                                        // Combine reference and version notes arrays
                                                                                                                                                                                                        sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_5.2.0'].concat({
                                                                                                                                                                                                            "firstArray": marshalMenuMetadata3,
                                                                                                                                                                                                            "secondArray": marshalMenuMetadata4
                                                                                                                                                                                                        }).exec({
                                                                                                                                                                                                            "error": function(combineReferenceAndVersionNotesArrays) {
                                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                                    data: combineReferenceAndVersionNotesArrays,
                                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                                });

                                                                                                                                                                                                            },
                                                                                                                                                                                                            "success": function(combineReferenceAndVersionNotesArrays) {
                                                                                                                                                                                                                // Combine the combined arrays
                                                                                                                                                                                                                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_5.2.0'].concat({
                                                                                                                                                                                                                    "firstArray": combineReferenceAndVersionNotesArrays,
                                                                                                                                                                                                                    "secondArray": combineAnatomyAndConceptsArrays
                                                                                                                                                                                                                }).exec({
                                                                                                                                                                                                                    "error": function(combineTheCombinedArrays) {
                                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                                            data: combineTheCombinedArrays,
                                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                                        });

                                                                                                                                                                                                                    },
                                                                                                                                                                                                                    "success": function(combineTheCombinedArrays) {
                                                                                                                                                                                                                        // Collate list of sitemap URLs
                                                                                                                                                                                                                        sails.machines['_project_3549_0.0.43'].getPagesForSitemap({
                                                                                                                                                                                                                            "docPageMetadatas": combineTheCombinedArrays
                                                                                                                                                                                                                        }).exec({
                                                                                                                                                                                                                            "error": function(collateListOfSitemapURLs) {
                                                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                                                    data: collateListOfSitemapURLs,
                                                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                                                });

                                                                                                                                                                                                                            },
                                                                                                                                                                                                                            "success": function(collateListOfSitemapURLs) {
                                                                                                                                                                                                                                // Build sitemap XML
                                                                                                                                                                                                                                sails.machines['_project_3549_0.0.43'].buildSitemapXml({
                                                                                                                                                                                                                                    "webpages": collateListOfSitemapURLs
                                                                                                                                                                                                                                }).setEnvironment({
                                                                                                                                                                                                                                    req: req,
                                                                                                                                                                                                                                    res: res,
                                                                                                                                                                                                                                    sails: sails
                                                                                                                                                                                                                                }).exec({
                                                                                                                                                                                                                                    "error": function(buildSitemapXML) {
                                                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                                                            data: buildSitemapXML,
                                                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                    "success": function(buildSitemapXML) {
                                                                                                                                                                                                                                        // Resolve path
                                                                                                                                                                                                                                        sails.machines['2806adc7-0289-473a-8843-020526771565_1.2.0'].resolve({
                                                                                                                                                                                                                                            "paths": ["assets/sitemap.xml"]
                                                                                                                                                                                                                                        }).exec({
                                                                                                                                                                                                                                            "error": function(resolvePath) {
                                                                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                                                                    data: resolvePath,
                                                                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                            "success": function(resolvePath) {
                                                                                                                                                                                                                                                // Write file
                                                                                                                                                                                                                                                sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_5.3.0'].write({
                                                                                                                                                                                                                                                    "destination": resolvePath,
                                                                                                                                                                                                                                                    "string": buildSitemapXML,
                                                                                                                                                                                                                                                    "force": true
                                                                                                                                                                                                                                                }).exec({
                                                                                                                                                                                                                                                    "error": function(writeFile) {
                                                                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                                                                            data: writeFile,
                                                                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                    "alreadyExists": function(writeFile) {
                                                                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                                                                            data: writeFile,
                                                                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                    "success": function(writeFile) {
                                                                                                                                                                                                                                                        return exits.respond({
                                                                                                                                                                                                                                                            action: "respond_with_status",
                                                                                                                                                                                                                                                            status: 200
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
                                                });

                                            }
                                        });

                                //     }
                                // });// </ if equal -- the comparison for the tokens>

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
