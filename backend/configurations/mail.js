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
    throw new Error(error.message);
  }
};
const sendResetPasswordEmail = async (email, resetLink) => {
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
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
      <p>You have requested to reset your password. Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
    };

    const result = transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  sendMail,
  sendResetPasswordEmail,
};
