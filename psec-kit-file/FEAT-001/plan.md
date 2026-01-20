# Implementation Plan – FEAT-001

## 1. Executive Summary
- تنفيذ Baseline لواجهة Angular ضمن ABP: Layout موحّد + Routing أساسي + i18n عربي/إنجليزي + دعم RTL/LTR.
- لا توجد مخرجات Backend لهذه الميزة؛ العمل يتركز في Frontend (مع احترام بنية ABP).

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

### Frontend (Angular)
- **Modules** (قد تختلف المسارات حسب قالب ABP المولد):
  - `CoreModule` (لخدمات مشتركة مثل اللغة/الاتجاه).
  - `LayoutModule` (جديد): يجمع Shell components و navigation.
  - `PagesModule` أو مجلد صفحات: placeholders.

- **Pages/Routes**:
  - `/` -> `HomePlaceholderComponent`.
  - `/app/dashboard` -> داخل `AppShellComponent`.
  - `/not-found` -> `NotFoundComponent`.
  - `**` -> redirect إلى `/not-found`.

- **Shared UI Components**:
  - `AppShellComponent`: Topbar + Sidebar + Content.
  - `TopbarComponent`: شعار/اسم التطبيق + Language switcher + (placeholder) user menu.
  - `SidebarComponent`: قائمة التنقل.
  - `FooterComponent` (اختياري): تذييل بسيط.

- **Core Services**:
  - `UiLanguageService`:
    - قراءة اللغة الافتراضية (saved > browser > default).
    - تطبيق `documentElement.lang/dir`.
    - بث `language$` للاشتراك.
  - `NavService` أو ملف ثابت `nav-items.ts`: `NavItem[]`.

- **i18n Resources**:
  - `assets/i18n/en.json`
  - `assets/i18n/ar.json`
  - مفاتيح للـ layout والتنقل والـ placeholders.

- **RTL/LTR Styles**:
  - تعديلات CSS بسيطة (SCSS) لتوافق sidebar/padding/align.

## 3. Data Model Definition
```text
N/A (UI scaffolding only)
```

## 4. FR-to-Implementation Mapping
| FR ID | Backend Components | Frontend Components |
|-------|--------------------|---------------------|
| FR-FEAT-001-001 | N/A | LayoutModule + AppShell + Topbar/Sidebar |
| FR-FEAT-001-003 | N/A | AppRoutingModule + NotFound + placeholders |
| FR-FEAT-001-004 | N/A | i18n JSON + translate usage in layout |
| FR-FEAT-001-005 | N/A | UiLanguageService + language switcher |
| FR-FEAT-001-006 | N/A | dir/lang switching + RTL fixes |

## 5. Implementation Phases

### Phase 1: Skeleton (Layout + Routing)
1. تشغيل مشروع Angular (ABP) والتحقق من البناء.
2. إنشاء LayoutModule ومكونات Shell.
3. إنشاء صفحات placeholder.
4. ربط Routing (including NotFound + wildcard).
5. ربط sidebar navigation بعناصر placeholder.

### Phase 2: i18n + RTL/LTR
1. إضافة ملفات ترجمة en/ar.
2. إضافة `UiLanguageService` + persistence.
3. إضافة Language switcher في Topbar.
4. تطبيق `dir/lang` على مستوى document.
5. إضافة CSS fixes مبدئية لـ RTL.

### Phase 3: Polish
1. تحسين responsive behavior للـ sidebar (collapsible/drawer).
2. تنظيف/تنظيم structure لتسهيل إدخال ميزات لاحقًا.
3. تشغيل lint/build وإصلاح المشاكل.

## 6. Non-Functional Implementation
- **Security**: لا تغيير.
- **Performance**: الحفاظ على routing بسيط؛ lazy-load عند الحاجة لاحقًا.
- **Testing**:
  - تحقق يدوي للـ routing/i18n/RTL.
  - (اختياري) unit test بسيط لـ `UiLanguageService`.

## 7. Dependencies & Risks
- اختلاف هيكل ABP Angular template بين الإصدارات (أسماء المجلدات/الـ modules).
- RTL قد يتطلب tweaks إضافية حسب CSS framework المستخدم داخل template.

## 8. Assumptions
- ABP Angular template مُجهّز بـ localization (ngx-translate عبر ABP).
- المطلوب في هذه المرحلة placeholders فقط بدون منطق أعمال.
