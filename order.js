// routes/order.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config'); // غيّر إلى './config' إذا الملف بالجذر

// إنشاء ناقل البريد مرة واحدة من إعدادات البيئة
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure, // true عندما المنفذ 465
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass
  }
});

// POST /order  — يستقبل الطلب، يرسل إيميل، ثم يحول لصفحة النجاح
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
      to: config.mailTo || config.email.auth.user, // لو ما ضفت MAIL_TO، سيستخدم بريد الإرسال
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

    // تحويل لصفحة النجاح
    return res.redirect('https://dukhoun-server-10.onrender.com/success');

  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).send('حدث خطأ أثناء الإرسال');
  }
});

module.exports = router;
