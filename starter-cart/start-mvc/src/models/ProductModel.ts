import { pool } from "../db/pool";

export type Product = {
  id: number;
  name: string;
  priceCents: number;
};

export class ProductModel {
  async findAll(): Promise<Product[]> {
    // TODO: faire un SELECT id, name, price_cents FROM products ORDER BY id
    // et mapper vers Product
    void pool;
    throw new Error("TODO: implement ProductModel.findAll");
  }
}
