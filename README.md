# DigiPass:Europe — association platform

Official website and member platform of **DigiPass:Europe**, the European hub for the Digital Product Passport (digipass-europe.eu).

Next.js 16 · TypeScript · Tailwind CSS 4 · next-intl (EN/FR) · Supabase schema · Vercel-ready.

## Run

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en
npm test             # vitest: content model, filters, validation, roles, i18n parity
npm run build && npm start
BASE_URL=http://localhost:3000 npm run check:routes   # every page, both locales
```

Without environment variables the site runs in **demo mode**: all pages work, forms validate, and the member portal can be entered with four demonstration roles from `/en/login`. Nothing is stored. See `docs/INTEGRATIONS.md` to connect Supabase, email and Stripe.

## Deploy on Vercel
Import the repository, set the variables from `.env.example` (all optional), deploy. Add the `digipass-europe.eu` domain in the Vercel project.

## Structure
```
src/app/[locale]/        pages (public site, join wizard, login, portal)
src/app/api/             contact, events, applications (validate → store or demo)
src/content/             all content as typed EN/FR data (statutes-derived governance, 10 WGs, tiers, services, demo items)
src/lib/                 db layer, auth (Supabase or signed demo cookie), roles ACL, validation (zod), filters
messages/                UI strings en/fr (key parity enforced by test)
supabase/                schema (RLS) and seed
docs/                    design, plan, integrations, business model
```

## Content rules
- The association's name is always **DigiPass:Europe**. Governance text comes from the statutes only; no names before election.
- Fee tiers are **proposals** (`status: 'proposed'`) until the General Assembly adopts them (§ 10 c 8).
- Demonstration items carry `illustrative: true` and render an "Illustrative" badge.
- To edit content, change the files in `src/content/`; to add a language, see `docs/INTEGRATIONS.md`.

## Logo
`public/brand/` holds the current identity (green colon + European flag). Swap the SVGs to change it site-wide.
