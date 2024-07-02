CREATE TABLE IF NOT EXISTS packets (
    id SERIAL PRIMARY KEY,
    protocol INTEGER NOT NULL,
    source_ip VARCHAR(50) NOT NULL,
    destination_ip VARCHAR(50) NOT NULL
);
