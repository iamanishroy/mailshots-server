module.exports = async (transporter, { as = "mailshots", email, to, cc, bcc, subject, text, html }) => {
    try {
        await transporter.sendMail({
            from: `"${as}" ${email}`,
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            text: text || null,
            html: html || null,
        });
        return true;
    } catch (e) {
        console.log(e, "77");
        return false;
    }
};