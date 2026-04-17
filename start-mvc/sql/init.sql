CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, price_cents)
VALUES
  ('Tapis de souris XXL', 1900),
  ('Hub USB-C', 4200),
  ('Webcam Full HD', 6900)
ON CONFLICT DO NOTHING;
