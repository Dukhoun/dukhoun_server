const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config');

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass
    }
  });

  const mailOptions = {
    from: config.email.auth.user,
    to: config.email.auth.user,
    subject: 'طلب جديد من موقع Dukhoun',
    text: `الاسم: ${name}\nالإيميل: ${email}\nالطلب:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('حدث خطأ أثناء الإرسال');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/success');
    }
  });
});

module.exports = router;
