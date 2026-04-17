import { StockModel } from "@/models/StockModel";
import { StockService } from "@/services/StockService";
import {
  createInventoryRepositoryMock,
  createProductRepositoryMock
} from "../mocks/repositoryMocks";

describe("StockModel (with mocks)", () => {
  it("returns null when product is missing", async () => {
    const productRepository = createProductRepositoryMock([]);
    const inventoryRepository = createInventoryRepositoryMock([
      { productId: 1, onHand: 10, reserved: 1, reorderPoint: 5 }
    ]);
    const model = new StockModel(
      productRepository as never,
      inventoryRepository as never,
      new StockService()
    );

    const result = await model.getByProductId(1);

    expect(result).toBeNull();
    expect(productRepository.findById).toHaveBeenCalledWith(1);
  });

  it("projects stock using mocked repositories", async () => {
    const productRepository = createProductRepositoryMock([
      { id: 1, name: "Keyboard", price: 8900 }
    ]);
    const inventoryRepository = createInventoryRepositoryMock([
      { productId: 1, onHand: 50, reserved: 10, reorderPoint: 15 }
    ]);
    const model = new StockModel(
      productRepository as never,
      inventoryRepository as never,
      new StockService()
    );

    const result = await model.projectByProductId(1, {
      outgoing: 20,
      release: 5
    });

    expect(result?.product.id).toBe(1);
    expect(result?.stock.available).toBe(25);
    expect(result?.stock.status).toBe("OK");
  });
});
