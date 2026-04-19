import { StockService } from "@/services/StockService";

describe("StockService", () => {
  const service = new StockService();
  const productId = "11111111-1111-4111-8111-111111111111";

  it("builds a snapshot and resolves OK status", () => {
    const snapshot = service.buildSnapshot({
      productId,
      onHand: 120,
      reserved: 20,
      reorderPoint: 30
    });

    expect(snapshot).toEqual({
      onHand: 120,
      reserved: 20,
      available: 100,
      reorderPoint: 30,
      status: "OK"
    });
  });

  it("projects stock and resolves LOW_STOCK status", () => {
    const projected = service.project(
      {
        productId,
        onHand: 20,
        reserved: 5,
        reorderPoint: 10
      },
      {
        outgoing: 5,
        reserve: 2
      }
    );

    expect(projected.available).toBe(8);
    expect(projected.status).toBe("LOW_STOCK");
  });

  it("throws on invalid projection", () => {
    expect(() =>
      service.project(
        {
          productId,
          onHand: 5,
          reserved: 4,
          reorderPoint: 2
        },
        {
          reserve: 5
        }
      )
    ).toThrow("INVALID_STOCK_PROJECTION");
  });
});
