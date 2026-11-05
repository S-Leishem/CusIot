create extension if not exists "pgcrypto";
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique,
  description text, image_url text, is_active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique,
  description text, price numeric(12,2) not null check (price >= 0), stock_quantity integer not null default 0 check (stock_quantity >= 0),
  image_url text, category_id uuid references public.categories(id) on delete set null, is_featured boolean not null default false,
  is_published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.store_settings (
  id uuid primary key default gen_random_uuid(), store_name text not null default 'CusIot',
  whatsapp_number text not null default '918837473684', primary_email text not null default 'cusiot.store@gmail.com',
  secondary_email text not null default 'cusiot@aol.com', delivery_charge numeric(12,2) not null default 50,
  free_delivery_threshold numeric(12,2), currency text not null default 'INR', announcement text, updated_at timestamptz not null default now()
);
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.store_settings enable row level security;
create policy "Public can read active categories" on public.categories for select using (is_active = true);
create policy "Public can read published products" on public.products for select using (is_published = true);
create policy "Public can read store settings" on public.store_settings for select using (true);
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict (id) do nothing;
create policy "Public can read product images" on storage.objects for select using (bucket_id = 'product-images');
