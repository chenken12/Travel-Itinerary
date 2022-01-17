DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY NOT NULL,
    users_id INTEGER REFERENCES users(id),
    travel_destination_id INTEGER REFERENCES travel_destination(id),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);