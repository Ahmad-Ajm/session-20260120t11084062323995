# Clarification & Decisions – FEAT-001

## 1. Executive Summary
- تجهيز **Baseline UI** لتطبيق Projment (Angular ضمن ABP) يشمل: **Layout موحّد (Topbar/Sidebar/Content)**، **Routing أساسي**، **i18n عربي/إنجليزي**، ودعم **RTL/LTR** بشكل مبدئي وقابل للتوسع.

## 2. Scope Confirmation
- **Confirmed In-Scope**:
  - هيكل Layout عام: Header/Topbar + Side navigation + Content area.
  - Routing أساسي مع صفحات placeholder (Home/Dashboard/NotFound).
  - i18n scaffolding (ar/en) + زر/قائمة تبديل اللغة.
  - تطبيق RTL/LTR حسب اللغة المختارة.
  - مكونات UI مشتركة بدون منطق أعمال (Shell, Navbar/Topbar, Sidebar, Footer اختياري).
  - الاعتماد على ABP default theme كبداية مع تعديلات CSS بسيطة.

- **Confirmed Out-of-Scope**:
  - صفحات ومكونات ميزات أخرى (Landing/Auth/Profile/Projects/Chat/…)
  - منطق صلاحيات وأدوار فعلي في الواجهة (سيأتي مع ميزات Security).
  - تصميم نهائي/نظام تصميم متقدم (Design Tokens/Design kit كامل).
  - أي API/Backend جديد خاص بهذه الميزة.

## 3. Ambiguity Resolution (Decisions Catalog)

| Decision ID | Topic | Uncertainty | Decision Taken | Rationale |
|-------------|-------|-------------|----------------|-----------|
| DEC-FEAT-001-001 | Layout pattern | Topbar فقط أم Sidebar؟ | اعتماد **Topbar + Sidebar** مع قابلية الطي + Drawer للموبايل. | مناسب لتطبيق غني (Dashboard/Admin) ويقلل إعادة العمل لاحقًا. |
| DEC-FEAT-001-002 | Routes baseline | ما هي أقل صفحات مطلوبة الآن؟ | إنشاء Placeholders فقط: `/` و`/app/dashboard` و`/not-found`. | يحقق قابلية التنقل والاختبار دون بناء ميزات أخرى. |
| DEC-FEAT-001-003 | i18n approach | مكتبة ترجمة؟ | استخدام **ABP Angular localization** (ngx-translate) بملفات JSON `en/ar`. | متوافق مع ABP وأقل مخاطرة. |
| DEC-FEAT-001-004 | RTL/LTR mechanism | كيف يتم تفعيل الاتجاه؟ | تحديث `document.documentElement.dir/lang` عند تغيير اللغة (+ CSS fixes بسيطة). | أبسط وأوضح، ويعمل مع أغلب CSS frameworks. |
| DEC-FEAT-001-005 | Language persistence | أين نحفظ اختيار اللغة؟ | LocalStorage بمفتاح ثابت `projment_lang` (fallback إلى لغة المتصفح). | تجربة مستخدم جيدة بدون اعتماد على backend في MVP. |
| DEC-FEAT-001-006 | Navigation data source | كيف نعرّف عناصر القائمة؟ | `NavItem[]` ثابت كبداية + TODO لاحقًا للتصفية حسب permissions. | يسمح بالتوسع دون تعقيد مبكر. |
| DEC-FEAT-001-007 | Theme customization | مدى التخصيص؟ | الإبقاء على ABP default theme + ملف SCSS مشروع لتعديلات layout/RTL فقط. | يحافظ على سرعة التنفيذ وجودة أساس مستقرة. |

## 4. Key Business Rules Identified
- BR-FEAT-001-001: اللغة الافتراضية `en` ما لم تكن لغة المتصفح عربية أو كانت هناك قيمة محفوظة في LocalStorage.
- BR-FEAT-001-002: عند `ar` يجب ضبط `dir=rtl` وعند `en` يجب ضبط `dir=ltr`.
- BR-FEAT-001-003: أي Route غير معروف يعرض NotFound.

## 5. Implementation Recommendations
- إعادة استخدام مكونات ABP قدر الإمكان وعدم نسخ/إعادة بناء Theme.
- عزل الـ layout في Module مستقل (مثل `LayoutModule`) لتسهيل إعادة الاستخدام والاختبار.
- توفير خدمة واحدة لإدارة اللغة/الاتجاه (مثل `UiLanguageService`) لتجنب تكرار منطق RTL/LTR عبر المكونات.
- الحفاظ على CSS overrides محدودة وموجهة لتلافي مشاكل RTL.

