DROP TABLE IF EXISTS travel_destination CASCADE;
CREATE TABLE travel_destination(
    id SERIAL PRIMARY KEY NOT NULL,
    users_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    city_name VARCHAR(255) NOT NULL,
    country_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    travel_start_date DATE NOT NULL,
    travel_end_date DATE NOT NULL 
);