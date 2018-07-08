import nodemailer from 'nodemailer';

require('dotenv').config();

const from = '"WeConnect" <info@weconnect.com>';
/**
 * setup
 * @desc setup for nodemailer messages
 * @return {Object} setup
 */
function setup() {
  return nodemailer.createTransport({
    secure: false,
    // host: process.env.EMAIL_HOST,
    service: 'gmail',
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
}

/**
 * confirmationEmail
 * @desc sends confirmation mail to the user
 * @param {Object} user
 * @return {Object} email
 */
export function confirmationEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Welcome to Weconnect',
    html: `
    <div style="height: 100%; width:100%; font-family: Geneva, Tahoma, sans-serif;">
      <div style="width: 80%; margin: 20px auto">
        <h2>Hello ${user.firstname},</h2>
        <p>
          Thank you for registering on <a href="https://weconnect-orelongz.herokuapp.com/">Weconnect</a>,
          the platform that brings businesses and individuals together
        </p>
        <p>
          Kindly verify your account by clicking on
          <button style="padding: 10px 20px; background-color: steelblue">
            <a style="color: white; text-decoration: none" href="${process.env.HOST_APP}/verify/${user.verificationToken}">VERIFY</a>
          </button>
        </p>
      </div>
    </div>
    `
  };

  tranport.sendMail(email);
}

/**
 * confirmationEmail
 * @desc sends confirmation mail to the user
 * @param {Object} mailObject
 * @return {Object} email
 */
export function contactUsMails(mailObject) {
  const tranport = setup();
  const userMail = {
    from,
    to: mailObject.email,
    subject: 'Weconnect Enquiry acknowledgement',
    html: `
    <div style="height: 100%; width:100%; font-family: Geneva, Tahoma, sans-serif;">
      <div style="width: 80%; margin: 20px auto">
        <h2>Hello ${mailObject.name},</h2>
        <p>
          We apprieciate you taking time to send us a message and be sure that
          one of our agents would get back to you as soon as possible.
        </p>
      </div>
    </div>
    `
  };

  const adminMail = {
    from,
    to: 'longpeezy@yahoo.com',
    subject: 'A new enquiry on WeConnect',
    html: `
    <div style="height: 100%; width:100%; font-family: Geneva, Tahoma, sans-serif;">
      <div style="width: 80%; margin: 20px auto">
        Dear Admin,
        <p>
          A new enquiry was just made by <b>${mailObject.name}</b> on weconnect
        </p>
        <b>Message:</b>
        <p>${mailObject.message}</p>
      </div>
    </div>
    `
  };

  tranport.sendMail(userMail);
  tranport.sendMail(adminMail);
}
