const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";

exports.sendVerificationEmail = async (email, name, url) => {

  const auth = new OAuth2(
    process.env.MAILING_ID,
    process.env.MAILING_SECRET,
    // process.env.MAILING_REFRESH_TOKEN,
    oauth_link
  );
  auth.setCredentials({
    refresh_token: process.env.MAILING_REFRESH_TOKEN
  });
  const accessToken = await new Promise((resolve, reject) => {
    auth.getAccessToken((err, token) => {
      if (err) {
        reject(`Failed to create access token: ${err}`)
      }
      resolve(token);
    })
  });
  // const accessToken = await auth.getAccessToken();

  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.MAILING_ID,
      clientSecret: process.env.MAILING_SECRET,
      refreshToken: process.env.MAILING_REFRESH_TOKEN,
      accessToken
    }
  })
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Facebook-clone email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998">
    <span>Action required: Activate your facebook-clone account</span>
    </div>
    <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:16px;font-family:Roboto">
    <span>Hello, ${name}</span>
    <div style="padding:20px 0">
    <span style="padding:1.5rem 0">
    You recently created an account on Facebook-clone. To complete your registration, please confirm your account
    </span>
    </div>
    <a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:white;text-decoration:none;font-weight:600">Confirm
    your account</a>
    <br />
    </div>`
  }
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res
  })
}