const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config');

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass
    }
  });

  const mailOptions = {
    from: config.email.auth.user,
    to: config.mailTo,
    subject: `طلب جديد من موقع Dukhoun`,
    text: `الاسم: ${name}\nالإيميل: ${email}\nالرسالة:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('حدث خطأ أثناء الإرسال');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('https://dukhoun-server-10.onrender.com/success');
    }
  });
});

module.exports = router;
