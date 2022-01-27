DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY NOT NULL,
    users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    travel_destination_id INTEGER REFERENCES travel_destination(id) ON DELETE CASCADE,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);