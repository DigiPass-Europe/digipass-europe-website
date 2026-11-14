-- DigiPass:Europe — initial schema. Mirrors src/content types and src/lib/db/demo.ts.
-- Apply with: supabase db push   (or paste into the SQL editor)

create extension if not exists "pgcrypto";

create type app_role as enum ('member', 'wg-chair', 'org-admin', 'admin');
create type membership_category as enum ('ordinary-legal-entity', 'ordinary-individual', 'extraordinary', 'corresponding', 'honorary', 'supporter');
create type membership_status as enum ('pending', 'active', 'suspended', 'expired', 'terminated');
create type application_status as enum ('submitted', 'awaiting-endorsement', 'ready', 'approved', 'rejected');
create type wg_role as enum ('participant', 'chair', 'vice-chair');

create table organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null, website text, type text not null, employees text, country char(2) not null, vat text,
  description text, logo_url text, expertise text[] default '{}', sectors text[] default '{}',
  published boolean not null default false, created_at timestamptz default now()
);

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null, email text not null, position text, country char(2), profile text, expertise text[] default '{}',
  role app_role not null default 'member', organisation_id uuid references organisations,
  directory_visible boolean not null default false, newsletter boolean not null default true, regulatory_alerts boolean not null default false,
  created_at timestamptz default now()
);

create table organisation_members (
  organisation_id uuid references organisations on delete cascade, profile_id uuid references profiles on delete cascade,
  is_voting_representative boolean not null default false, primary key (organisation_id, profile_id)
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles, organisation_id uuid references organisations,
  category membership_category not null, fee_tier text not null, fee_category text check (fee_category in ('small','medium','large')),
  votes smallint not null default 1 check (votes between 0 and 4),            -- § 10 g
  status membership_status not null default 'pending', member_since date, renewal_at date,
  check (profile_id is not null or organisation_id is not null)
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('individual','organisational','supporter')), tier text not null,
  applicant jsonb not null, organisation jsonb, working_groups text[] default '{}', consents jsonb not null,
  status application_status not null default 'submitted',
  endorsements jsonb default '[]',          -- [{profile_id, is_board_member, at}] — § 4 f: two endorsements, one from a Board member
  decision_reason text, decided_at timestamptz, created_at timestamptz default now()
);

create table working_groups (
  id text primary key, code text not null, slug text not null unique, name_en text not null, name_fr text not null
);
create table wg_memberships (
  working_group_id text references working_groups, profile_id uuid references profiles on delete cascade,
  role wg_role not null default 'participant', joined_at timestamptz default now(), primary key (working_group_id, profile_id)
);
create table wg_proposals (
  id uuid primary key default gen_random_uuid(), proposer_id uuid references profiles, title text not null, scope text not null,
  status text not null default 'submitted', created_at timestamptz default now()
);

create table events (
  slug text primary key, type text not null, title_en text not null, title_fr text not null, starts_at timestamptz not null, ends_at timestamptz,
  location_en text, location_fr text, online boolean default false, price_members numeric, price_non_members numeric, working_groups text[] default '{}'
);
create table event_registrations (
  id uuid primary key default gen_random_uuid(), slug text references events, name text not null, email text not null, organisation text,
  is_member boolean default false, consent boolean not null, profile_id uuid references profiles, created_at timestamptz default now()
);

create table resources (
  id uuid primary key default gen_random_uuid(), type text not null, title_en text not null, title_fr text not null, summary_en text, summary_fr text,
  file_url text, working_group_id text references working_groups, sectors text[] default '{}', members_only boolean not null default false, published_at date
);
create table news (
  slug text primary key, category text not null, title_en text not null, title_fr text not null, excerpt_en text, excerpt_fr text,
  body_en text, body_fr text, author text, tags text[] default '{}', published_at date, author_id uuid references profiles
);

