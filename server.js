const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

const config = require('./config');
const stripe = require('stripe')(config.stripeSecret);
const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/order', orderRoutes);

// إرسال الطلب إلى البريد الإلكتروني
app.post('/submit-order', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass,
    },
  });

  const mailOptions = {
    from: email,
    to: config.email.auth.user,
    subject: '📦 طلب جديد من موقع دخون',
    text: `الاسم: ${name}\nالبريد: ${email}\nالطلب:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/success');
  } catch (error) {
    console.error('فشل في إرسال البريد:', error);
    res.status(500).send('حدث خطأ أثناء إرسال الطلب.');
  }
});

// صفحات الموقع
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.get('/order-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
