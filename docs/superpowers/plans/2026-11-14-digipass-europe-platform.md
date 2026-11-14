# DigiPass:Europe Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A deployable Next.js platform for DigiPass:Europe with public site, 10 working groups, membership journey, member portal (demo mode) and Supabase schema.

**Architecture:** Next.js App Router with `[locale]` segment (en/fr). All content in typed data modules under `src/content`; a `src/lib/db` layer reads demo data unless Supabase env vars exist. Supabase SQL migrations define the real schema the demo data mirrors.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, next-intl, @supabase/supabase-js, @supabase/ssr, zod, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-14-digipass-europe-platform-design.md`

## Global Constraints
- Name always "DigiPass:Europe"; seat Wiener Neustadt; Austrian Verein; non-profit (§§ 34–47 BAO).
- Membership categories only: ordinary (legal entity / individual), extraordinary, corresponding, honorary. Fee tiers = proposals for the Board. Supporter €75 = non-member subscription.
- Votes: legal entity 2–4, individual/honorary 1. No invented people, partners, endorsements.
- Every illustrative item carries `illustrative: true` and renders an "Illustrative" badge.
- Demo mode: no key → forms validate and show "Demo mode: not stored"; never claim success.
- Colours: #003399, #1E8A5A, #0B2B3A, #F6F5F1, #FFCC00. Font Instrument Sans. WCAG AA text contrast.
- Logo files from `/home/claude/work/out` (green colon + EU flag).

## Review Focus
1. French route `/fr/...` for every page must render (no missing message keys crash). Test in Task 3.
2. Application form rejects an organisation application without VAT only when country is in the EU; otherwise optional. Test in Task 7.
3. Directory filters combine (country AND type AND WG). Test in Task 6.
4. Portal routes redirect to `/login` when not authenticated, in demo mode too. Test in Task 8.
5. Events in the past are listed under "Past", future under "Upcoming", by date not insertion. Test in Task 6.

---

### Task 1: Scaffold, identity and layout shell
**Files:** `package.json`, `next.config.ts`, `src/i18n/*`, `src/middleware.ts`, `src/app/[locale]/layout.tsx`, `src/components/site/{Header,Footer,Logo,LocaleSwitcher}.tsx`, `src/app/globals.css`, `public/brand/*.svg`, `messages/{en,fr}.json`
- [ ] `npx create-next-app@latest . --ts --tailwind --app --src-dir --no-eslint --import-alias "@/*"`; add next-intl, zod, vitest, @supabase/supabase-js, @supabase/ssr.
- [ ] Copy logo SVGs to `public/brand/`. Define CSS variables for palette; load Instrument Sans via `next/font/google`.
- [ ] `Header` with main nav (10 items) + "Become a member" button + locale switcher; mobile menu with `<details>`/button, no JS libs. `Footer` with legal line, seat, links.
- [ ] Vitest smoke test: `src/lib/__tests__/i18n.test.ts` asserts en and fr message files have identical key sets.
- [ ] Commit.

### Task 2: Content model and demo data
**Files:** `src/content/{types,association,membership,working-groups,services,events,news,resources,members,governance}.ts`
**Produces:** typed exports `workingGroups: WorkingGroup[]` (10, ids `wg1..wg10`), `feeTiers`, `benefits`, `events`, `news`, `resources`, `memberOrgs`, `governance` (from statutes), `extraServices` (≥5 with what/who/value/how/access).
- [ ] Write types with `illustrative?: boolean`.
- [ ] Populate from the brief; governance text only from statutes.
- [ ] Test: `content.test.ts` — 10 WGs each with chair role placeholders, mission, ≥3 objectives, ≥3 deliverables; every fee tier has `status: 'proposed'`; every demo org/event/news item `illustrative === true`.
- [ ] Commit.

### Task 3: Public pages — Home, About, Contact
**Files:** `src/app/[locale]/page.tsx`, `about/page.tsx`, `contact/page.tsx`, `src/components/home/*` incl. `EcosystemDiagram.tsx` (inline SVG, actors: manufacturers, suppliers, consumers, regulators, digital infrastructure, recyclers).
- [ ] Home sections per brief; hero headline "Shaping the Future of Digital Product Passports in Europe".
- [ ] About: mission/objectives (§ 2–3), governance structure (§ 8–14), statutes download placeholder, membership conditions, transparency.
- [ ] Test (Review Focus 1): script `scripts/check-routes.mjs` fetches every route in en and fr from `next start` and asserts 200. Run in Task 10.
- [ ] Commit.

### Task 4: Membership pages
**Files:** `membership/page.tsx`, `membership/compare/page.tsx`, `src/components/membership/{FeeTable,BenefitsMatrix,StatutoryNote}.tsx`
- [ ] Fee tables (individual, organisational) with "Proposed — subject to Board approval" banner; statutory categories explained; governance rights vs benefits clearly separated.
- [ ] Commit.

### Task 5: Working groups
**Files:** `working-groups/page.tsx`, `working-groups/[id]/page.tsx`, `src/components/wg/*`
- [ ] Index grid; detail page with mission, objectives, activities, leadership (Chair/Vice-Chair: "Position open — elected by members"), projects, deliverables, meetings, "Join this group" and "Propose a working group" links.
- [ ] `generateStaticParams` for 10 ids; 404 on unknown.
- [ ] Commit.

### Task 6: Activities, Events, Knowledge Hub, News, Directory
**Files:** `activities/page.tsx`, `events/page.tsx`, `events/[slug]/page.tsx`, `knowledge-hub/page.tsx`, `news/page.tsx`, `news/[slug]/page.tsx`, `members/page.tsx`, `src/lib/filters.ts`, `src/components/directory/DirectoryFilters.tsx` (client, URL search params)
- [ ] `splitEvents(events, now): {upcoming, past}` sorted; test with dates around `now`.
- [ ] `filterMembers(members, {country?, type?, wg?, expertise?})` AND-combines; test.
- [ ] Knowledge hub with category/type filters, member-only lock badge. Activities page lists programmes A–J + extra services table (what/who/value/how/free or member).
- [ ] Commit.

### Task 7: Membership application journey
**Files:** `join/page.tsx`, `src/components/join/ApplicationWizard.tsx` (client, 8 steps), `src/lib/validation/application.ts` (zod), `src/app/api/applications/route.ts`, `src/lib/db/{index,demo,supabase}.ts`
- [ ] Zod schemas per step; `requiresVat(country)` true for EU-27; test: DE org without VAT → error; CH org without VAT → ok; individual never needs VAT.
- [ ] API route: validates; if `hasSupabase()` inserts into `applications`; else returns `{stored:false, mode:'demo'}`. Wizard shows explicit demo notice; never says "submitted successfully" in demo.
- [ ] Commit.

### Task 8: Auth and member portal
**Files:** `login/page.tsx`, `portal/layout.tsx`, `portal/page.tsx`, `portal/{profile,membership,working-groups,events,documents,organisation,admin}/page.tsx`, `src/lib/auth.ts`, middleware update
- [ ] `getSession()` reads Supabase cookie session or, in demo mode, a signed `dp_demo_role` cookie set by `/login` demo buttons (member / wg-chair / admin / org-admin). `requireRole(roles)` redirects to `/login`.
- [ ] Test: `auth.test.ts` — `canAccess('wg-chair', 'portal/admin') === false`, `canAccess('admin','portal/admin') === true`.
- [ ] Dashboard cards per brief; organisation dashboard with representatives list; admin: applications queue (demo data) with approve/reject buttons that call API (demo: no-op with notice).
- [ ] Commit.

### Task 9: Supabase schema, integrations and docs
**Files:** `supabase/migrations/0001_init.sql`, `supabase/seed.sql`, `.env.example`, `README.md`, `docs/INTEGRATIONS.md`, `docs/BUSINESS-MODEL.md`
- [ ] Tables: profiles, organisations, organisation_members, memberships (category, fee_tier, status, renewal_at), applications, working_groups, wg_memberships (role), events, event_registrations, resources, news, invoices, notifications; RLS policies; roles enum.
- [ ] INTEGRATIONS: Supabase, Stripe (post-approval payment), Resend/Postmark email, Vercel; each with env vars and status "not configured".
- [ ] BUSINESS-MODEL: revenue lines mapped to § 3 b; non-profit limits (§ 3a 10 %).
- [ ] Commit.

### Task 10: Build, route check, responsiveness, push
- [ ] `npm run build`; run `scripts/check-routes.mjs` against `next start`: all 200 in en and fr.
- [ ] Playwright screenshots at 390 / 820 / 1440 for Home, Membership, WG detail, Join step 1, Portal dashboard; inspect.
- [ ] Push to `Belouettar/digipass-europe-website` main.
