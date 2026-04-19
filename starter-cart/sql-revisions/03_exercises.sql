-- 03_exercises.sql
-- 5 exercices sur PK, FK, CASCADE, UNIQUE et transactions
-- Prerequis: executer 01_schema.sql puis 02_seed.sql

-- EXERCICE 1 - PK composee (order_items)
-- Objectif: verifier qu'on ne peut pas inserer 2 fois le meme produit dans la meme commande.
BEGIN;

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 1, p.price
FROM orders o
JOIN products p ON p.sku = 'APL-001'
WHERE o.order_number = 'CMD-2026-0001';
-- Attendu: erreur PK (order_id, product_id) deja existant

ROLLBACK;


-- EXERCICE 2 - FK RESTRICT (customers -> orders)
-- Objectif: verifier qu'un client avec commandes ne peut pas etre supprime.
BEGIN;

DELETE FROM customers
WHERE email = 'alice.martin@example.com';
-- Attendu: erreur FK fk_orders_customer (DELETE RESTRICT)

ROLLBACK;


-- EXERCICE 3 - FK CASCADE (orders -> order_items)
-- Objectif: verifier que supprimer une commande supprime ses lignes.
BEGIN;

SELECT COUNT(*) AS before_count
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
WHERE o.order_number = 'CMD-2026-0002';

DELETE FROM orders
WHERE order_number = 'CMD-2026-0002';

SELECT COUNT(*) AS after_count
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
WHERE o.order_number = 'CMD-2026-0002';
-- Attendu: before_count > 0 et after_count = 0 (dans la transaction)

ROLLBACK;


-- EXERCICE 4 - UNIQUE (email client et sku produit)
-- Objectif: verifier les doublons interdits.
BEGIN;

INSERT INTO customers (full_name, email)
VALUES ('Test Duplicate Email', 'alice.martin@example.com');
-- Attendu: erreur uq_customers_email

INSERT INTO products (category_id, sku, name, price)
SELECT id, 'APL-001', 'Produit Duplique', 9.99
FROM categories
WHERE slug = 'fruits';
-- Attendu: erreur uq_products_sku

ROLLBACK;


-- EXERCICE 5 - Modele transactionnel (atomicite)
-- Objectif: inserer une commande + lignes dans une transaction.
-- Etape A: cas en echec -> rollback complet.
BEGIN;

INSERT INTO orders (customer_id, order_number, status)
SELECT id, 'CMD-2026-TX-FAIL', 'pending'
FROM customers
WHERE email = 'nina.morel@example.com';

-- ligne valide
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 2, p.price
FROM orders o
JOIN products p ON p.sku = 'EAU-001'
WHERE o.order_number = 'CMD-2026-TX-FAIL';

-- ligne invalide (quantity <= 0) => CHECK KO
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 0, p.price
FROM orders o
JOIN products p ON p.sku = 'CHI-001'
WHERE o.order_number = 'CMD-2026-TX-FAIL';

-- Si la ligne ci-dessus echoue, faire ROLLBACK;
ROLLBACK;

-- Verification: la commande ne doit pas exister
SELECT * FROM orders WHERE order_number = 'CMD-2026-TX-FAIL';


-- Etape B: cas succes -> commit.
BEGIN;

INSERT INTO orders (customer_id, order_number, status)
SELECT id, 'CMD-2026-TX-OK', 'pending'
FROM customers
WHERE email = 'nina.morel@example.com';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 2, p.price
FROM orders o
JOIN products p ON p.sku = 'EAU-001'
WHERE o.order_number = 'CMD-2026-TX-OK';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT o.id, p.id, 1, p.price
FROM orders o
JOIN products p ON p.sku = 'CHI-001'
WHERE o.order_number = 'CMD-2026-TX-OK';

COMMIT;

-- Verification finale
SELECT o.order_number, o.status, COUNT(oi.product_id) AS lines_count
FROM orders o
LEFT JOIN order_items oi ON oi.order_id = o.id
WHERE o.order_number = 'CMD-2026-TX-OK'
GROUP BY o.order_number, o.status;
