const nodemailer = require("nodemailer");

// smtp 메일 정보
const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  pool: true,
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: "EMAIL",
    pass: "PASSWORD"
  },
  tls: {
    rejectUnauthorized: false,
  }
});

module.exports = {
  smtpTransport
};
