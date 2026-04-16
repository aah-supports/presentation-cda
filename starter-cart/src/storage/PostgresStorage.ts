import type { Pool } from "pg";
import type { Product } from "../models/Product";
import type { StorageItem } from "../models/StorageItem";
import type { Istorage } from "./Istorage";
import type { CartRow, ProductRow, StockRow } from "./types";

// Arrondi d'affichage pour eviter les artefacts flottants.
const round2 = (value: number): number => Math.round(value * 100) / 100;

export class PostgresStorage implements Istorage {
  constructor(private readonly pool: Pool) {}

  async getItem(productId: string): Promise<Product> {
    // Recuperation du produit de reference.
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
      price: round2(Number(row.price))
    };
  }

  async checkStock(productId: string): Promise<number> {
    // Lecture simple du stock courant.
    const result = await this.pool.query<StockRow>(
      "SELECT stock FROM inventories WHERE product_id = $1",
      [productId]
    );

    if (result.rowCount === 0) {
      throw new Error("INVENTORY_NOT_FOUND");
    }

    return Number(result.rows[0].stock);
  }

  async listItems(): Promise<StorageItem[]> {
    // Le panier persiste est reconstruit via jointure panier + produits.
    const result = await this.pool.query<CartRow>(
      `SELECT p.id, p.name, p.price, ci.quantity
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.quantity > 0
       ORDER BY p.name`
    );

    return result.rows.map((row) => {
      const product: Product = {
        id: row.id,
        name: row.name,
        price: round2(Number(row.price))
      };
      const quantity = Number(row.quantity);

      return {
        product,
        quantity,
        total: round2(product.price * quantity)
      };
    });
  }

  async addItem(product: Product, quantity: number): Promise<StorageItem> {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("QUANTITY_INVALID");
    }

    // Connection dediee pour piloter explicitement BEGIN/COMMIT/ROLLBACK.
    const client = await this.pool.connect();

    try {
      // Transaction: stock et panier doivent rester coherents.
      await client.query("BEGIN");

      const productResult = await client.query<ProductRow>(
        "SELECT id, name, price FROM products WHERE id = $1",
        [product.id]
      );

      if (productResult.rowCount === 0) {
        throw new Error("PRODUCT_NOT_FOUND");
      }

      const stockResult = await client.query<StockRow>(
        "SELECT stock FROM inventories WHERE product_id = $1 FOR UPDATE",
        [product.id]
      );

      if (stockResult.rowCount === 0) {
        throw new Error("INVENTORY_NOT_FOUND");
      }

      const stock = Number(stockResult.rows[0].stock);
      if (stock < quantity) {
        throw new Error("STOCK_NOT_ENOUGH");
      }

      // 1) Reserver le stock.
      await client.query(
        "UPDATE inventories SET stock = stock - $2 WHERE product_id = $1",
        [product.id, quantity]
      );

      // 2) Inserer ou incrementer la ligne panier.
      await client.query(
        `INSERT INTO cart_items (product_id, quantity)
         VALUES ($1, $2)
         ON CONFLICT (product_id)
         DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`,
        [product.id, quantity]
      );

      const cartResult = await client.query<{ quantity: number | string }>(
        "SELECT quantity FROM cart_items WHERE product_id = $1",
        [product.id]
      );

      await client.query("COMMIT");

      const selected = productResult.rows[0];
      const selectedProduct: Product = {
        id: selected.id,
        name: selected.name,
        price: round2(Number(selected.price))
      };
      const cartQuantity = Number(cartResult.rows[0].quantity);

      return {
        product: selectedProduct,
        quantity: cartQuantity,
        total: round2(selectedProduct.price * cartQuantity)
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
