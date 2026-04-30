-- ============================================================
-- SYNK — Schema da base de dados (PostgreSQL via Supabase)
-- Corre este ficheiro no SQL Editor do teu projeto Supabase:
-- https://supabase.com -> SQL Editor -> New Query -> Colar -> Run
-- ============================================================

-- 1. PROFILES — extensão da tabela auth.users do Supabase
create table if not exists profiles (
  id        uuid primary key references auth.users on delete cascade,
  tipo      text not null check (tipo in ('empresa', 'especialista')),
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Utilizador vê o seu próprio perfil"
  on profiles for select using (auth.uid() = id);
create policy "Utilizador insere o seu próprio perfil"
  on profiles for insert with check (auth.uid() = id);

-- 2. EMPRESAS
create table if not exists empresas (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users on delete cascade,
  nome             text not null,
  nome_responsavel text not null,
  email            text not null,
  telefone         text,
  pais             text default 'Portugal',
  tamanho          text,                      -- '1–10', '11–50', ...
  tipos_automacao  text[] default '{}',       -- ['RPA', 'IA / LLMs', ...]
  created_at       timestamptz default now()
);
alter table empresas enable row level security;
create policy "Empresa vê o seu próprio registo"
  on empresas for select using (auth.uid() = user_id);
create policy "Empresa insere o seu registo"
  on empresas for insert with check (auth.uid() = user_id);
create policy "Empresa atualiza o seu registo"
  on empresas for update using (auth.uid() = user_id);

-- 3. ESPECIALISTAS
create table if not exists especialistas (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users on delete cascade,
  nome              text not null,
  email             text not null,
  telefone          text,
  linkedin          text,
  portfolio         text,
  pais              text default 'Portugal',
  anos_experiencia  text,
  skills            text[] default '{}',      -- ['RPA (UiPath, AA)', 'Python Automation', ...]
  bio               text,
  preco_hora        numeric,
  disponivel_agora  boolean default true,
  disponivel_em     int default 0,            -- dias até estar disponível
  rating            numeric default 0,
  num_avaliacoes    int default 0,
  verificado        boolean default false,    -- activado manualmente pela Synk
  created_at        timestamptz default now()
);
alter table especialistas enable row level security;
-- Especialistas verificados são visíveis a todos
create policy "Especialistas verificados são públicos"
  on especialistas for select using (verificado = true or auth.uid() = user_id);
create policy "Especialista insere o seu perfil"
  on especialistas for insert with check (auth.uid() = user_id);
create policy "Especialista atualiza o seu perfil"
  on especialistas for update using (auth.uid() = user_id);
create policy "Admin pode verificar especialistas"
  on especialistas for update
  using (
    (select email from auth.users where id = auth.uid()) = 'khalidshah1328@gmail.com'
  );

-- 4. PROJETOS (publicados pelas empresas)
create table if not exists projetos (
  id              uuid primary key default gen_random_uuid(),
  empresa_id      uuid references empresas on delete cascade,
  titulo          text not null,
  descricao       text,
  tipo_automacao  text,
  orcamento       int,
  prazo           text,                      -- 'urgent', 'short', 'normal', 'flexible'
  setor           text,
  estado          text default 'aberto' check (estado in ('aberto', 'em_andamento', 'concluido', 'cancelado', 'pendente_pagamento')),
  created_at      timestamptz default now()
);
alter table projetos enable row level security;
create policy "Projetos abertos são públicos"
  on projetos for select using (estado = 'aberto' or auth.uid() = (select user_id from empresas where id = empresa_id));
create policy "Empresa insere projetos seus"
  on projetos for insert with check (
    auth.uid() = (select user_id from empresas where id = empresa_id)
  );
create policy "Empresa atualiza projetos seus"
  on projetos for update using (
    auth.uid() = (select user_id from empresas where id = empresa_id)
  );
create policy "Empresa apaga projetos seus"
  on projetos for delete using (
    auth.uid() = (select user_id from empresas where id = empresa_id)
  );

-- 5. MATCHES (quando o algoritmo liga especialista a projeto)
create table if not exists matches (
  id              uuid primary key default gen_random_uuid(),
  projeto_id      uuid references projetos on delete cascade,
  especialista_id uuid references especialistas on delete cascade,
  score           int,
  estado          text default 'pendente' check (estado in ('pendente', 'aceite', 'rejeitado')),
  created_at      timestamptz default now(),
  unique(projeto_id, especialista_id)
);
alter table matches enable row level security;
create policy "Partes envolvidas vêem os seus matches"
  on matches for select using (
    auth.uid() = (select user_id from especialistas where id = especialista_id)
    or
    auth.uid() = (select empresas.user_id from projetos join empresas on empresas.id = projetos.empresa_id where projetos.id = projeto_id)
  );

-- 6. LEADS (registos de interesse sem conta criada ainda)
create table if not exists leads (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  nome       text,
  tipo       text check (tipo in ('empresa', 'especialista', 'contacto')),
  dados      jsonb default '{}',
  created_at timestamptz default now()
);
-- leads são só inseríveis publicamente, nunca lidas pelo cliente
alter table leads enable row level security;
create policy "Qualquer um pode submeter um lead"
  on leads for insert with check (true);

-- 7. PROPOSTAS (candidaturas de especialistas a projetos)
-- (Tabela criada separadamente via SQL Editor — incluída aqui para referência)
-- create table if not exists propostas (
--   id              uuid primary key default gen_random_uuid(),
--   projeto_id      uuid references projetos on delete cascade,
--   especialista_id uuid references especialistas on delete cascade,
--   mensagem        text,
--   preco_proposto  numeric,
--   estado          text default 'pendente' check (estado in ('pendente', 'aceite', 'rejeitado')),
--   created_at      timestamptz default now(),
--   unique(projeto_id, especialista_id)
-- );
-- alter table propostas enable row level security;
-- Políticas necessárias para a tabela propostas:
-- create policy "Especialistas podem inserir propostas" on propostas for insert with check (auth.uid() = (select user_id from especialistas where id = especialista_id));
-- create policy "Especialista vê as suas propostas" on propostas for select using (auth.uid() = (select user_id from especialistas where id = especialista_id) or auth.uid() = (select u.user_id from projetos p join empresas u on u.id = p.empresa_id where p.id = projeto_id));
-- create policy "Empresa atualiza estado de propostas" on propostas for update using (auth.uid() = (select u.user_id from projetos p join empresas u on u.id = p.empresa_id where p.id = projeto_id));
-- create policy "Especialista edita próprias propostas" on propostas for update using (auth.uid() = (select user_id from especialistas where id = especialista_id));

-- Tabelas criadas. Regista utilizadores pelo formulário do site para adicionar dados.
