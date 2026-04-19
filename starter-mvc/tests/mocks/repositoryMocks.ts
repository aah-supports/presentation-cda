import { Inventory, Product } from "@/models/types";

export function createProductRepositoryMock(products: Product[]) {
  return {
    findAll: jest.fn().mockResolvedValue(products),
    findById: jest
      .fn()
      .mockImplementation(async (id: string) =>
        products.find((product) => product.id === id) ?? null
      )
  };
}

export function createInventoryRepositoryMock(inventories: Inventory[]) {
  return {
    findByProductId: jest
      .fn()
      .mockImplementation(async (productId: string) =>
        inventories.find((inventory) => inventory.productId === productId) ?? null
      )
  };
}
