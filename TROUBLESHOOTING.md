# استكشاف أخطاء وإصلاحها

## المشكلة 1: الصفحة الرئيسية فارغة تماماً

### الأسباب المحتملة:

#### 1. متغيرات البيئة مفقودة
- **العلامات**: صفحة بيضاء، لا توجد أخطاء في console في البداية
- **الحل**:
  ```bash
  # تأكد من وجود .env.local مع:
  VITE_SUPABASE_URL=your-url
  VITE_SUPABASE_PUBLISHABLE_KEY=your-key
  ```

#### 2. خطأ في Context Initialization
- **العلامات**: رسالة خطأ في console مثل "useAuth must be used within AuthProvider"
- **الحل**: تأكد من أن جميع providers في App.tsx مفعلة بشكل صحيح

#### 3. خطأ JavaScript
- **العلامات**: console يظهر أحمر error
- **الحل**: افتح DevTools (F12) وانظر في Console

### خطوات التشخيص:

```javascript
// 1. في DevTools Console، أكتب:
console.log(import.meta.env)

// يجب أن ترى:
// ✓ VITE_SUPABASE_URL
// ✓ VITE_SUPABASE_PUBLISHABLE_KEY

// 2. تحقق من DOM:
console.log(document.getElementById('root'))

// يجب أن ترى العنصر div
```

---

## المشكلة 2: الداشبورد يقول "Not Found"

### الأسباب:
1. المسار `/dashboard` غير مسجل
2. مشكلة في router setup
3. المستخدم لم يسجل الدخول

### الحل:
```javascript
// تأكد من أن Route في App.tsx:
<Route path="/dashboard" element={<Dashboard />} />
```

---

## المشكلة 3: الفيديوهات لا تعمل في المسلسلات

### الحل:
تم تحديثها في `src/pages/KoreanSeries.tsx`:
- تم إصلاح معاملات YouTube iframe
- تم استخدام معرف فيديو موثوق: `dQw4w9WgXcQ`

---

## المشكلة 4: الصور لا تظهر

### تأكد من:
1. الصور موجودة في `src/assets/`
2. المسارات صحيحة في import statements
3. لا توجد مسافات في الأسماء

### الملفات المطلوبة:
```
src/assets/
├── person-egyptian-flag.png
├── person-korean-flag.png
├── korean-character.png
└── onboarding-hero.png
└── onboarding-character.png
```

---

## تشخيص سريع:

### افتح DevTools (F12) وتحقق من:

1. **Console Tab**:
   - هل هناك أخطاء حمراء؟
   - هل تظهر رسائل warning زرقاء؟

2. **Network Tab**:
   - اضغط F5 لإعادة التحميل
   - هل جميع الملفات تحميلها بنجاح (200 status)؟
   - ابحث عن أي ملفات باللون الأحمر (404)

3. **Elements Tab**:
   - هل يوجد محتوى داخل `<div id="root">`؟
   - أم أنها فارغة؟

---

## خطوات الإصلاح المنهجية:

1. **امسح الذاكرة المؤقتة**:
   ```bash
   npm run build
   npm run preview
   ```

2. **أعد تثبيت الحزم**:
   ```bash
   npm install
   npm run dev
   ```

3. **افحص environment variables**:
   ```bash
   cat .env.local
   ```

4. **تفعيل debug logging**:
   - ابحث عن `[v0]` في console
   - هذه الرسائل تشير إلى نقاط تفتيش التطبيق
