// routes/order.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config'); // ↩️ إذا لم يكن الملف داخل routes غيّرها إلى './config'

// مُتحقِّق بسيط للبريد
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ننشئ الناقل مرة واحدة
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure, // true إذا 465
  auth: {
    user: config.email.auth.user,
    pass: config.email.auth.pass
  }
});

// POST /order
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    // تحقق الحقول
    if (!name || !email || !message) {
      return res.status(400).send('جميع الحقول مطلوبة (name, email, message)');
    }
    if (!isEmail(email)) {
      return res.status(400).send('صيغة البريد الإلكتروني غير صحيحة');
    }

    // تجهيز الرسالة
    const mailOptions = {
      from: `"Dukhoun" <${config.email.auth.user}>`,
      to: config.mailTo || config.email.auth.user, // لو ما حدّدت MAIL_TO يستخدم حساب الإرسال
      replyTo: `${name} <${email}>`,
      subject: '✉️ طلب جديد من موقع Dukhoun',
      text:
`📦 تفاصيل الطلب:

👤 الاسم: ${name}
📧 البريد: ${email}

📝 الطلب:
${message}`
      // يمكنك إضافة html إن رغبت
      // html: `<p>...</p>`
    };

    await transporter.sendMail(mailOptions);

    // نجاح: إمّا تحويل لصفحة النجاح أو JSON
    // اختر واحدًا مما يلي:
    return res.redirect('https://dukhoun-server-10.onrender.com/success');
    // أو:
    // return res.json({ ok: true, message: 'تم إرسال الطلب بنجاح' });

  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).send('حدث خطأ أثناء الإرسال');
  }
});

module.exports = router;
