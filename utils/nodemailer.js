const nodemailer = require("nodemailer");


 function sendMail(subject,message){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sahaanik1045@gmail.com",
          pass: "hjdk ajbo mlrp jrxy"
        },
      });
      
      // Define the email message
      const mailOptions = {
        from:process.env.APP_EMAIL_SECRET,
        to: "sahaanik1048@gmail.com",
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
