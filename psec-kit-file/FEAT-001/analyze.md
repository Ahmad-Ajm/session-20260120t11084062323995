# FEAT-001 – UX/UI (Baseline/System) – Analysis

## Context
هذه الميزة تؤسس طبقة UI baseline التي ستبنى عليها بقية الميزات. المطلوب scaffolding عملي وليس تصميم نهائي.

## Key Constraints
- Stack إلزامي: ABP + Angular.
- دعم العربية والإنجليزية مع RTL/LTR.
- عدم التوسع في ميزات أخرى (Landing/Auth/Profile/…)

## UX/IA Notes
- فصل منطقتين في routing:
  - Public: صفحات عامة (حالياً placeholders فقط)
  - App area: صفحات داخلية داخل shell layout
- Navigation يجب أن يكون قابلاً للتوسع لاحقاً بحسب account type والـ permissions.

## Technical Approach
- إنشاء `LayoutModule` يضم Shell components.
- تعريف routes مع placeholder pages.
- i18n:
  - ملفات `assets/i18n/en.json` و `assets/i18n/ar.json`
  - استخدام pipe `| translate` في القوالب.
- RTL:
  - خدمة واحدة مسئولة عن تطبيق `dir/lang` وتخزين اللغة.
  - CSS minimal fixes لتوافق sidebar.

## Edge Cases
- مستخدم يبدّل اللغة ثم يعيد تحميل الصفحة: يجب استرجاع اللغة.
- مسارات غير معروفة: fallback إلى NotFound.
- اختلافات ABP template: قد تكون هناك بنية جاهزة للـ Layout؛ يجب دمج العمل معها بدل ازدواجية.

## Open Questions (للتأكيد من Orchestrator إن لزم)
- هل نحتاج لغة افتراضية `ar` بدل `en` للسوق السعودي؟ (حاليًا افتراض en مع fallback للمتصفح.)
- هل نرغب بإظهار toggle اللغة في Public و App area معاً؟ (حاليًا نعم داخل Topbar في shell؛ للـ public يمكن reuse.)
