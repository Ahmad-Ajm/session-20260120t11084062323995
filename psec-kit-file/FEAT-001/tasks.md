# Tasks – FEAT-001

## 1. Overview
- الهدف: بناء Baseline UI في Angular (ضمن ABP) يشمل:
  1) Layout عام (Topbar/Sidebar/Content)
  2) Routing placeholders
  3) i18n عربي/إنجليزي
  4) RTL/LTR
- القيود: بدون منطق أعمال، بدون صفحات ميزات أخرى.

## 2. Task List

### Phase 1: Project Check + Layout Skeleton
- [ ] T-FEAT-001-001 تشغيل مشروع ABP Angular والتأكد أنه يعمل محلياً (Target: `angular/`)
  - خطوات: `npm ci` (أو `npm install`) ثم `npm start`.
  - ناتج متوقع: التطبيق يعمل بدون أخطاء build.

- [ ] T-FEAT-001-002 إنشاء Layout module ومكونات Shell الأساسية (Target: `angular/src/app/layout/`)
  - أنشئ:
    - `layout.module.ts`
    - `components/app-shell/app-shell.component.{ts,html,scss}`
    - `components/topbar/topbar.component.{ts,html,scss}`
    - `components/sidebar/sidebar.component.{ts,html,scss}`
    - (اختياري) `components/footer/footer.component.{ts,html,scss}`
  - ناتج متوقع: `AppShellComponent` يعرض Topbar + Sidebar + `<router-outlet>`.

- [ ] T-FEAT-001-003 إنشاء صفحات placeholder (Target: `angular/src/app/pages/`)
  - أنشئ:
    - `home/home.component.{ts,html,scss}`
    - `dashboard/dashboard.component.{ts,html,scss}`
    - `not-found/not-found.component.{ts,html,scss}`
  - محتوى الصفحة: عنوان ونص بسيط (مع مفاتيح ترجمة).

### Phase 2: Routing Baseline
- [ ] T-FEAT-001-004 إعداد routing الأساسي + NotFound (Target: `angular/src/app/app-routing.module.ts`)
  - Routes المقترحة:
    - `''` -> `HomeComponent`
    - `'app'` -> `AppShellComponent` (children: `dashboard`)
    - `'not-found'` -> `NotFoundComponent`
    - `'**'` -> redirect to `'not-found'`
  - ناتج متوقع: `/app/dashboard` يعمل داخل الـ shell.

- [ ] T-FEAT-001-005 إضافة عناصر التنقل (NavItems) وربطها بالـ sidebar (Target: `angular/src/app/layout/services/nav.service.ts` أو `nav-items.ts`)
  - تعريف interface `NavItem`:
    - `labelKey: string`
    - `path: string`
    - `icon?: string`
  - عناصر مبدئية:
    - Home: `/`
    - Dashboard: `/app/dashboard`
  - ناتج متوقع: الضغط على عناصر القائمة يغير route.

### Phase 3: i18n (ar/en)
- [ ] T-FEAT-001-006 إضافة ملفات ترجمة en/ar (Target: `angular/src/assets/i18n/en.json`, `angular/src/assets/i18n/ar.json`)
  - مفاتيح حد أدنى:
    - `App.Name`
    - `Nav.Home`, `Nav.Dashboard`
    - `Lang.English`, `Lang.Arabic`
    - `Common.NotFound`, `Common.Home`, `Common.Dashboard`

- [ ] T-FEAT-001-007 تفعيل استخدام مفاتيح الترجمة في مكونات Layout/Pages (Target: templates HTML)
  - استخدم `| translate` على الأقل في:
    - عنوان Topbar
    - عناصر Sidebar
    - عناوين صفحات placeholders

### Phase 4: Language Switcher + Persistence
- [ ] T-FEAT-001-008 إنشاء خدمة UI للغة والاتجاه (Target: `angular/src/app/core/services/ui-language.service.ts`)
  - Implement:
    - `language$` (BehaviorSubject)
    - `getCurrent(): 'en'|'ar'`
    - `setLanguage(lang: 'en'|'ar')`
  - Persistence:
    - LocalStorage key: `projment_lang`
    - Default: saved > browser startsWith('ar') => ar else en

- [ ] T-FEAT-001-009 ربط زر/قائمة تبديل اللغة في Topbar (Target: `topbar.component.*`)
  - UI: Dropdown أو زرين (AR/EN).
  - عند التبديل: استدعاء `UiLanguageService.setLanguage(...)`.
  - ناتج متوقع: النصوص تتغير فوراً.

### Phase 5: RTL/LTR + Styling
- [ ] T-FEAT-001-010 تطبيق RTL/LTR على مستوى document (Target: `ui-language.service.ts`)
  - عند setLanguage:
    - `document.documentElement.lang = lang`
    - `document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'`
  - تهيئة عند bootstrap:
    - استدعاء `setLanguage(getCurrent())` في init مناسب (مثلاً `AppComponent.ngOnInit` أو constructor في service مع احتراز).

- [ ] T-FEAT-001-011 إضافة CSS fixes بسيطة لـ RTL للـ layout (Target: `angular/src/styles.scss` أو scss داخل layout)
  - أهداف التعديل:
    - محاذاة sidebar حسب الاتجاه
    - padding/margin متناسقة
  - ناتج متوقع: عند `dir=rtl` لا ينكسر layout.

### Phase 6: Quality Gates
- [ ] T-FEAT-001-012 تشغيل lint/build (Target: `angular/`)
  - `npm run lint` (إذا متوفر)
  - `npm run build`

- [ ] T-FEAT-001-013 تحقق يدوي نهائي (Target: تشغيل التطبيق)
  - Checklist:
    1. `/` يعمل
    2. `/app/dashboard` يعمل داخل shell
    3. مسار عشوائي -> NotFound
    4. تبديل اللغة يغير النصوص
    5. reload يحافظ على اللغة
    6. العربية تجعل `dir=rtl` والإنجليزية `dir=ltr`

## 3. Dependencies Graph
- T-FEAT-001-004 يعتمد على T-FEAT-001-002 و T-FEAT-001-003.
- T-FEAT-001-005 يعتمد على T-FEAT-001-004.
- T-FEAT-001-009 يعتمد على T-FEAT-001-008.
- T-FEAT-001-010 يعتمد على T-FEAT-001-008.

## 4. Execution Notes
- قد تختلف مسارات `angular/src/...` حسب قالب ABP المستخدم؛ في هذه الحالة يتم تكييف الـ targets مع الحفاظ على نفس المخرجات (Layout/Routing/i18n/RTL).
- ممنوع إضافة أي صفحات تخص ميزات أخرى؛ placeholders فقط.
