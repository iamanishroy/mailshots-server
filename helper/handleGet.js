require("dotenv").config();
const { defaultTransporter } = require("./transporter");
const mail = require("./mailer");
const validator = require("email-validator");

module.exports = async (req, res) => {
    let { to, subject, body } = req.query;

    if (!validator.validate(to)) {
        return res.status(400).json({
            status: false,
            message: "Invalid Email ID"
        });
    }

    if (!!to && !!body) {
        if (!subject) {
            subject = body.substring(0, 24);
        }

        if (await mail(defaultTransporter(), {
            to: to,
            subject: subject,
            text: body,
        })) {
            res.status(200).json({ status: true });
        } else {
            res.status(400).json({ status: false });
        }
    } else {
        res.status(400).json({ status: false });
    }
}

