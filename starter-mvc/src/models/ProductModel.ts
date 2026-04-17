import { type Product } from "@/models/types";
import { ProductRepository } from "@/repositories/ProductRepository";

export class ProductModel {
  constructor(private readonly repository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    // Le model reste fin ici: orchestration simple autour du repository.
    return this.repository.findAll();
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findById(id);
  }
}
