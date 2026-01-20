# Implementation Plan – FEAT-001

## 1. Executive Summary
- تنفيذ Baseline للواجهة (Angular + ABP) عبر إنشاء Shell Layout قابل لإعادة الاستخدام، تأسيس نظام Routing، وتهيئة i18n عربي/إنجليزي مع RTL/LTR.
- لا يوجد عمل Backend جوهري لهذه الميزة؛ يقتصر الأمر على إعدادات Frontend وبعض إعدادات host إن لزم (مثل توفير ملفات ترجمة).

## 2. Architecture & Components

### Backend (.NET/ABP)
- **Domain Layer**:
  - لا يوجد.
- **Application Layer**:
  - لا يوجد.
- **EF Core**:
  - لا يوجد.
- **HTTP API**:
  - لا يوجد.
- **ملاحظات**:
  - إن كانت ABP localization تعتمد على موارد من السيرفر، نكتفي بالموارد الافتراضية ونضيف موارد UI في Angular (الأولوية: UI scaffolding).

### Frontend (Angular)
- **Modules**:
  - `AppModule` (كما في ABP template)
  - `CoreModule` (إن لم يكن موجودًا) لتجميع الخدمات العامة.
  - `LayoutModule` (جديد): مكونات الـ Shell + navigation.
  - `PublicModule` (اختياري/placeholder): مسارات عامة.
  - `AppAreaModule` (اختياري/placeholder): مسارات داخلية بعد الدخول.

- **Core Services**:
  - `UiLanguageService`: إدارة اللغة/الاتجاه.
  - `NavService` (أو ملف ثابت): تعريف عناصر القائمة.

- **Components**:
  - `AppShellComponent`: الحاوية العامة (Topbar + Sidebar + RouterOutlet).
  - `TopbarComponent`: شعار + زر تبديل اللغة + (Placeholder) user menu.
  - `SidebarComponent`: قائمة تنقل.
  - `NotFoundComponent`.
  - `HomePlaceholderComponent`.
  - `DashboardPlaceholderComponent`.

- **Routing**:
  - `''` -> `HomePlaceholderComponent` أو إعادة توجيه.
  - `'app'` -> `AppShellComponent` يحوي children مثل `dashboard`.
  - `'not-found'`.
  - `'**'` -> redirect to `not-found`.

- **i18n**:
  - ملفات ترجمة JSON:
    - `assets/i18n/en.json`
    - `assets/i18n/ar.json`
  - إضافة مفاتيح مشتركة للـ Layout (AppName, Navigation, Language…)

- **RTL/LTR**:
  - عند تغيير اللغة:
    - `document.documentElement.lang = currentLang`
    - `document.documentElement.dir = rtl|ltr`
  - إضافة CSS للـ sidebar alignment و spacing عند RTL.

## 3. Data Model Definition
- لا يوجد Entities/DTOs ضمن هذه الميزة.

## 4. FR-to-Implementation Mapping
| FR ID | Backend Components | Frontend Components |
|-------|--------------------|---------------------|
| FR-FEAT-001-001 | N/A | LayoutModule + AppShellComponent + Topbar/Sidebar |
| FR-FEAT-001-002 | N/A | AppRoutingModule + placeholder pages + NotFound |
| FR-FEAT-001-003 | N/A | i18n JSON + language switcher + UiLanguageService |
| FR-FEAT-001-004 | N/A | RTL/LTR dir/lang update + styles fixes |

## 5. Implementation Phases

### Phase 1: Frontend Skeleton
1. التأكد من عمل مشروع ABP Angular و تشغيله.
2. إنشاء `LayoutModule` ومكونات shell الأساسية.
3. إضافة صفحات placeholder و routing.

### Phase 2: i18n + RTL/LTR
1. إضافة ملفات ترجمة `en/ar`.
2. بناء `UiLanguageService` (set/get/observe) وتخزين التفضيل.
3. تطبيق تغيير `dir/lang` وربط زر التبديل.
4. إضافة CSS لRTL (حد أدنى).

### Phase 3: Polish
1. تحسين responsive behavior (Sidebar collapsible/drawer).
2. توثيق مكان إضافة عناصر قائمة مستقبلًا.
3. مراجعة lint/build.

## 6. Non-Functional Implementation
- **Security**: لا يضيف هذا العمل سطح API جديد؛ الالتزام بإعدادات ABP الافتراضية للـ Angular.
- **Performance**: استخدام lazy-loading للموديولات إن كانت بنية ABP جاهزة لذلك؛ placeholders فقط الآن.
- **Testing**:
  - فحص يدوي للـ Routing + تبديل اللغة + RTL.
  - (اختياري) unit tests بسيطة لـ `UiLanguageService`.

## 7. Dependencies & Risks
- الاعتماد على قالب ABP Angular الافتراضي (قد تختلف أسماء المجلدات حسب النسخة).
- خطر تضارب RTL مع CSS framework؛ نخففه بتغييرات محدودة ومرحلية.

## 8. Assumptions
- Angular داخل ABP template جاهز ويستخدم ngx-translate/ABP localization.
- لا توجد متطلبات تصميم نهائي؛ المطلوب scaffolding.
- سيتم لاحقًا إدخال عناصر menu بناءً على الـ roles/permissions.
