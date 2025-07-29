# Dukhoun Server

خادم Node.js لمعالجة طلبات موقع Dukhoun

## الميزات
- استقبال الطلبات من الواجهة
- تخزين البيانات في `orders.json`
- إرسال رسالة تأكيد عبر Gmail
- إنشاء رابط دفع عبر Stripe

## التحضير للنشر على Render
1. أنشئ مستودعًا جديدًا على GitHub باسم `dukhoun_server` وارفع جميع الملفات.
2. سجّل في [Render.com](https://render.com) واربط المستودع الجديد.
3. إعدادات الخدمة:
   - **Start Command**: `npm start`
   - **Build Command**: (اتركها فارغة)
   - **Environment**: Node.js
   - **Port**: 5000
4. اضغط Deploy → سيتم توليد رابط الخدمة مثل `https://dukhoun-server.onrender.com`

## التشغيل محليًا
```bash
npm install
npm start
```