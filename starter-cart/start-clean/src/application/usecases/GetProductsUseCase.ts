import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../ports/ProductRepository";

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    // TODO: retourner la liste depuis le repository
    throw new Error("TODO: implement GetProductsUseCase.execute");
  }
}
