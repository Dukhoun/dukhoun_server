const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config');

// مسار POST لمعالجة إرسال الطلب
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('جميع الحقول مطلوبة');
  }

  // إعداد ناقل البريد الإلكتروني
  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass
    }
  });

  // إعداد محتوى الرسالة
  const mailOptions = {
    from: config.email.auth.user,
    to: config.email.auth.user,
    subject: '📥 طلب جديد من موقع Dukhoun',
    text: `🧾 تفاصيل الطلب:\n\n👤 الاسم: ${name}\n📧 الإيميل: ${email}\n📝 الطلب:\n${message}`
  };

  // إرسال البريد
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
     console.error("Email error:", error);
      return res.status(500).send('حدث خطأ أثناء الإرسال');
    } else {
      console.log('✅ تم إرسال البريد بنجاح:', info.response);
      return res.redirect('/success');
    }
  });
});

module.exports = router;
