const express = require('express');
const fs = require('fs');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config');
const stripe = require('stripe')(config.stripeSecret);

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: config.email.auth
});

router.post('/', async (req, res) => {
  const order = req.body;
  const dataPath = './orders.json';
  const orders = fs.existsSync(dataPath)
    ? JSON.parse(fs.readFileSync(dataPath))
    : [];

  orders.push(order);
  fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

  const mailOptions = {
    from: config.email.auth.user,
    to: order.email,
    subject: 'تأكيد طلبك من Dukhoun',
    text: `شكرًا لطلبك! سنعاود التواصل معك قريبًا.`
  };

  try {
    await transporter.sendMail(mailOptions);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'طلب من Dukhoun' },
          unit_amount: 1000
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'https://yourdomain.com/success',
      cancel_url: 'https://yourdomain.com/cancel'
    });
    res.json({ message: 'تم استلام الطلب!', paymentUrl: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب' });
  }
});

module.exports = router;