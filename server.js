const express = require('express');
const bodyParser = require('body-parser');
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

// Routes
app.use('/order', orderRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
