create extension if not exists pgcrypto;

create table if not exists public.readiness_reports (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null,
  full_name text not null,
  address text not null,
  state text not null,
  report jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  stage text not null default 'New',
  address text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  customer_email text primary key,
  status text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null,
  updated_at timestamptz not null default now()
);

alter table public.readiness_reports enable row level security;
alter table public.deals enable row level security;
alter table public.subscriptions enable row level security;

drop policy if exists "readiness reports are insertable by service role only" on public.readiness_reports;
create policy "readiness reports are insertable by service role only"
on public.readiness_reports
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "users can see their own deals" on public.deals;
create policy "users can see their own deals"
on public.deals
for select
using (auth.uid() = user_id);

drop policy if exists "users can insert their own deals" on public.deals;
create policy "users can insert their own deals"
on public.deals
for insert
with check (auth.uid() = user_id);

drop policy if exists "service role manages subscriptions" on public.subscriptions;
create policy "service role manages subscriptions"
on public.subscriptions
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
