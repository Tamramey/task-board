-- 物件管理テーブル
-- Supabaseダッシュボードの「SQL Editor」でこのファイルの内容を実行してください。
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,                 -- 物件名
  rent integer not null,              -- 家賃(円)
  area text not null,                 -- エリア名
  layout text not null,               -- 間取り(例: 1LDK)
  user_id uuid not null references auth.users (id) on delete cascade, -- 登録したユーザー
  created_at timestamptz not null default now()
);

-- RLS(Row Level Security)を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
create policy "select_own_properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分自身のuser_idでのみ新規登録できる
create policy "insert_own_properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "update_own_properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "delete_own_properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
