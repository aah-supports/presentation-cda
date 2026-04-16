import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../application/ports/ProductRepository";
import { pool } from "../db/pool";

export class PostgresProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    // TODO: faire un SELECT id, name, price_cents FROM products ORDER BY id
    // puis mapper vers Product ({ id, name, priceCents })
    void pool;
    throw new Error("TODO: implement PostgresProductRepository.findAll");
  }
}
