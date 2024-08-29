CREATE DATABASE teste_shopper;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS measures (
    id UUID UNIQUE NOT NULL PRIMARY KEY,
    measure_value INTEGER NOT NULL,
    measure_datetime TIMESTAMP NOT NULL,
    measure_type VARCHAR(10) CHECK (measure_type IN ('WATER', 'GAS')),
    customer_code VARCHAR(50) NOT NULL,
    has_confirmed BOOLEAN DEFAULT FALSE,
    image_url VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (customer_code, measure_type)
);
