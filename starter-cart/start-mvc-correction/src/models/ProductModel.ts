import { pool } from "../db/pool";

export type Product = {
  id: number;
  name: string;
  priceCents: number;
};

type ProductRow = {
  id: number;
  name: string;
  price_cents: number;
};

export class ProductModel {
  async findAll(): Promise<Product[]> {
    const result = await pool.query<ProductRow>(
      "SELECT id, name, price_cents FROM products ORDER BY id"
    );

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      priceCents: row.price_cents
    }));
  }
}
