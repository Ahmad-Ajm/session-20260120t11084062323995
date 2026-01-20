# Feature Specification – FEAT-001

## 1. Overview
- **Feature Name**: UX/UI (Baseline/System)
- **Short Summary**: تأسيس أساس واجهة Angular (Layout/Navigation/Routing) مع i18n عربي/إنجليزي ودعم RTL/LTR بشكل مبدئي للاعتماد عليه في بقية الميزات.
- **Primary Actors**: All

## 2. Problem & Goals
- **Problem**: بناء الميزات لاحقًا بدون Layout موحّد وi18n/RTL يؤدي لتكرار كبير ومشاكل اتساق وتجربة مستخدم.
- **Goals**:
  - توفير Shell UI موحّد قابل لإعادة الاستخدام.
  - توفير Routing أساسي مع placeholders + NotFound.
  - تهيئة i18n عربي/إنجليزي وزر تبديل.
  - تطبيق RTL/LTR على مستوى التطبيق بناءً على اللغة.

## 3. Scope Boundaries
- **In Scope**:
  - Shell components (Topbar/Sidebar/Content) (+ Footer اختياري).
  - Navigation baseline.
  - Routing baseline مع placeholders.
  - i18n (ar/en) resources + toggle.
  - RTL/LTR scaffolding.

- **Out of Scope**:
  - أي صفحات/تدفقات لميزات أخرى.
  - منطق المصادقة/الصلاحيات.
  - تصميم UI نهائي متقدم.

## 4. User Stories

- **US-FEAT-001-001**: كأي مستخدم، أريد رؤية Layout موحّد (Header/Side nav/Content) لكي أتنقل داخل المنصة بتجربة متسقة.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. يظهر Topbar وSidebar داخل منطقة التطبيق (app area).
    2. التنقل بين صفحات child يتم داخل RouterOutlet دون كسر التخطيط.

- **US-FEAT-001-002**: كأي مستخدم، أريد Routing أساسي مع صفحة NotFound لكي أتجنب أخطاء غير مفهومة عند زيارة روابط غير صحيحة.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. أي Route غير معروف يعرض NotFound.
    2. وجود مسارات placeholder تعمل: Home وDashboard.

- **US-FEAT-001-003**: كأي مستخدم، أريد تبديل لغة الواجهة بين العربية والإنجليزية لكي أستخدم المنصة بلغتي.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. يوجد language switcher في Topbar.
    2. تبديل اللغة يغيّر نصوص UI الأساسية.
    3. يتم حفظ اختيار اللغة وإعادة تطبيقه بعد reload.

- **US-FEAT-001-004**: كأي مستخدم، أريد أن يتغير اتجاه الصفحة تلقائيًا (RTL للعربية/LTR للإنجليزية) لكي تكون القراءة مريحة.
  - *Priority*: P0
  - *Acceptance Criteria*:
    1. اختيار العربية يضبط `dir=rtl` على document.
    2. اختيار الإنجليزية يضبط `dir=ltr`.
    3. لا يحدث كسر بصري كبير في التخطيط.

## 5. Functional Requirements

| Req ID | Description | Linked US |
|-------|-------------|-----------|
| FR-FEAT-001-001 | إنشاء Shell layout يضم Topbar + Sidebar + RouterOutlet للمحتوى. | US-FEAT-001-001 |
| FR-FEAT-001-002 | توفير Navigation items أساسية (Home/Dashboard placeholders). | US-FEAT-001-001 |
| FR-FEAT-001-003 | إعداد Routing أساسي (Home, App area, NotFound, wildcard). | US-FEAT-001-002 |
| FR-FEAT-001-004 | إضافة ملفات ترجمة en/ar واستخدامها في مكونات layout. | US-FEAT-001-003 |
| FR-FEAT-001-005 | إضافة language switcher وربطه بخدمة تقوم بالحفظ في LocalStorage. | US-FEAT-001-003 |
| FR-FEAT-001-006 | تطبيق RTL/LTR عبر تحديث `documentElement.dir/lang` حسب اللغة. | US-FEAT-001-004 |
| FR-FEAT-001-007 | دعم responsive behavior للـ sidebar بشكل مبدئي (collapse/drawer). | US-FEAT-001-001 |

## 6. Non-Functional Requirements (NFRs)
- **Performance**: لا يتم إضافة مكتبات ثقيلة؛ placeholders فقط.
- **Security**: الالتزام بإعدادات ABP الافتراضية، بدون توسعة سطح هجوم.
- **Availability**: N/A.
- **Maintainability**: فصل المكونات والخدمات ضمن modules واضحة.

## 7. Business Rules
- **BR-001**: اللغة الافتراضية `en` ما لم تكن لغة المتصفح عربية أو كانت هناك قيمة محفوظة.
- **BR-002**: `ar => rtl` و `en => ltr`.
- **BR-003**: حفظ اللغة في LocalStorage تحت المفتاح `projment_lang`.

## 8. Domain Model Candidates (For Code Generation)
- **Entities**: لا يوجد.
- **Enums**:
  - `UiLanguage`: `en`, `ar` (frontend-only).
- **Domain Events**: لا يوجد.

## 9. Success Criteria
- التطبيق يعمل ويعرض Layout موحّد في app area.
- routing يعمل (Home/Dashboard/NotFound).
- language switcher يعمل ويحفظ الاختيار.
- RTL/LTR يتغير فورًا ويظل بعد reload.

## 10. Assumptions & Decisions
- **DEC-001**: استخدام ABP Angular localization (ngx-translate) بملفات JSON.
- **DEC-002**: RTL/LTR عبر `documentElement.dir/lang` مع CSS overrides بسيطة.
