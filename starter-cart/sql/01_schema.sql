-- 01_schema.sql
-- Modele relationnel "boutique" (PostgreSQL)

BEGIN;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_customers_email UNIQUE (email)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_categories_name UNIQUE (name),
  CONSTRAINT uq_categories_slug UNIQUE (slug)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL,
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_products_sku UNIQUE (sku),
  CONSTRAINT chk_products_price_positive CHECK (price > 0),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_number VARCHAR(100) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  ordered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_orders_order_number UNIQUE (order_number),
  CONSTRAINT chk_orders_status CHECK (status IN ('pending', 'paid', 'cancelled')),
  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE order_items (
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  CONSTRAINT pk_order_items PRIMARY KEY (order_id, product_id),
  CONSTRAINT chk_order_items_quantity_positive CHECK (quantity > 0),
  CONSTRAINT chk_order_items_price_positive CHECK (unit_price > 0),
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

COMMIT;
