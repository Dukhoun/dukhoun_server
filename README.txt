خادم Dukhoun
--------------------------

📦 يتكوّن من:
- server.js: الخادم الرئيسي
- routes/order.js: استقبال الطلبات
- config.js: إعدادات البريد وStripe
- orders.json: قاعدة بيانات محلية

🚀 لتشغيل الخادم:
1. تأكد أنك ثبّتت Node.js
2. في المجلد، شغّل:
   npm install express body-parser nodemailer stripe
3. ضع كلمة مرور تطبيق Gmail في config.js
4. ضع مفتاح Stripe السري الحقيقي
5. شغّل الخادم:
   node server.js

💳 عندما يرسل المستخدم نموذج طلب:
- يتم حفظه في orders.json
- يُرسل له بريد تأكيد
- يتم إنشاء رابط دفع عبر Stripe

⚠️ ملاحظات:
- احرص على حماية config.js في الإنتاج
- يمكنك لاحقًا ربط MongoDB بدلاً من orders.json