create table if not exists species (
    name text primary key
);

create table if not exists sightings (
    ssemmi_id text primary key,
    data_source_name text not null,
    data_source_entity text not null,
    data_source_id integer not null,
    created timestamp not null,
    no_sighted integer not null,
    latitude numeric(9, 6) not null,
    longitude numeric(9, 6) not null,
    species text not null references species(name),
    trusted boolean not null,
    data_source_comments text
);
