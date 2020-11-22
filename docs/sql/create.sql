
SET TIMEZONE='UTC';

  -- ??
create table player (
  id serial not null primary key,
  email text not null,
  username text not null, 
  password text not null
);

create table player_research (
  id serial not null primary key,
  -- research goes here
  player_id int not null references player(id)
);

create table player_research_queue_item (
  id serial not null primary key,
  research_item int not null,
  player_id int not null primary key player(id)
);


create table planet (
  id serial not null primary key,
  planet_name text not null default 'Homeworld',
  planet_type text not null,
  building_slot_total int not null,
  is_npc boolean not null,
  player_id int not null references player(id)
);

create table planet_resources (
  id serial not null primary key,
  minerals bigint not null default 100,
  chemicals bigint not null default 100,
  gases bigint not null default 100,
  energy bigint not null default 100,
  last_updated_timestamp TIMESTAMPTZ default now(), -- no timezones 
  player_id int not null references player(id),
  planet_id int not null references planet(id)
);

create table planet_buildings (
  id serial not null primary key,
  mine int not null default 1,
  chemical int not null default 1,
  gas int not null default 1,
  energy int not null default 1,

  player_id int not null references player(id),
  planet_id int not null references planet(id)
);

create table planet_queue_item (
  id serial not null primary key,
  item_type text not null,
  item_key text not null,
  queue_timestamp TIMESTAMPTZ not null,
  player_id int not null references player(id),
  planet_id int not null references planet(id)
);


create table planet_defences (
  id serial not null primary key,
  rocket_launcher_total bigint not null default 0,
  laser_cannon_total bigint not null default 0,
  defence_grid boolean not null default false,
  planetary_sheild boolean not null default false,
  player_id int not null references player(id),
  planet_id int not null references planet(id)
);

create table planet_fleet (
  id serial not null primary key,
  fighter_total int default 0,
  frigate_total int default 0,
  cruisers_total int default 0,
  battleship_total int default 0,
  battlecruiser_total int default 0,
  bomber_total int default 0,
  carrier_total int default 0,
  drone_total int default 0,
  mining_total int default 0,
  research_total int default 0,
  colonizer_total int default 0,
  player_id int not null references player(id),
  planet_id int not null references planet(id)
);

create table planet_fleet_queue_item (
  id serial not null primary key,
  fleet_item int not null,
  player_id int not null references player(id),
  planet_id int not null references planet(id)
);

