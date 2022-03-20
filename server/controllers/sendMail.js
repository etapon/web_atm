import nodemailer from 'nodemailer'
import {google} from 'googleapis'
import dotenv from 'dotenv'
const {OAuth2} = google.auth
// import { OAuth2Client } from 'google-auth-library';
dotenv.config()
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAIL_SERVICE_CLIENT_ID,
    MAIL_SERVICE_CLIENT_SECRET,
    MAIL_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2 (
    MAIL_SERVICE_CLIENT_ID,
    MAIL_SERVICE_CLIENT_SECRET,
    MAIL_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
)

export const sendMail = (to, url) => {
    oauth2Client.setCredentials({
        refresh_token: MAIL_SERVICE_REFRESH_TOKEN
    })
    const accessToken = oauth2Client.getAccessToken()
    console.log(accessToken)
    const smTpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAIL_SERVICE_CLIENT_ID,
            clientSecret: MAIL_SERVICE_CLIENT_SECRET,
            refreshToken: MAIL_SERVICE_REFRESH_TOKEN
        }
    })
    console.log('ok nakagawang transport')
    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "E-Tapon Mo",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to E-Tapon Mo.</h2>
            <center>
            <p>Congratulations! You're almost set to start using E-Tapon Mo.
                Just click the button below to validate your email address.
            </p>
            
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Validate My Account</a>
            </center>
            </div>
        `
    }
    smTpTransport.sendMail(mailOptions, (err, info) => {
        console.log('nakapasok sa smtptransport')
        if(err) return err;
        return info;
    })
}
