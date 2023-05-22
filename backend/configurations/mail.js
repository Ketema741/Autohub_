require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_CLIENT_REDIRECT_URL
);

OAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_CLIENT_REFRESH_TOKEN,
});
 
const sendMail = async (mailOptions) => {
  try {
    const accessToken = await OAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_USER_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_CLIENT_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const result = transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log("Error!!", error);
  }
};
 

module.exports = {
  sendMail,
};
