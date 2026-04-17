import { pool } from "../db/pool";
import { type Product } from "./types";

export class ProductModel {
  async findAll(): Promise<Product[]> {
    // TODO: faire un SELECT id, name, price_cents FROM products ORDER BY id
    // et mapper vers Product
    throw new Error("TODO: implement ProductModel.findAll");
  }
}
