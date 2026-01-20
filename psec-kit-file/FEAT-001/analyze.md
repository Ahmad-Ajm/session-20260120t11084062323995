# FEAT-001 – UX/UI (Baseline/System) – Analysis

## Context
الميزة FEAT-001 هي أساس واجهة Projment، وتُستخدم كاعتماد (Dependency) لمعظم الميزات اللاحقة. المطلوب “Scaffolding” عملي: Layout/Routing/i18n/RTL بدون منطق أعمال أو صفحات فعلية للميزات.

## Key Constraints
- Stack إلزامي: C# + ABP + Angular (مع ABP default theme كبداية).
- دعم عربي/إنجليزي مع RTL/LTR.
- عدم بناء أي features أخرى ضمن هذا النطاق (فقط placeholders).

## UX/IA Notes
- فصل منطقي للـ routes:
  - Public: `/` (placeholder فقط حاليًا)
  - App area: `/app/...` داخل Shell layout (يمثل ما بعد الدخول لاحقًا)
- Navigation baseline يجب أن تكون قابلة للتوسع لاحقًا (حسب persona/account type/permissions) بدون إعادة بناء.

## Technical Approach
- الاستفادة من قالب ABP Angular قدر الإمكان:
  - إن كان ABP template يوفر Layout جاهز، يتم **تغليفه/توسيعه** بدل إنشاء بديل متعارض.
  - إن لم يوفر، يتم إنشاء `LayoutModule` ومكونات Shell.
- i18n:
  - استخدام ABP localization (ngx-translate) مع ملفات JSON للمفاتيح الخاصة بالتطبيق.
- RTL/LTR:
  - تطبيق اتجاه الصفحة عبر `document.documentElement.dir`.
  - الإبقاء على CSS overrides محدودة لتفادي كسر الـ theme.

## Edge Cases
- حفظ اللغة وإعادة تطبيقها بعد reload.
- اختلاف نسخة ABP/Angular قد يغيّر:
  - مواقع ملفات الترجمة
  - بنية الـ modules والـ routes
- RTL: بعض مكونات الـ theme قد تحتاج overrides إضافية (تُؤجل إلى حين ظهور المشكلة).

## Open Questions (لـ Orchestrator إذا لزم)
- هل اللغة الافتراضية المطلوبة للسوق المستهدف هي `ar` بدل `en`؟ (حالياً: saved > browser(ar) > en)
- هل نحتاج language switcher أيضاً في صفحة `/` العامة (public) أم يكفي داخل shell؟ (حالياً: داخل topbar في shell، ويمكن إعادة استخدامه لاحقاً في landing)
