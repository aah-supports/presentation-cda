CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(32) NOT NULL CHECK (role IN ('admin', 'manager', 'viewer')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventories (
  product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  on_hand INTEGER NOT NULL CHECK (on_hand >= 0),
  reserved INTEGER NOT NULL DEFAULT 0 CHECK (reserved >= 0),
  reorder_point INTEGER NOT NULL DEFAULT 10 CHECK (reorder_point >= 0),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, price)
VALUES
  ('Tapis de souris XXL', 1900),
  ('Hub USB-C', 4200),
  ('Webcam Full HD', 6900)
ON CONFLICT DO NOTHING;

INSERT INTO users (email, role)
VALUES
  ('admin@example.com', 'admin'),
  ('manager@example.com', 'manager'),
  ('viewer@example.com', 'viewer')
ON CONFLICT (email) DO NOTHING;

INSERT INTO inventories (product_id, on_hand, reserved, reorder_point)
SELECT p.id, s.on_hand, s.reserved, s.reorder_point
FROM (
  VALUES
    ('Tapis de souris XXL', 120, 20, 30),
    ('Hub USB-C', 40, 8, 15),
    ('Webcam Full HD', 10, 5, 10)
) AS s(name, on_hand, reserved, reorder_point)
JOIN products p ON p.name = s.name
ON CONFLICT (product_id) DO NOTHING;
