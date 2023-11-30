--CREATES vehicles TABLE on fuel_api schema
CREATE TABLE fuel_api.vehicles (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    reg_number TEXT NOT NULL UNIQUE,
    total_liters NUMERIC,
    total_amount NUMERIC,
    total_distance NUMERIC,
    fuel_consumption NUMERIC
);
--CREATES fuel_entries TABLE on fuel_api schema
CREATE TABLE fuel_api.fuel_entries (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES fuel_api.vehicles(id),
    distance NUMERIC NOT NULL,
    liters NUMERIC NOT NULL,
    amount_paid NUMERIC NOT NULL,
    full_tank_refill boolean, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
