# DigiPass:Europe platform — design

## Intent
A European professional-association platform for DigiPass:Europe (Austrian non-profit Verein, seat Wiener Neustadt) that positions it as the European hub for the Digital Product Passport: credible to the European Commission, industry, research and standardisation bodies. Inspired by EMMC's structure (individual/organisational members, focus areas, events, resources) but more ambitious.

## Goals
- Public site: Home, About, Membership, Working Groups (10), Activities & Projects, Events, Knowledge Hub, News, Members Directory, Contact; prominent "Become a member".
- Membership model derived from the statutes (§ 4–7, § 10 g) with proposed fee tiers (clearly marked as proposals for the Board).
- 8-step application journey; member portal with role-based access (visitor, member, WG participant, WG chair, admin); organisation dashboard.
- Services beyond an association: Observatory, Knowledge Hub, Webinars, Annual Conference, Brokerage, Case Studies, Training Academy, Awards, Funding Radar, Expert Directory, plus ≥5 distinctive extras.
- EN primary, FR second, more languages addable.
- Real architecture: Next.js + TypeScript + Tailwind, Supabase (Postgres, Auth, Storage) schema and migrations, Stripe/email as documented integration points. Runs fully in demo mode without keys.

## Non-goals / anti-goals
- No invented Board members, partners, endorsements or statutory provisions.
- No fake payments or "saved" registrations without a backend: demo mode says so.
- No startup visual language, no generic templates.

## Constraints from the statutes
- Categories: ordinary (legal entities § 4 b 1; qualified individuals § 4 b 2), extraordinary (students/pupils), corresponding, honorary. Price tiers are fee categories (small/medium/large, § 4 g) decided by the Board, not new categories. "Associate Individual" is presented as a non-member Supporter subscription.
- Votes: legal entities 2–4, individuals and honorary 1 (§ 10 g). Sponsorship never adds votes.
- Admission: text-form application, two endorsements incl. one Board member, Board decides (§ 4 f).
- Governance: Board (≥5 founders, President, Vice-Presidents, Finance Officer, Secretary; 2-year terms), General Assembly, two Auditors, General Secretariat, Arbitration Tribunal. § 12 Scientific Advisory Board is struck out and omitted.
- Non-profit per §§ 34–47 BAO; commercial activity subordinate (§ 3a).

## Approaches considered
1. Static marketing site + external membership SaaS — fast, but no portal/WG workflow of our own; weak on "platform". Rejected.
2. Headless CMS + Next.js + Supabase — most flexible long-term, but adds a CMS to configure before anything runs. Deferred: content lives in typed data files now, CMS-ready later.
3. **Next.js App Router + typed content + Supabase schema with demo mode** — chosen: runs immediately, real auth/data once keys exist, one repo to deploy on Vercel.

## Decided
- Stack: Next.js 15 (App Router), TypeScript, Tailwind v4, next-intl (en/fr), Supabase JS. Content under `src/content/*.ts`. SQL under `supabase/migrations`. Demo data mirrors the schema.
- Identity: logo "green colon + EU flag"; palette Europe blue #003399, cycle green #1E8A5A, trace ink #0B2B3A, paper #F6F5F1, gold #FFCC00; Instrument Sans.
- Demo content labelled "Illustrative" wherever not official.
- Delivery: GitHub repo `digipass-europe-website`, Vercel-ready, README with configuration steps.

## Left to the builder
Component details, illustration style of the ecosystem diagram, exact copy, the five+ extra services' design.