create table invoices (
  id text primary key, membership_id uuid references memberships, amount numeric not null, currency char(3) default 'EUR',
  issued_at date not null, due_at date, paid_at date, stripe_payment_intent text, pdf_url text
);
create table collaboration_requests (
  id uuid primary key default gen_random_uuid(), profile_id uuid references profiles, title text not null, body text not null,
  working_group_id text references working_groups, status text default 'open', created_at timestamptz default now()
);
create table notifications (
  id uuid primary key default gen_random_uuid(), profile_id uuid references profiles on delete cascade, kind text not null, payload jsonb, read_at timestamptz, created_at timestamptz default now()
);
create table contact_messages (
  id uuid primary key default gen_random_uuid(), name text, email text, organisation text, subject text, message text, consent boolean, created_at timestamptz default now()
);
create table deletion_requests (
  id uuid primary key default gen_random_uuid(), profile_id uuid references profiles, requested_at timestamptz default now(), processed_at timestamptz
);

-- Row-level security ------------------------------------------------------
alter table profiles enable row level security;
alter table organisations enable row level security;
alter table memberships enable row level security;
alter table applications enable row level security;
alter table wg_memberships enable row level security;
alter table event_registrations enable row level security;
alter table resources enable row level security;
alter table invoices enable row level security;
alter table collaboration_requests enable row level security;
alter table notifications enable row level security;
alter table contact_messages enable row level security;
alter table deletion_requests enable row level security;
alter table organisation_members enable row level security;
alter table wg_proposals enable row level security;
alter table working_groups enable row level security;
alter table events enable row level security;
alter table news enable row level security;

create or replace function current_role_of(uid uuid) returns app_role language sql stable security definer set search_path = public as $$ select role from profiles where id = uid $$;

create policy "profiles: own read/write" on profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles: members read visible" on profiles for select using (directory_visible and auth.uid() is not null);
create policy "profiles: admin all" on profiles for all using (current_role_of(auth.uid()) = 'admin');

create policy "organisations: public read published" on organisations for select using (published);
create policy "organisations: org admins update" on organisations for update using (exists (select 1 from profiles p where p.id = auth.uid() and p.organisation_id = organisations.id and p.role in ('org-admin','admin')));

create policy "memberships: own" on memberships for select using (profile_id = auth.uid() or organisation_id in (select organisation_id from profiles where id = auth.uid()));
create policy "memberships: admin" on memberships for all using (current_role_of(auth.uid()) = 'admin');

create policy "applications: insert by anyone" on applications for insert with check (true);
create policy "applications: admin" on applications for all using (current_role_of(auth.uid()) = 'admin');

create policy "wg: members read" on wg_memberships for select using (auth.uid() is not null);
create policy "wg: self join/leave" on wg_memberships for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "wg: chair/admin manage" on wg_memberships for all using (current_role_of(auth.uid()) in ('wg-chair','admin'));

create policy "registrations: insert" on event_registrations for insert with check (true);
create policy "registrations: own read" on event_registrations for select using (profile_id = auth.uid() or current_role_of(auth.uid()) = 'admin');

create policy "resources: public" on resources for select using (not members_only);
create policy "resources: members" on resources for select using (auth.uid() is not null);

create policy "invoices: own" on invoices for select using (membership_id in (select id from memberships where profile_id = auth.uid() or organisation_id in (select organisation_id from profiles where id = auth.uid())));
create policy "collab: members" on collaboration_requests for all using (auth.uid() is not null) with check (profile_id = auth.uid());
create policy "notifications: own" on notifications for all using (profile_id = auth.uid());

create policy "contact: insert by anyone" on contact_messages for insert with check (true);
create policy "contact: admin read" on contact_messages for select using (current_role_of(auth.uid()) = 'admin');
create policy "deletion: own insert" on deletion_requests for insert with check (profile_id = auth.uid());
create policy "deletion: admin" on deletion_requests for all using (current_role_of(auth.uid()) = 'admin');
create policy "orgmembers: own org read" on organisation_members for select using (profile_id = auth.uid() or organisation_id in (select organisation_id from profiles where id = auth.uid()));
create policy "orgmembers: admin" on organisation_members for all using (current_role_of(auth.uid()) = 'admin');
create policy "wgprop: members" on wg_proposals for all using (auth.uid() is not null) with check (proposer_id = auth.uid());
create policy "wg: public read" on working_groups for select using (true);
create policy "events: public read" on events for select using (true);
create policy "news: public read" on news for select using (true);
