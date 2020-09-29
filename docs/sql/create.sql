  -- ??
create table player (
  id serial not null primary key,
  username text not null, 
  password text not null
);


create table planet (
  id serial not null primary key,
  planet_type int not null,
  building_slot_total int not null,
  is_npc boolean not null,
  player_id serial not null references player(id)
);


create table planet_buildings (
  id serial not null primary key,
  mine_level int not null default 0,
  chemical_level int not null default 0,
  gas_level int not null default 0,
  energy_level int not null default 0,

  player_id int not null references player(id),
  planet_id int not null references planet(id)
);

create table player_resources (
  id serial not null primary key,
  minerals bigint not null default 100,
  chemicals bigint not null default 100,
  gases bigint not null default 100,
  energy bigint not null default 100,
  player_id serial not null references player(id)
);

create table planet_defences (
  id serial not null primary key,
  rocket_launcher_total bigint not null,
  laser_cannon_total bigint not null,
  defence_grid boolean not null default false,
  planetary_sheild boolean not null default false,
  player_id serial not null references player(id),
  planet_id serial not null references planet(id)
);

create table planet_fleet (
  id serial not null primary key,
  fighter_total int,
  frigate_total int,
  cruisers_total int,
  battleship_total int,
  battlecruiser_total int,
  bomber_total int,
  carrier_total int,
  drone_total int,
  mining_total int,
  research_total int,
  colonizer_total int,
  player_id int not null references player(id),
  planet_id serial not null references planet(id)
);

create table planet_fleet_queue_item (
  id serial not null primary key,
  fleet_item int not null,
  player_id int not null references player(id),
  planet_id serial not null references planet(id)
);


create table player_research (
  id serial not null primary key,
  -- research goes here
  player_id serial not null references planet(id)
);

create table player_research_queue_item (
  id serial not null primary key,
  research_item int not null,
  player_id int not null primary key player(id)
);
