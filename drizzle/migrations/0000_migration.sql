create table public.districts (id serial primary key, name text not null unique, eta_min int not null, eta_max int not null, courier_eligible boolean not null default true, note text);
create table public.lots (id serial primary key, lot_code text not null unique, abv text not null, residue text not null, volatile_acidity text not null, heavy_metals text not null, test_date text not null, method text not null, status text not null default 'ANALİTİK UYGUNLUK ONAYLI');
create table public.orders (id uuid primary key default gen_random_uuid(), order_no text not null unique, items jsonb not null default '[]', total numeric not null default 0, full_name text not null, phone text not null, email text, city text not null default 'İstanbul', district text, address text not null, delivery_type text not null default 'cargo', payment_type text not null default 'door-card', notes text, status text not null default 'SİPARİŞ ALINDI', created_at timestamptz not null default now());
create table public.inquiries (id uuid primary key default gen_random_uuid(), name text not null, company text, email text, phone text, message text not null, product text, created_at timestamptz not null default now());
grant select on public.districts, public.lots to anon, authenticated;
grant all on public.districts, public.lots, public.orders, public.inquiries to service_role;
grant usage on sequence public.districts_id_seq, public.lots_id_seq to service_role;
alter table public.districts enable row level security;
alter table public.lots enable row level security;
alter table public.orders enable row level security;
alter table public.inquiries enable row level security;
create policy "public read districts" on public.districts for select to anon, authenticated using (true);
create policy "public read lots" on public.lots for select to anon, authenticated using (true);
insert into public.districts (name, eta_min, eta_max, note) values
('Kadıköy',45,60,'Zanaat Vadisi çıkışlı'),('Beşiktaş',60,75,'Boğaz hattı'),('Şişli',60,80,'Merkez trafik bandı'),('Üsküdar',50,65,'Sahil hattı'),('Bakırköy',75,90,'E-5 batı'),('Beylikdüzü',90,120,'Uç batı hattı'),('Pendik',60,80,'Anadolu yakası doğu'),('Sarıyer',75,95,'Kuzey orman hattı');
insert into public.lots (lot_code, abv, residue, volatile_acidity, heavy_metals, test_date, method) values
('DLM-96-2026-B4','%96.22','< 0.0005%','< 12 ppm','Tespit Edilemedi','2026-10','Akredite Spektrometre + Gaz Kromatografisi'),
('DLM-96-2026-A2','%96.08','< 0.0006%','< 11 ppm','Tespit Edilemedi','2026-08','Akredite Spektrometre + Gaz Kromatografisi'),
('DLM-96-2025-C7','%96.41','< 0.0004%','< 9 ppm','Tespit Edilemedi','2025-12','Akredite Spektrometre + Titrimetrik Analiz');