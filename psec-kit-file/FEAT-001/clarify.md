# Clarification & Decisions – FEAT-001

## 1. Executive Summary
- تهدف هذه الميزة إلى تجهيز **Baseline** لواجهة Angular في مشروع Projment (ضمن ABP Angular) يشمل: **Layout موحّد، Navigation، Routing، وحزمة i18n (عربي/إنجليزي) مع دعم RTL/LTR** بشكل scaffolding قابل للتوسعة لاحقًا.

## 2. Scope Confirmation
- **Confirmed In-Scope**:
  - إعداد Layout عام للتطبيق (Shell) يتضمن: Header/Topbar + Sidebar (أو قائمة جانبية قابلة للطي) + محتوى رئيسي.
  - إعداد Routing أساسي لصفحات تجريبية/هيكلية (Home/Dashboard placeholder + NotFound).
  - إعداد i18n (ar/en) و آلية تبديل اللغة.
  - تطبيق RTL/LTR حسب اللغة المختارة على مستوى التطبيق.
  - وضع أساس Design System خفيف (Styles/typography/spacing) بالاعتماد على ABP Theme الافتراضي مع تعديلات بسيطة.
  - Guards/Interceptors الأساسية المتاحة في ABP Angular كما هي (بدون تطوير Auth الآن) مع ربط shell بما يلزم لاحقًا.

- **Confirmed Out-of-Scope**:
  - بناء صفحات الميزات الأخرى (Landing/Auth/Profile/Projects/…)
  - تصميم UI نهائي أو نظام تصميم كامل (Design tokens متقدم).
  - تخصيصات عميقة للـ ABP Theme أو إعادة بناء UI kit.
  - منطق صلاحيات/أدوار فعلي (سيأتي مع ميزات Security).

## 3. Ambiguity Resolution (Decisions Catalog)

| Decision ID | Topic | Uncertainty | Decision Taken | Rationale |
|-------------|-------|-------------|----------------|-----------|
| DEC-FEAT-001-001 | بنية الـ Layout | هل Sidebar أم TopNav فقط؟ | اعتماد **Topbar + Sidebar** قابلة للطي على سطح المكتب، وتتحول إلى Drawer على الشاشات الصغيرة. | تناسب لوحة الإدارة والمنتج، وقابلة للتوسعة بدون تغيير جذري. |
| DEC-FEAT-001-002 | حدود الصفحات | ما الصفحات التي تُنشأ الآن؟ | إنشاء صفحات **Placeholders** فقط: `/` (Home shell placeholder)، `/app` (منطقة بعد الدخول placeholder)، `/not-found`. | لتفعيل routing والتجربة، دون التداخل مع ميزات لاحقة. |
| DEC-FEAT-001-003 | i18n في Angular | هل نستخدم ngx-translate أم i18next؟ | استخدام **ABP Angular localization** (المبني على ngx-translate) مع ملفات JSON للـ `en` و `ar`. | توافق أعلى مع ABP، وتسهيل دمج نصوص ABP الافتراضية. |
| DEC-FEAT-001-004 | RTL/LTR | كيف نطبق الاتجاه؟ | عند تغيير اللغة: تحديث `document.documentElement.dir` و `lang` + إضافة/إزالة CSS class على `body` عند الحاجة. | أبسط وأوضح، ويعمل مع CSS/Bootstrap بسهولة. |
| DEC-FEAT-001-005 | تخزين تفضيل اللغة | أين نخزن اللغة؟ | استخدام **LocalStorage** (أو آلية ABP setting إن توفرت) مع fallback إلى لغة المتصفح. | تجربة مستخدم جيدة بدون اعتماد على backend في الـ MVP. |
| DEC-FEAT-001-006 | أسلوب الـ Navigation | كيف نبني القائمة؟ | تعريف `NavItem[]` ثابتة كبداية + دعم إخفاء عناصر مستقبلًا حسب صلاحيات (TODO). | تنفيذ سريع وقابل للتوسع لاحقًا. |
| DEC-FEAT-001-007 | Theme/Styles | مدى التخصيص؟ | الإبقاء على ABP Theme الافتراضي + ملف SCSS خاص بالمشروع للـ layout/RTL fixes. | يقلل المخاطر ويركز على البنية الأساسية. |

## 4. Key Business Rules Identified
- BR-FEAT-001-001: اللغة الافتراضية **en** ما لم تكن لغة المتصفح عربية أو تم اختيار لغة محفوظة.
- BR-FEAT-001-002: عند اختيار `ar` يجب أن يكون الاتجاه `dir=rtl`، وعند `en` يكون `dir=ltr`.
- BR-FEAT-001-003: أي Route غير معروف يتم تحويله إلى صفحة `NotFound`.

## 5. Implementation Recommendations
- الالتزام بمكونات ABP Angular الأساسية (Layout/Theme) قدر الإمكان.
- إنشاء `CoreLayoutModule` أو ما يعادله لتجميع: Shell components + navigation + language switcher.
- إنشاء خدمة `UiLanguageService` مسئولة عن:
  - تعيين اللغة الحالية
  - تحديث `dir/lang`
  - نشر Observable لأي مكونات تحتاج التحديث
- إضافة Style utilities في `styles.scss` أو `app.scss` لتوحيد spacing و RTL fixes.

