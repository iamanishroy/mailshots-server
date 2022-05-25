require('dotenv').config();
const { createTransport } = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const Oauth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

Oauth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const defaultTransporter = () => {
    const accessToken = Oauth2_client.getAccessToken();

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })
    return transporter;
}

const createTransporter = (host, port, email, password) => {
    const transporter = createTransport({
        host: host,
        port: port,
        secure: true,
        auth: {
            user: email,
            pass: password,
        },
    });
    return transporter;
}

module.exports = { defaultTransporter, createTransporter }