-- 02_seed.sql
-- Donnees coherentes pour le modele relationnel boutique

BEGIN;

INSERT INTO customers (full_name, email, is_active)
VALUES
  ('Alice Martin', 'alice.martin@example.com', TRUE),
  ('Karim Benali', 'karim.benali@example.com', TRUE),
  ('Sophie Dubois', 'sophie.dubois@example.com', TRUE),
  ('Lucas Bernard', 'lucas.bernard@example.com', FALSE),
  ('Nina Morel', 'nina.morel@example.com', TRUE);

INSERT INTO categories (name, slug)
VALUES
  ('Fruits', 'fruits'),
  ('Boissons', 'boissons'),
  ('Snacks', 'snacks'),
  ('Entretien', 'entretien');

INSERT INTO products (category_id, sku, name, price, is_active)
SELECT c.id, p.sku, p.name, p.price, p.is_active
FROM (
  VALUES
    ('fruits',   'APL-001', 'Pomme Gala 1kg',       3.90, TRUE),
    ('fruits',   'BAN-001', 'Banane 1kg',           2.80, TRUE),
    ('boissons', 'JUS-001', 'Jus d''orange 1L',      2.50, TRUE),
    ('boissons', 'EAU-001', 'Eau minerale 1.5L',    0.95, TRUE),
    ('snacks',   'BIS-001', 'Biscuits chocolat',    1.90, TRUE),
    ('snacks',   'CHI-001', 'Chips sel 150g',       1.70, TRUE),
    ('entretien','SAV-001', 'Savon liquide 500ml',  2.30, TRUE),
    ('entretien','EPO-001', 'Eponge x2',            1.20, TRUE)
) AS p(category_slug, sku, name, price, is_active)
JOIN categories c ON c.slug = p.category_slug;

INSERT INTO orders (customer_id, order_number, status, ordered_at)
SELECT c.id, o.order_number, o.status, o.ordered_at
FROM (
  VALUES
    ('alice.martin@example.com', 'CMD-2026-0001', 'paid',      NOW() - INTERVAL '3 days'),
    ('karim.benali@example.com', 'CMD-2026-0002', 'pending',   NOW() - INTERVAL '2 days'),
    ('sophie.dubois@example.com','CMD-2026-0003', 'cancelled', NOW() - INTERVAL '1 day'),
    ('alice.martin@example.com', 'CMD-2026-0004', 'paid',      NOW() - INTERVAL '12 hours')
) AS o(email, order_number, status, ordered_at)
JOIN customers c ON c.email = o.email;

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, i.quantity, i.unit_price
FROM (
  VALUES
    ('CMD-2026-0001', 'APL-001', 2, 3.90),
    ('CMD-2026-0001', 'JUS-001', 1, 2.50),
    ('CMD-2026-0002', 'BAN-001', 3, 2.80),
    ('CMD-2026-0002', 'EAU-001', 6, 0.95),
    ('CMD-2026-0003', 'BIS-001', 1, 1.90),
    ('CMD-2026-0004', 'SAV-001', 2, 2.30),
    ('CMD-2026-0004', 'EPO-001', 4, 1.20)
) AS i(order_number, sku, quantity, unit_price)
JOIN orders o ON o.order_number = i.order_number
JOIN products p ON p.sku = i.sku;

COMMIT;
