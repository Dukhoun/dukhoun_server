/**
 * Configuration for the Dukhoun server.
 *
 * SMTP settings are read from environment variables to avoid hard-coding
 * credentials in the repository. When deploying to Render, define the
 * following environment variables:
 *
 *   SMTP_HOST  – SMTP server hostname (e.g. smtp.gmail.com)
 *   SMTP_PORT  – SMTP server port (465 for SSL, 587 for TLS)
 *   SMTP_USER  – Username/email used for SMTP auth
 *   SMTP_PASS  – Password or App Password for SMTP auth
 *   MAIL_TO    – Default recipient for order notifications (optional)
 *   STRIPE_SECRET – Stripe secret key (optional)
 */
module.exports = {
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },
  // Where order notifications should be sent by default. If MAIL_TO is
  // undefined, fall back to SMTP_USER so at least the sender receives the mail.
  mailTo: process.env.MAIL_TO || process.env.SMTP_USER,
  // Stripe secret key, used for creating checkout sessions.
  stripeSecret:
    process.env.STRIPE_SECRET || 'sk_test_your_stripe_secret_key'
};
