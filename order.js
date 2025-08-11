const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('./config');

// \u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 POST \u0645\u0633\u0627\u0631 '/'
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0644 \u0645\u0637\u0644\u0648\u0628\u0629 (name, email, message)');
  }

  // \u0625\u0639\u062f\u0627\u062f \u0646\u0627\u0642\u0644 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a
  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass
    }
  });

  // \u0625\u0639\u062f\u0627\u062f \u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0631\u0633\u0627\u0644\u0629
  const mailOptions = {
    from: config.email.auth.user,
    to: config.mailTo,
    subject: '\ud83d\udc8c \u0637\u0644\u0628 \u062c\u062f\u064a\u062f \u0645\u0646 \u0645\u0648\u0642\u0639 Dukhoun',
    text: `\ud83d\udce6 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628:\n\n\ud83e\uddd0\u200d\u2642\ufe0f \u0627\u0644\u0627\u0633\u0645: ${name}\n\ud83d\uDCE7 \u0627\u0644\u0628\u0631\u064a\u062f: ${email}\n\uD83D\uDCDD \u0627\u0644\u0637\u0644\u0628:\n${message}`
  };

  // \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0631\u064a\u062f
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).send('\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u0625\u0631\u0633\u0627\u0644');
    } else {
      console.log('\u2705 \u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0631\u064a\u062f \u0628\u0646\u062c\u0627\u062d', info.response);
      return res.redirect('https://dukhoun-server-10.onrender.com/success');
    }
  });
});

module.exports = router;
