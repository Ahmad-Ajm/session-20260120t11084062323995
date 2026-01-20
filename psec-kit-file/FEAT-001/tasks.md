# Tasks – FEAT-001

## 1. Overview
- الهدف: إنشاء Baseline UI في Angular (ضمن ABP) يشمل Layout + Navigation + Routing + i18n (ar/en) + RTL/LTR.
- المهام أدناه قابلة للتنفيذ مباشرة بواسطة Build-App، مع مسارات مستهدفة قابلة للتكيّف حسب هيكل مشروع ABP المُولّد.

## 2. Task List

### Phase 1: Frontend Baseline (Layout + Routing)
- [ ] T-FEAT-001-001 Verify ABP Angular app runs locally (Target: `angular/`)
  - Ensure `npm ci` / `npm install` + `npm start` works.

- [ ] T-FEAT-001-002 Create Layout module and shell components (Target: `angular/src/app/layout/`)
  - Create:
    - `layout.module.ts`
    - `components/app-shell/app-shell.component.{ts,html,scss}`
    - `components/topbar/topbar.component.{ts,html,scss}`
    - `components/sidebar/sidebar.component.{ts,html,scss}`
  - Shell layout: Topbar + Sidebar + `<router-outlet>`.

- [ ] T-FEAT-001-003 Add placeholder pages (Target: `angular/src/app/pages/`)
  - Create:
    - `home/home.component.{ts,html,scss}` (simple text)
    - `dashboard/dashboard.component.{ts,html,scss}` (simple text)
    - `not-found/not-found.component.{ts,html,scss}`

- [ ] T-FEAT-001-004 Configure app routing with NotFound fallback (Target: `angular/src/app/app-routing.module.ts`)
  - Routes (example):
    - `''` -> `HomeComponent`
    - `'app'` -> `AppShellComponent` (children: `dashboard`)
    - `'not-found'` -> `NotFoundComponent`
    - `'**'` -> redirect to `'not-found'`

- [ ] T-FEAT-001-005 Implement sidebar navigation items (Target: `angular/src/app/layout/services/nav.service.ts` + Sidebar template)
  - Define `NavItem` interface (labelKey, path, icon?).
  - Items:
    - Home (`/`)
    - Dashboard (`/app/dashboard`)
  - Bind to routerLink.

### Phase 2: i18n (ar/en) + Language Switcher
- [ ] T-FEAT-001-006 Add i18n translation files (Target: `angular/src/assets/i18n/en.json`, `angular/src/assets/i18n/ar.json`)
  - Keys minimum:
    - `App.Name`
    - `Nav.Home`, `Nav.Dashboard`
    - `Lang.English`, `Lang.Arabic`, `Lang.Switch`
    - `Common.NotFound`

- [ ] T-FEAT-001-007 Create UiLanguageService for language + persistence (Target: `angular/src/app/core/services/ui-language.service.ts`)
  - Methods:
    - `getCurrent(): 'en'|'ar'`
    - `setLanguage(lang: 'en'|'ar'): void`
    - `language$`: observable/behavior subject
  - Persistence key: `projment_lang` in localStorage.
  - Default logic: stored value else browser language startsWith('ar') => 'ar' else 'en'.

- [ ] T-FEAT-001-008 Wire language switcher in Topbar (Target: `topbar.component.*`)
  - Add dropdown/button to switch language.
  - Use translate pipe for labels.
  - On click call `UiLanguageService.setLanguage(...)`.

### Phase 3: RTL/LTR Scaffolding + Styles
- [ ] T-FEAT-001-009 Apply RTL/LTR on language change (Target: `ui-language.service.ts`)
  - On `setLanguage`:
    - `document.documentElement.lang = lang`
    - `document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'`
  - Ensure executed on app bootstrap (constructor/init in `AppComponent` or service init).

- [ ] T-FEAT-001-010 Add minimal RTL styles to support layout (Target: `angular/src/styles.scss` or `angular/src/app/layout/layout.scss`)
  - Ensure sidebar aligns properly in RTL.
  - Ensure padding/margins/chevrons don’t break.
  - Avoid heavy RTL frameworks; keep minimal overrides.

### Phase 4: Quality Gates
- [ ] T-FEAT-001-011 Lint/build check (Target: `angular/`)
  - Run `npm run lint` (if configured) and `npm run build`.

- [ ] T-FEAT-001-012 Manual verification checklist (Target: running app)
  - Verify:
    1. Routing works: `/`, `/app/dashboard`, unknown route -> NotFound.
    2. Navigation links route correctly.
    3. Switching language updates labels immediately.
    4. Reload keeps chosen language.
    5. RTL applies when `ar` selected (dir=rtl) and layout still usable.

## 3. Dependencies Graph
- T-FEAT-001-004 depends on T-FEAT-001-002 and T-FEAT-001-003.
- T-FEAT-001-008 depends on T-FEAT-001-006 and T-FEAT-001-007.
- T-FEAT-001-009 depends on T-FEAT-001-007.

## 4. Execution Notes
- قد تختلف أماكن ملفات routing/translation في قالب ABP؛ في هذه الحالة يتم تعديل المسارات المستهدفة لتطابق البنية الفعلية، مع الحفاظ على نفس المخرجات (Layout/Routing/i18n/RTL).
- لا تضف أي صفحات تخص ميزات أخرى؛ استخدم placeholders فقط.
