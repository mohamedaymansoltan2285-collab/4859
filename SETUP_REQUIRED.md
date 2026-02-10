# متطلبات الإعداد الحتمي

## المشكلة: الصفحة الرئيسية فارغة

### السبب الرئيسي:
المشروع يحتاج إلى متغيرات البيئة الخاصة بـ Supabase لكي يعمل:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### الحل:

#### 1. في بيئة التطوير المحلية:
أنشئ ملف `.env.local` في جذر المشروع:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

#### 2. عند النشر على Vercel:
اذهب إلى إعدادات Vercel وأضف متغيرات البيئة:
- Settings → Environment Variables
- أضف المتغيرات المطلوبة

#### 3. للحصول على قيم Supabase:
1. اذهب إلى https://supabase.com
2. سجل الدخول أو انشئ حساب جديد
3. اختر مشروعك
4. اذهب إلى Settings → API
5. انسخ:
   - Project URL → VITE_SUPABASE_URL
   - Publishable Key (anon) → VITE_SUPABASE_PUBLISHABLE_KEY

### ملفات مهمة:
- `.env.example` - نموذج متغيرات البيئة
- `.env.local` - متغيرات التطوير (لا تنسَ .gitignore)
- `src/integrations/supabase/client.ts` - ملف الاتصال

### خطوات اختبار:
1. شغّل المشروع محلياً: `npm run dev`
2. افتح المتصفح: http://localhost:8080
3. يجب أن تظهر الصفحة الرئيسية
4. اختبر الملاحة إلى `/dashboard`

### إذا كانت الصفحة فارغة:
1. افتح Console في DevTools (F12)
2. ابحث عن رسائل الخطأ
3. تحقق من `.env.local` والقيم الصحيحة
4. تأكد من عدم وجود أخطاء في Network tab
