# الابدأ السريع - إصلاح مشكلة التسجيل

## المشكلة: مش راضى يسجل دخول أو ينشئ حساب

## الحل بـ 3 خطوات:

### 1️⃣ احصل على Supabase Credentials
```
اذهب إلى: https://app.supabase.com
Settings → API
انسخ: Project URL و Anon public key
```

### 2️⃣ حدّث .env.local
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_ANON_KEY
```

### 3️⃣ أعد تشغيل المشروع
```bash
npm run dev
```

---

## ✓ اختبر النتيجة:
- افتح: http://localhost:5173/auth
- يجب تشوف: "✓ متصل بـ Supabase بنجاح"
- جرّب التسجيل

---

## 📖 للمزيد من المعلومات:
- اقرأ: `AUTH_SOLUTION.md`
- اقرأ: `AUTH_DEBUG_GUIDE.md`
- اقرأ: `FINAL_FIX_SUMMARY.txt`

---

## 🔍 إذا لم يعمل:
1. افتح Developer Console (F12)
2. ابحث عن رسائل `[v0]`
3. هذه الرسائل ستخبرك بالمشكلة بالضبط
