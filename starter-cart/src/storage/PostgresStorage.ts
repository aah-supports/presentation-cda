import type { Pool, PoolClient } from "pg";
import type { Inventory } from "../models/Inventory";
import type { Product } from "../models/Product";
import type { StorageItem } from "../models/StorageItem";
import type { Istorage } from "./Istorage";

type ProductRow = {
  id: string;
  name: string;
  price: number | string;
};

type StockRow = {
  stock: number | string;
};

type CartItemRow = {
  id: string;
  name: string;
  price: number | string;
  quantity: number | string;
};

const seedProducts: Product[] = [
  { id: "aa1", name: "apple", price: 10.5 },
  { id: "bb1", name: "raspberry", price: 13 },
  { id: "cc2", name: "strawberry", price: 7.8 }
];

const seedInventories: Inventory[] = [
  { productId: "aa1", stock: 20 },
  { productId: "bb1", stock: 5 },
  { productId: "cc2", stock: 10 }
];

const round_value = (value: number): number => Math.round(value * 100) / 100;

export class PostgresStorage implements Istorage {
  private readonly initPromise: Promise<void>;

  constructor(private readonly pool: Pool) {
    this.initPromise = this.ensureSchemaAndSeed();
  }

  async addItem(product: Product, quantity: number): Promise<StorageItem> {
    await this.initPromise;
    this.ensureQuantity(quantity);

    return this.withTransaction(async (client) => {
      const existingProduct = await this.getProductById(client, product.id);
      if (!existingProduct) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      const stockRow = await this.getStockForUpdate(client, product.id);
      if (!stockRow) {
        throw new Error("INVENTORY_NOT_FOUND");
      }

      const currentStock = Number(stockRow.stock);
      if (currentStock < quantity) {
        throw new Error("STOCK_NOT_ENOUGH");
      }

      await client.query(
        "UPDATE inventories SET stock = stock - $2 WHERE product_id = $1",
        [product.id, quantity]
      );

      await client.query(
        `INSERT INTO cart_items (product_id, quantity)
         VALUES ($1, $2)
         ON CONFLICT (product_id)
         DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
        [product.id, quantity]
      );

      const cartQuantityResult = await client.query<{ quantity: number | string }>(
        "SELECT quantity FROM cart_items WHERE product_id = $1",
        [product.id]
      );

      const totalQuantity = Number(cartQuantityResult.rows[0]?.quantity ?? quantity);

      return {
        product: existingProduct,
        quantity: totalQuantity,
        total: round_value(existingProduct.price * totalQuantity)
      };
    });
  }

  async listItems(): Promise<StorageItem[]> {
    await this.initPromise;

    const result = await this.pool.query<CartItemRow>(
      `SELECT p.id, p.name, p.price, ci.quantity
       FROM cart_items ci
       INNER JOIN products p ON p.id = ci.product_id
       WHERE ci.quantity > 0
       ORDER BY p.name`
    );

    return result.rows.map((row : any) => {
      const product: Product = {
        id: row.id,
        name: row.name,
        price: round_value(Number(row.price))
      };
      const quantity = Number(row.quantity);

      return {
        product,
        quantity,
        total: round_value(product.price * quantity)
      };
    });
  }

  async checkStock(productId: string): Promise<number> {
    await this.initPromise;

    const result = await this.pool.query<StockRow>(
      "SELECT stock FROM inventories WHERE product_id = $1",
      [productId]
    );

    if (result.rowCount === 0) {
      throw new Error("INVENTORY_NOT_FOUND");
    }

    return Number(result.rows[0].stock);
  }

  async getItem(productId: string): Promise<Product> {
    await this.initPromise;

    const result = await this.pool.query<ProductRow>(
      "SELECT id, name, price FROM products WHERE id = $1",
      [productId]
    );

    if (result.rowCount === 0) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      price: round_value(Number(row.price))
    };
  }

  private async ensureSchemaAndSeed(): Promise<void> {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL CHECK (price > 0)
      );
    `);

    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS inventories (
        product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
        stock INTEGER NOT NULL CHECK (stock >= 0)
      );
    `);

    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        product_id TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL CHECK (quantity >= 0)
      );
    `);

    for (const product of seedProducts) {
      await this.pool.query(
        "INSERT INTO products (id, name, price) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
        [product.id, product.name, product.price]
      );
    }

    for (const inventory of seedInventories) {
      await this.pool.query(
        "INSERT INTO inventories (product_id, stock) VALUES ($1, $2) ON CONFLICT (product_id) DO NOTHING",
        [inventory.productId, inventory.stock]
      );
    }
  }

  private async withTransaction<T>(run: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");
      const result = await run(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  private async getProductById(client: PoolClient, productId: string): Promise<Product | null> {
    const result = await client.query<ProductRow>(
      "SELECT id, name, price FROM products WHERE id = $1",
      [productId]
    );

    if (result.rowCount === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      price: round_value(Number(row.price))
    };
  }

  private async getStockForUpdate(client: PoolClient, productId: string): Promise<StockRow | null> {
    const result = await client.query<StockRow>(
      "SELECT stock FROM inventories WHERE product_id = $1 FOR UPDATE",
      [productId]
    );

    return result.rows[0] ?? null;
  }

  private ensureQuantity(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("QUANTITY_INVALID");
    }
  }
}
