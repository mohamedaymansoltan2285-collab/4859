# دليل تصحيح مشاكل التوثيق (Authentication)

## المشكلة: لا يعمل التسجيل أو إنشاء حساب

### الأسباب المحتملة:

1. **متغيرات البيئة غير مكتملة**
2. **Supabase لم يتم تفعيل Authentication عليه**
3. **مشكلة في إعدادات CORS**
4. **مشكلة في Supabase Configuration**

---

## الحل الخطوة بخطوة:

### Step 1: تحقق من متغيرات البيئة

```bash
# افتح ملف .env.local وتأكد من أن القيم كاملة:
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_ANON_KEY_HERE
```

> **مهم:** استبدل `YOUR_PROJECT` و `YOUR_ANON_KEY_HERE` بقيمك الفعلية من Supabase

### Step 2: تحقق من Supabase Dashboard

1. اذهب إلى https://app.supabase.com
2. اختر مشروعك
3. انقر على **Settings** → **API**
4. انسخ **Project URL** (هذا هو SUPABASE_URL)
5. انسخ **Anon public key** (هذا هو SUPABASE_PUBLISHABLE_KEY)

### Step 3: فعّل Email Authentication

1. في Supabase Dashboard، اذهب إلى **Authentication** → **Providers**
2. تأكد من تفعيل **Email** provider
3. تأكد من أن **Email Confirmations** مفعل

### Step 4: افتح Developer Console وابحث عن الأخطاء

1. اضغط `F12` في المتصفح
2. اذهب إلى **Console** tab
3. حاول التسجيل مرة أخرى
4. ابحث عن الرسائل التي تبدأ بـ `[v0]`

### الأخطاء الشائعة وحلولها:

| الخطأ | السبب | الحل |
|------|------|-----|
| `Failed to load resource: net::ERR_NAME_NOT_RESOLVED` | URL خاطئ | تحقق من SUPABASE_URL |
| `Invalid API Key` | مفتاح خاطئ | تحقق من SUPABASE_PUBLISHABLE_KEY |
| `Email not confirmed` | التأكيد بالبريد | تفعيل Email Confirmations أو تعطيله |
| `User already registered` | البريد موجود | استخدم بريد جديد أو استعد كلمة المرور |

---

## خطوات الاختبار:

### Test 1: اختبر الاتصال بـ Supabase

افتح Console واكتب:
```javascript
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
console.log('Supabase URL:', url);
console.log('Supabase Key exists:', !!key);
```

### Test 2: اختبر التسجيل ببيانات بسيطة

استخدم:
- Email: `test@example.com`
- Password: `Test@123456` (يجب أن تكون قوية)

### Test 3: تحقق من Supabase Logs

1. اذهب إلى Supabase Dashboard
2. اذهب إلى **Authentication** → **Users**
3. انظر إذا تم إنشاء المستخدم

---

## إذا استمرت المشكلة:

### تحقق من CORS Settings

في Supabase Dashboard:
1. **Settings** → **API**
2. ابحث عن **CORS Configuration**
3. أضف `http://localhost:5173` إلى القائمة

### أعد تشغيل المشروع

```bash
# أوقف تشغيل المشروع
Ctrl + C

# نظف الـ cache
rm -rf node_modules/.vite

# أعد التشغيل
npm run dev
```

---

## معلومات مفيدة:

- **Supabase Console**: https://app.supabase.com
- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Supabase JavaScript SDK**: https://supabase.com/docs/reference/javascript
