const nodemailer = require("nodemailer");


 function sendMail(subject,message,sendEmail){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.APP_EMAIL_SECRET,
          pass: process.env.APP_EMAIL_PASSWORD
        },
      });
      
      // Define the email message
      const mailOptions = {
        from:process.env.APP_EMAIL_SECRET,
        to: sendEmail,
        subject: subject,
        text: message,
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return false;
        } else {
          console.log("Email sent:", info.response);
          return true;
        }
      });

 }
 
module.exports = sendMail;
