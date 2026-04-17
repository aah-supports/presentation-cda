import {
  ProductStock,
  StockProjectionInput,
  StockSnapshot
} from "@/models/types";
import { InventoryRepository } from "@/repositories/InventoryRepository";
import { ProductRepository } from "@/repositories/ProductRepository";
import { StockService } from "@/services/StockService";

export class StockModel {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly stockService: StockService
  ) {}

  async getByProductId(productId: number): Promise<ProductStock | null> {
    // Chargement parallèle: réduit le temps de réponse quand DB OK.
    const [product, inventory] = await Promise.all([
      this.productRepository.findById(productId),
      this.inventoryRepository.findByProductId(productId)
    ]);

    if (!product || !inventory) {
      return null;
    }

    return {
      product,
      stock: this.stockService.buildSnapshot(inventory)
    };
  }

  async projectByProductId(
    productId: number,
    input: StockProjectionInput
  ): Promise<ProductStock | null> {
    // Même stratégie: récupération des dépendances métier avant calcul.
    const [product, inventory] = await Promise.all([
      this.productRepository.findById(productId),
      this.inventoryRepository.findByProductId(productId)
    ]);

    if (!product || !inventory) {
      return null;
    }

    const projected: StockSnapshot = this.stockService.project(inventory, input);

    return {
      product,
      stock: projected
    };
  }
}
