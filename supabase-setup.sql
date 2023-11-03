-- Scripts to run to set the SQL tables

-- players - not editable from APP
create table
  public.siatka - players (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name character varying not null,
    settings json null,
    "isAdmin" boolean not null default false,
    constraint siatka - players_pkey primary key (id)
  ) tablespace pg_default;


-- teams - not editable from the APP
-- teams avatars need to be added to the supabase storage along the plika.png file
-- after creating the table, the avatar URLs need to be linked copied and paste to the avatar column
create table
  public.siatka - teams (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name character varying not null,
    "shortName" character varying not null,
    avatar character varying not null,
    "avatar_URL" text null,
    constraint siatka - teams_pkey primary key (id)
  ) tablespace pg_default;


-- games, first create the sequence to number the games, then the games tabke itself
create sequence siatka_game_no_seq
    start with 1
    increment by 1
    no maxvalue
    no minvalue;

create table
  public.siatka - games (
    id uuid not null default gen_random_uuid (),
    "dateTime" timestamp without time zone not null,
    "teamHome" uuid not null,
    "teamAway" uuid not null,
    result character varying null,
    winner smallint null,
    round smallint not null,
    "gameNo" smallint null default nextval('siatka_game_no_seq'::regclass),
    constraint siatka - games_pkey primary key (id),
    constraint siatka - games_teamAway_fkey foreign key ("teamAway") references "siatka-teams" (id),
    constraint siatka - games_teamHome_fkey foreign key ("teamHome") references "siatka-teams" (id)
  ) tablespace pg_default;


  -- bets
  create table
  public.siatka - bets (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    "userId" uuid not null,
    "gameId" uuid not null,
    bet smallint not null,
    constraint siatka - bets_pkey primary key (id),
    constraint siatka - bets_user_game_Unique unique ("userId", "gameId"),
    constraint siatka - bets_gameId_fkey foreign key ("gameId") references "siatka-games" (id),
    constraint siatka - bets_userId_fkey foreign key ("userId") references "siatka-players" (id)
  ) tablespace pg_default;


-- VIEW to check the bets on the supabase editor page
create view
  public.bets_view as
select
  g.round,
  p.name,
  t1.name as homename,
  t2.name as awayname,
  b.bet,
  g.result,
  g.winner
from
  "siatka-bets" b
  join "siatka-players" p on b."userId" = p.id
  join "siatka-games" g on b."gameId" = g.id
  join "siatka-teams" t1 on g."teamHome" = t1.id
  join "siatka-teams" t2 on g."teamAway" = t2.id
order by
  g.round;

