import { pool } from "@/db/pool";
import { Product } from "@/models/types";
import { ProductRow } from "@/repositories/types";

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    const result = await pool.query<ProductRow>(
      "SELECT id, name, price FROM products ORDER BY id"
    );

    // Mapping explicite SQL -> domaine pour éviter la fuite du schéma DB.
    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      price: row.price
    }));
  }

  async findById(id: number): Promise<Product | null> {
    const result = await pool.query<ProductRow>(
      "SELECT id, name, price FROM products WHERE id = $1",
      [id]
    );

    const row = result.rows[0];
    if (!row) {
      return null;
    }

    // Conversion unique d'un enregistrement DB vers le type Product applicatif.
    return {
      id: row.id,
      name: row.name,
      price: row.price
    };
  }
}
