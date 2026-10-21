create table if not exists acartia.species (
    id bigint generated always as identity primary key,
    name text
);

-- Maps ingested 'raw' species / types to the species table.
create table if not exists acartia.species_mapping (
    species_id bigint references species(id),
    name text
);

create table if not exists acartia.sightings (
    entry_id text primary key,
    ssemmi_id text not null, -- TODO what is this?
    data_source_name text not null,
    data_source_entity text not null,
    data_source_witness text,
    -- data_source_id integer not null,
    data_source_id integer,
    created timestamp not null,
    no_sighted integer not null,
    latitude numeric(9, 6) not null,
    longitude numeric(9, 6) not null,
    species_id bigint references species(id),
    raw_species text not null,
    trusted boolean not null,
    data_source_comments text,
    photo_url text
);

create table if not exists acartia.users (
    id bigint generated always as identity primary key,
    email text not null, -- TODO should ignore case, should also have unique constraint
    password text not null,
    name text not null,
    website text,
    is_approved boolean not null
);
