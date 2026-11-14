# Integrations and configuration

The site runs completely without external services (**demo mode**). Each integration below is wired in code and activates when its environment variables are set. Nothing pretends to work: in demo mode every form validates and then says plainly that nothing was stored.

| Capability | Provider | Status | Activated by | Code |
|---|---|---|---|---|
| Database, storage | Supabase (Postgres, us-east-1, project `supabase-cinnabar-elephant`, linked via Vercel Marketplace) | configured | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | `src/lib/db/index.ts`, `supabase/migrations` |
| Authentication | Supabase Auth (email+password, magic link) | configured (same project) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/auth/session.ts` |
| Demo roles | Signed HTTP-only cookie | active in demo mode | `SESSION_SECRET` | `src/lib/auth/actions.ts` |
| Membership payment | Stripe Checkout (invoice after Board approval) | **not configured** | `STRIPE_*` | to add: `src/app/api/stripe/*` |
| Transactional email | Resend or Postmark | **not configured** | `EMAIL_*` | to add: `src/lib/email.ts` |
| Hosting | Vercel | ready | import repo | `next.config.ts` |
| File uploads (logos, PDFs) | Supabase Storage | **not configured** | Supabase | application step 3 |
| CMS | none; typed content files | n/a | — | `src/content/*.ts` |

## Set-up order

1. **Supabase**: run `supabase/migrations/0001_init.sql`, `0002_private_role_helper.sql`, then `supabase/seed.sql` (already applied to the production project). Copy URL, anon key and service-role key to the environment. Applications, registrations and contact messages are now stored; the login page switches to real auth automatically.
2. **Auth routes**: implemented in `src/app/api/auth/{sign-in,magic-link,callback,sign-out}`. In Supabase → Authentication → URL Configuration set Site URL to `https://digipass-europe.eu` and add `https://digipass-europe.eu/api/auth/callback` (and the vercel.app preview host) to Redirect URLs.
3. **Email**: implement `sendEmail()` in `src/lib/email.ts` and call it from `api/applications` (confirmation to applicant + alert to `BOARD_NOTIFICATION_EMAIL`), `api/events` (confirmation), and a scheduled job for renewal reminders (60 and 30 days before `memberships.renewal_at`; Vercel Cron → `api/cron/renewals`).
4. **Stripe**: after a Board member sets an application to `approved`, create an invoice (`invoices` table) and a Checkout session; webhook marks `paid_at`. Card payment is optional — bank transfer remains the default for an Austrian association.
5. **Approval workflow**: `applications.endorsements` must contain two entries, one with `is_board_member = true`, before `status` can move to `ready` (statutes § 4 f). Enforce in the admin action.
6. **Storage**: bucket `logos` (public) and `documents` (members-only, signed URLs).

## GDPR notes
- Data is stored in the United States (Supabase us-east-1, Vercel). Sign Supabase's and Vercel's Data Processing Addenda (they include the EU Standard Contractual Clauses) and keep a record of the transfer; the privacy notice says so. Moving to an EU region later means a new Supabase project and a data export/import.
- Privacy notice at `/privacy`; retention periods listed there must match any cron clean-up jobs.
- Account deletion requests are written to `deletion_requests` and processed by the Secretariat; implement anonymisation of `profiles` while keeping invoice records (7 years, § 132 BAO).
- Directory and expert profiles are published only when `organisations.published` / `profiles.directory_visible` is true.

## Multilingual
`next-intl` with `messages/en.json` and `messages/fr.json`; content objects carry `{en, fr}`. To add a language: add the locale to `src/i18n/routing.ts`, a `messages/<xx>.json` with the same key set (a test enforces parity), and the field to `Localized`.
