# Features Map – Project Feature Inventory

خريطة الميزات (Features / Epics) للمشروع **Projment**.

> مصدر الحقيقة للمواصفات الوظيفية: `conversation-summary.md` (لا يتم تعديله).

---

## 1) Feature Types
- `UX`            – أساسيات الواجهة والتنقل/الهيكل.
- `Landing`       – صفحات عامة قبل تسجيل الدخول.
- `Security`      – AuthN/AuthZ, Roles, Policies.
- `CRUD`          – إنشاء/عرض/تعديل/حذف لكيانات.
- `Workflow`      – موافقات وحالات وتدفقات.
- `Search`        – بحث/فلترة/ترتيب.
- `Notifications` – In-app + Email.
- `Reporting`     – تقارير ولوحات.
- `Integration`   – تكاملات خارجية (مثل الدفع).

---

## 2) Overview Table

| FeatureId | FeatureName | FeatureType | Summary | Personas | SpecFolders | Priority | Status |
|---|---|---|---|---|---|---|---|
| FEAT-001 | UX/UI (Baseline/System) | UX | أساسيات التصميم/الهيكل/التنقل + i18n scaffolding | All | psec-kit-file/FEAT-001 | P0 | Planned |
| FEAT-002 | Landing Page | Landing | صفحة هبوط + أقسام تعريفية + CTA للتسجيل/الدخول | Guest | psec-kit-file/FEAT-002 | P0 | Planned |
| FEAT-003 | Email Auth (Register/Login) | Security | تسجيل ودخول عبر البريد/كلمة المرور | User | psec-kit-file/FEAT-003 | P0 | Planned |
| FEAT-004 | Email Verification | Security | تحقق البريد وإدارة حالة التحقق | User, Admin | psec-kit-file/FEAT-004 | P0 | Planned |
| FEAT-005 | User Profile Management | CRUD | إدارة الملف الشخصي (نبذة/اهتمامات/مهارات...) | User | psec-kit-file/FEAT-005 | P0 | Planned |
| FEAT-006 | Admin: Set Account Type | Workflow | تحديد نوع الحساب (Founder/Investor/Advisor/Partner) من الإدارة | Admin | psec-kit-file/FEAT-006 | P0 | Planned |
| FEAT-007 | User Dashboard | UX | لوحة المستخدم بعد تسجيل الدخول | User | psec-kit-file/FEAT-007 | P1 | Planned |
| FEAT-008 | Create Project (Public/Private) | CRUD | إنشاء مشروع وتحديد عام/خاص | Founder | psec-kit-file/FEAT-008 | P0 | Planned |
| FEAT-010 | Project Review Submission | Workflow | إرسال المشروع للمراجعة قبل النشر | Founder, Admin | psec-kit-file/FEAT-010 | P0 | Planned |
| FEAT-011 | Project Status Lifecycle | Workflow | حالات: Draft/UnderReview/Publishable (+Private) | Founder, Admin | psec-kit-file/FEAT-011 | P0 | Planned |
| FEAT-012 | Search Only Publishable Projects | Search | قصر نتائج البحث على المشاريع القابلة للنشر | Investor, Advisor, Partner | psec-kit-file/FEAT-012 | P0 | Planned |
| FEAT-013 | Project PDF Attachments | Integration | رفع/تحميل مرفقات PDF للمشروع | Founder, Admin | psec-kit-file/FEAT-013 | P1 | Planned |
| FEAT-014 | Lock Project Editing After Publish | Workflow | منع تعديل المشروع بعد النشر (حذف فقط) | Founder | psec-kit-file/FEAT-014 | P1 | Planned |
| FEAT-015 | Trending Projects | Reporting | عرض الأكثر تفاعلًا (تعريف قابل للتعديل) | User | psec-kit-file/FEAT-015 | P2 | Planned |
| FEAT-016 | Project Search & Filters | Search | بحث/فلترة/ترتيب المشاريع | Investor, Advisor, Partner | psec-kit-file/FEAT-016 | P0 | Planned |
| FEAT-017 | Proposals & Invites | Workflow | إرسال/استقبال عروض/دعوات بين الأدوار | User | psec-kit-file/FEAT-017 | P0 | Planned |
| FEAT-018 | Accept/Reject/Negotiate | Workflow | حالات الطلب (مرسل/تفاوض/مقبول/مرفوض) | User | psec-kit-file/FEAT-018 | P0 | Planned |
| FEAT-019 | Negotiation Log (Chat linked) | Workflow | سجل تفاوض قبل القبول مرتبط بالطلب | User | psec-kit-file/FEAT-019 | P0 | Planned |
| FEAT-020 | Text Chat | CRUD | دردشة نصية بين المستخدمين | User | psec-kit-file/FEAT-020 | P0 | Planned |
| FEAT-021 | Offers/Invites Status Board | Reporting | لوحة حالة للطلبات لكل مستخدم | User | psec-kit-file/FEAT-021 | P1 | Planned |
| FEAT-022 | Web Notifications | Notifications | إشعارات داخل المنصة للأحداث | User | psec-kit-file/FEAT-022 | P1 | Planned |
| FEAT-023 | Email Notifications | Notifications | تنبيهات بريد للأحداث | User | psec-kit-file/FEAT-023 | P1 | Planned |
| FEAT-024 | Admin: Users Management | CRUD | إدارة المستخدمين | Admin | psec-kit-file/FEAT-024 | P1 | Planned |
| FEAT-025 | Admin: Projects Management | CRUD | إدارة المشاريع (مراجعة/اعتماد/رفض) | Admin | psec-kit-file/FEAT-025 | P0 | Planned |
| FEAT-026 | Admin: Proposals/Invites Management | CRUD | إدارة الطلبات | Admin | psec-kit-file/FEAT-026 | P2 | Planned |
| FEAT-027 | Admin: Notifications Management | CRUD | إدارة قوالب/سجل الإشعارات | Admin | psec-kit-file/FEAT-027 | P2 | Planned |
| FEAT-028 | Admin: Banners Management | CRUD | إدارة بانرات الصفحة | Admin | psec-kit-file/FEAT-028 | P2 | Planned |
| FEAT-029 | Admin: Reports | Reporting | تقارير تشغيلية | Admin | psec-kit-file/FEAT-029 | P2 | Planned |
| FEAT-030 | Payment Gateway Integration | Integration | ربط بوابة دفع (مؤجل/قابل للتفعيل لاحقًا) | User, Admin | psec-kit-file/FEAT-030 | P3 | Planned |
| FEAT-031 | Plans Upgrade (free MVP) | Workflow | ترقية خطة (منطق جاهز حتى لو مجاني) | User, Admin | psec-kit-file/FEAT-031 | P3 | Planned |
| FEAT-032 | Admin: Transactions | CRUD | إدارة المعاملات | Admin | psec-kit-file/FEAT-032 | P3 | Planned |

---

## 3) Feature Details (initial)

### FEAT-001 – UX/UI (Baseline/System)
**Type:** UX  
**Summary:** بناء أساس واجهة Angular (Layout, Navigation, Routing, Design system) + إعداد i18n عربي/إنجليزي بشكل مبدئي.  
**Personas:** All  
**Spec Folders / Files:**
- `psec-kit-file/FEAT-001/*`

**Dependencies / Relations:**
- يعتمد عليه معظم الميزات اللاحقة.

**KPI Template:** (خاص بـ UX – سنستخدم تعريف إنجاز داخلي: صفحات تعمل + تنقل + RTL/LTR).  

**Notes / Open Questions:**
- سيتم اعتماد Angular + ABP default theme كبداية مع تخصيص بسيط.

---
