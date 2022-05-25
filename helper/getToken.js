const { v4: uuidv4 } = require("uuid");
const isValidHostname = require('is-valid-hostname')
const validator = require("email-validator");
const db = require('./firebase');

module.exports = async (req, res) => {
    let { host, port, name, email, password, domain = "*" } = req.body;

    if (!isValidHostname(host)) {
        return res.status(400).json({
            status: false,
            message: "Invalid Host"
        });
    }

    if (!validator.validate(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid Email ID"
        });
    }

    try {
        port = parseInt(port);
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            status: false,
            message: "Invalid Port"
        });
    }

    var token = uuidv4();

    db.ref('tokens/' + token + "/").set({
        host: host.trim(),
        port: port,
        name: name || "",
        mailID: email,
        password: password,
        authorized_domain: domain.split(",").map((d) => d.trim()),
    }).then(() => {
        return res.status(200).json({
            status: true,
            message: token,
        });
    }).catch(() => {
        return res.status(500).json({
            status: false,
            message: "error while generating token",
        });
    });
};