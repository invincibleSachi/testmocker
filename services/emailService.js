"use strict";
const nodemailer = require("nodemailer");
const constants = require("../constants");
var sendMail = function(to, subject, content) {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: constants.email, // generated ethereal user
      pass: constants.passwd // generated ethereal password
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: constants.from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: content, // plaintext body
    html: content // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};
module.exports = {
  sendRegistrationOTP: function(otp, emailId, userId) {
    let subject = "Welcome to GoIndia Online Business portal";
    //<b>Welcome from goIndiaOnline. <br>'+content+'</b>'
    let content =
      "<b> Hi " +
      userId +
      ', Greetings!! <br><br> Welcome from goIndiaOnline.com <br> your otp for registration is :: <font color="red">' +
      otp +
      "</font></br>";
    sendMail(emailId, subject, content);
  }
};
