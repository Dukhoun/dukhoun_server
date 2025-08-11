// routes/order.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config'); // غيّرها إلى './config' إذا لم يكن الملف داخل مجلد routes

// إنشاء ناقل البريد من إعدادات البيئة
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure, // true عندما يكون المنفذ 465
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass
  }
});

// تحقق اتصال SMTP عند تشغيل السيرفر (للتشخيص)
transporter.verify()
  .then(() => {
    console.log('SMTP is ready ✅:', config.email.host, config.email.auth.user);
  })
  .catch(err => {
    console.error('SMTP verify failed ❌:', err);
  });

// POST /order — يستقبل الطلب، يرسل إيميل، ثم يحول لصفحة النجاح
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    // تحقق بسيط
    if (!name || !email || !message) {
      return res.status(400).send('جميع الحقول مطلوبة (name, email, message)');
    }

    // رسالة إلى صاحب المتجر
    await transporter.sendMail({
      from: `"Dukhoun" <${config.email.auth.user}>`,
      to: config.mailTo || config.email.auth.user, // لو MAIL_TO غير موجود يستخدم بريد الإرسال
      replyTo: `${name} <${email}>`,
      subject: '✉️ طلب جديد من موقع Dukhoun',
      text:
`📦 تفاصيل الطلب:

👤 الاسم: ${name}
📧 البريد: ${email}

📝 الطلب:
${message}`
    });

    // (اختياري) تأكيد للعميل
    if (email) {
      await transporter.sendMail({
        from: `"Dukhoun" <${config.email.auth.user}>`,
        to: email,
        subject: 'تم استلام طلبك ✅',
        text: 'شكرًا لتواصلك! استلمنا طلبك وسنتواصل معك قريبًا.'
      });
    }

    // نجاح → تحويل لصفحة النجاح
    return res.redirect('https://dukhoun-server-10.onrender.com/success');

  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).send('حدث خطأ أثناء الإرسال');
  }
});

module.exports = router;
