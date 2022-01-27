DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins(
    id SERIAL PRIMARY KEY NOT NULL,
    travel_destination_id INTEGER REFERENCES travel_destination(id) ON DELETE CASCADE,
    pinned_name VARCHAR NOT NULL,
    long float NOT NULL,
    lat float NOT NULL,
    date DATE NOT NULL
);