const validateDomain = require("./validateDomain")
const db = require('./firebase');
const { createTransporter, defaultTransporter } = require('./transporter');
const mailer = require("./mailer");

module.exports = async (req, res) => {
    let { token, to, bcc, cc, subject, text, html } = req.body;

    if (!token) {
        if (await mailer(defaultTransporter(), { to, subject, text })) {
            return res.status(200).json({
                status: true,
                message: "email sent"
            });
        } else {
            return res.status(500)
                .json({
                    status: false,
                    message: "error faced while sending email maybe due to invalid credentials"
                });
        }
    }
    return db.ref('tokens/' + token)
        .once("value")
        .then(async (snapshot) => {
            if (snapshot.val()) {
                const { host, port, name, mailID, password, authorized_domain } = snapshot.val();

                if (!validateDomain(authorized_domain, req.headers.origin)) {
                    return res.status(400)
                        .json({
                            status: false,
                            message: "unauthorized domain"
                        });
                }

                const transporter = createTransporter(host, port, mailID, password);

                if (await mailer(transporter, { as: name, email: mailID, to, cc, bcc, subject, text, html })) {
                    return res.status(200).json({
                        status: true,
                        message: "email sent"
                    });
                } else {
                    return res.status(500)
                        .json({
                            status: false,
                            message: "error faced while sending email maybe due to invalid credentials"
                        });
                }

            } else {
                return res.status(400)
                    .json({
                        status: false,
                        message: "invalid token"
                    });
            }

        }).catch((e) => {
            console.log(e)
            return res.status(500)
                .json({
                    status: false,
                    message: "error faced while accessing token"
                });
        })
}
