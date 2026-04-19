import { StockModel } from "@/models/StockModel";
import { StockService } from "@/services/StockService";
import {
  createInventoryRepositoryMock,
  createProductRepositoryMock
} from "../mocks/repositoryMocks";

describe("StockModel (with mocks)", () => {
  const productId = "11111111-1111-4111-8111-111111111111";

  it("returns null when product is missing", async () => {
    const productRepository = createProductRepositoryMock([]);
    const inventoryRepository = createInventoryRepositoryMock([
      { productId, onHand: 10, reserved: 1, reorderPoint: 5 }
    ]);
    const model = new StockModel(
      productRepository as never,
      inventoryRepository as never,
      new StockService()
    );

    const result = await model.getByProductId(productId);

    expect(result).toBeNull();
    expect(productRepository.findById).toHaveBeenCalledWith(productId);
  });

  it("projects stock using mocked repositories", async () => {
    const productRepository = createProductRepositoryMock([
      { id: productId, name: "Keyboard", price: 8900 }
    ]);
    const inventoryRepository = createInventoryRepositoryMock([
      { productId, onHand: 50, reserved: 10, reorderPoint: 15 }
    ]);
    const model = new StockModel(
      productRepository as never,
      inventoryRepository as never,
      new StockService()
    );

    const result = await model.projectByProductId(productId, {
      outgoing: 20,
      release: 5
    });

    expect(result?.product.id).toBe(productId);
    expect(result?.stock.available).toBe(25);
    expect(result?.stock.status).toBe("OK");
  });
});
