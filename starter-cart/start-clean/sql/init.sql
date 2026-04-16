CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, price_cents)
VALUES
  ('Clavier mecanique', 7900),
  ('Souris sans fil', 3500),
  ('Ecran 24 pouces', 15900)
ON CONFLICT DO NOTHING;
