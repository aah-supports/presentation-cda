import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../application/ports/ProductRepository";
import { pool } from "../db/pool";

type ProductRow = {
  id: number;
  name: string;
  price_cents: number;
};

export class PostgresProductRepository implements ProductRepository {
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
