-- Replace public.current_role_of(uid) — callable over the REST API by anyone, which let callers look up any user's role —
-- with private.current_app_role(): no argument (returns only the caller's own role) and in a schema PostgREST does not expose.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated, service_role;

create or replace function private.current_app_role() returns public.app_role
language sql stable security definer set search_path = public, pg_temp
as $$ select role from public.profiles where id = auth.uid() $$;
revoke all on function private.current_app_role() from public;
grant execute on function private.current_app_role() to anon, authenticated, service_role;

drop policy "profiles: admin all" on profiles;
drop policy "memberships: admin" on memberships;
drop policy "applications: admin" on applications;
drop policy "wg: chair/admin manage" on wg_memberships;
drop policy "registrations: own read" on event_registrations;
drop policy "contact: admin read" on contact_messages;
drop policy "deletion: admin" on deletion_requests;
drop policy "orgmembers: admin" on organisation_members;
drop function public.current_role_of(uuid);

create policy "profiles: admin all" on profiles for all using (private.current_app_role() = 'admin');
create policy "memberships: admin" on memberships for all using (private.current_app_role() = 'admin');
create policy "applications: admin" on applications for all using (private.current_app_role() = 'admin');
create policy "wg: chair/admin manage" on wg_memberships for all using (private.current_app_role() in ('wg-chair','admin'));
create policy "registrations: own read" on event_registrations for select using (profile_id = auth.uid() or private.current_app_role() = 'admin');
create policy "contact: admin read" on contact_messages for select using (private.current_app_role() = 'admin');
create policy "deletion: admin" on deletion_requests for all using (private.current_app_role() = 'admin');
create policy "orgmembers: admin" on organisation_members for all using (private.current_app_role() = 'admin');
