// ملف جافاسكريبت لموقع دخون
// يقوم بتحديث سنة حقوق الطبع والنشر ومعالجة إرسال نموذج الاتصال.

document.addEventListener('DOMContentLoaded', () => {
  // تحديث نص حقوق الطبع والنشر مع السنة الحالية
  const copyrightEl = document.getElementById('copyright');
  const year = new Date().getFullYear();
  copyrightEl.textContent = `حقوق الطبع والنشر © ${year} دخون. جميع الحقوق محفوظة.`;

  // اعتراض إرسال نموذج الاتصال وعرض رسالة شكر
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('شكراً لتواصلك معنا! سنقوم بالرد عليك قريباً.');
    form.reset();
  });

  // معالجة زر "اطلب الآن" في بطاقات المنتجات
  // نحصل على كل أزرار الطلب التي تحمل الفئة order-now-btn. استخدمنا عناصر button
  // لتجنب إعادة تحميل الصفحة عند النقر، وبالتالي فإن هذا الاختيار أكثر وضوحًا.
  const orderButtons = document.querySelectorAll('.order-now-btn');
  const orderModal = document.getElementById('order-modal');
  const closeOrderModalBtn = document.getElementById('close-order-modal');

  // إظهار الصندوق عند الضغط على أي زر طلب
  orderButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (orderModal) {
        orderModal.classList.remove('hidden');
      }
    });
  });

  // إغلاق الصندوق عند الضغط على زر الإغلاق
  if (closeOrderModalBtn) {
    closeOrderModalBtn.addEventListener('click', () => {
      orderModal.classList.add('hidden');
    });
  }

  // إغلاق الصندوق عند النقر خارج محتواه
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        orderModal.classList.add('hidden');
      }
    });
  }
});
