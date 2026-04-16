import type { Pool } from "pg";
import type { Product } from "../models/Product";

const seedProducts: Product[] = [
  { id: "aa1", name: "apple", price: 10.5 },
  { id: "bb1", name: "raspberry", price: 13 },
  { id: "cc2", name: "strawberry", price: 7.8 }
];

const seedStocks = [
  { productId: "aa1", stock: 20 },
  { productId: "bb1", stock: 5 },
  { productId: "cc2", stock: 10 }
];

// Initialisation technique PostgreSQL (schema + donnees de base).
// Fonction idempotente: peut etre appelee a chaque demarrage.
export async function seedPostgresDatabase(pool: Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL CHECK (price > 0)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS inventories (
      product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
      stock INTEGER NOT NULL CHECK (stock >= 0)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cart_items (
      product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL CHECK (quantity >= 0)
    )
  `);

  for (const item of seedProducts) {
    await pool.query(
      "INSERT INTO products (id, name, price) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
      [item.id, item.name, item.price]
    );
  }

  for (const item of seedStocks) {
    await pool.query(
      "INSERT INTO inventories (product_id, stock) VALUES ($1, $2) ON CONFLICT (product_id) DO NOTHING",
      [item.productId, item.stock]
    );
  }
}
