const  nodemailer = require("nodemailer");
const {MAIL_INIT,PASSWORD_MAILER}=require("../constants");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: MAIL_INIT, // generated ethereal user
      pass: PASSWORD_MAILER, // generated ethereal password
    },
  });


  transporter.verify().then(()=>{
    console.log('Ready for sen emails');
  })


  module.exports={
    transporter
  }