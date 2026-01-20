# Feature Specification – FEAT-001

## 1. Overview
- **Feature Name**: UX/UI (Baseline/System)
- **Short Summary**: تأسيس واجهة Angular baseline (Layout + Navigation + Routing) مع i18n عربي/إنجليزي و RTL/LTR scaffolding.
- **Primary Actors**: All (Guest/User/Admin) – من منظور الاستخدام لاحقًا، لكن التنفيذ الحالي UI عام.

## 2. Problem & Goals
- **Problem**: لا يمكن بناء ميزات المنتج بشكل متسق بدون أساس UI موحد (تخطيط + تنقل + توجيه) ودعم لغتين واتجاهين.
- **Goals**:
  - توفير Layout موحد قابل لإعادة الاستخدام عبر كل صفحات المنتج.
  - توفير Routing هيكلي مع صفحات placeholder و NotFound.
  - توفير i18n (en/ar) مع تبديل اللغة وتطبيق RTL/LTR.
  - تقليل التخصيصات العميقة مع الاستفادة من ABP default theme.

## 3. Scope Boundaries
- **In Scope**:
  - App shell (Topbar/Sidebar/Content).
  - Navigation baseline (قائمة ثابتة كبداية).
  - Routing baseline (public + app area placeholders + NotFound).
  - i18n scaffolding (en/ar) + toggle.
  - RTL/LTR scaffolding.

- **Out of Scope**:
  - صفحات/شاشات الميزات الأخرى.
  - إدارة صلاحيات قائمة التنقل حسب roles (سيوضع TODO فقط).
  - تصميم تفصيلي/نهائي.

## 4. User Stories

- **US-FEAT-001-001**: كأي مستخدم، أريد رؤية تخطيط عام موحد للتطبيق (شريط علوي + قائمة تنقل + منطقة محتوى) لكي أتنقل داخل المنصة بتجربة متسقة.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. يظهر Topbar و Sidebar بشكل ثابت في صفحات منطقة التطبيق (app area).
    2. يتغير محتوى الصفحة داخل RouterOutlet دون كسر التخطيط.
    3. القائمة تحتوي عناصر placeholder (مثل Dashboard) وتؤدي إلى Route يعمل.

- **US-FEAT-001-002**: كأي مستخدم، أريد نظام توجيه (Routing) واضح مع صفحة NotFound لكي لا أواجه أخطاء غير مفهومة عند إدخال رابط خاطئ.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. أي مسار غير معروف يعرض NotFound.
    2. يوجد على الأقل مساران يعملان: Home و Dashboard placeholder.

- **US-FEAT-001-003**: كأي مستخدم، أريد تبديل لغة الواجهة بين العربية والإنجليزية لكي أستخدم المنصة بلغتي.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. زر/قائمة تبديل اللغة متاحة في Topbar.
    2. عند تبديل اللغة تتغير نصوص الـ UI الأساسية (Navigation/Labels).
    3. تفضيل اللغة يتم حفظه ويُطبق عند إعادة فتح الصفحة.

- **US-FEAT-001-004**: كأي مستخدم، أريد أن يتغير اتجاه الصفحة تلقائيًا (RTL للعربية و LTR للإنجليزية) لكي تكون القراءة والتصفح مريحة.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. عند اختيار العربية يتم تعيين `dir=rtl` على مستوى document.
    2. عند اختيار الإنجليزية يتم تعيين `dir=ltr`.
    3. لا يحدث كسر بصري كبير في القائمة/التخطيط (حد أدنى من CSS fixes).

## 5. Functional Requirements

| Req ID | Description | Linked US |
|-------|-------------|-----------|
| FR-FEAT-001-001 | توفير مكوّن Shell رئيسي يضم Topbar و Sidebar و RouterOutlet لمحتوى الصفحات. | US-FEAT-001-001 |
| FR-FEAT-001-002 | توفير قائمة تنقل أساسية (NavItems) تربط على الأقل Dashboard و Home placeholders. | US-FEAT-001-001 |
| FR-FEAT-001-003 | إعداد Routing عام: routes معروفة + NotFound + wildcard redirect. | US-FEAT-001-002 |
| FR-FEAT-001-004 | إعداد i18n بملفات ترجمة `en/ar` واستخدامها في مكونات الـ Layout. | US-FEAT-001-003 |
| FR-FEAT-001-005 | توفير آلية تبديل اللغة من الواجهة وتخزين الاختيار (localStorage). | US-FEAT-001-003 |
| FR-FEAT-001-006 | تطبيق RTL/LTR بتحديث `documentElement.dir` و `lang` عند تغيير اللغة. | US-FEAT-001-004 |
| FR-FEAT-001-007 | دعم responsive behavior: Sidebar قابلة للطي/Drawer على الشاشات الصغيرة (حد أدنى). | US-FEAT-001-001 |

## 6. Non-Functional Requirements (NFRs)
- **Performance**: لا يجب أن يضيف baseline تحميلًا كبيرًا؛ تفعيل lazy-loading إن أمكن.
- **Security**: لا تغييرات أمنية؛ الالتزام بالافتراضي.
- **Availability**: N/A لواجهة فقط.
- **Maintainability**: فصل layout/components/services لتسهيل إضافة ميزات لاحقًا.

## 7. Business Rules
- **BR-001**: اللغة الافتراضية `en` ما لم تكن لغة المتصفح تبدأ بـ `ar`.
- **BR-002**: `ar => dir=rtl` و `en => dir=ltr`.
- **BR-003**: حفظ اللغة المختارة في localStorage بمفتاح ثابت (مثل `projment_lang`).

## 8. Domain Model Candidates (For Code Generation)
- **Entities**: لا يوجد.
- **Enums**:
  - `UiLanguage`: `en`, `ar` (على مستوى frontend فقط).
- **Domain Events**: لا يوجد.

## 9. Success Criteria
- تشغيل التطبيق وإظهار shell layout مع تنقل فعال.
- تبديل اللغة يغيّر النصوص ويطبق RTL/LTR فورًا.
- المسارات الأساسية تعمل و NotFound تعمل.

## 10. Assumptions & Decisions
- **DEC-001**: استخدام ABP Angular localization (ngx-translate) مع JSON resources.
- **DEC-002**: تطبيق RTL/LTR عبر `documentElement.dir/lang` بدل حلول CSS معقدة.
