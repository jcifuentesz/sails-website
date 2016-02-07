var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "security-policy",
                    data: {
                        title: "Security | Sails.js",
                        description: "Sails.js security policy and how to report security vulnerabilities."
                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};