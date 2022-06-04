const nodemailer = require("nodemailer");
const user = require("../../credentials");

async function sendEmail(list, subject, body) {
  console.log("mailer was called", user,list,subject,body);
  let transporter = nodemailer.createTransport({
    domains: ["aol.com"],
    host: "smtp.aol.com",
    port: 587,
    auth: {
      user: user.id,
      pass: user.password,
    },
  });

  list.forEach(async (email) => {
    await transporter.sendMail({
      from: '"PingMan" <' + user.id + ">",
      to: email,
      subject: subject,
      text: body,
    })
  });
}

module.exports = sendEmail;