import request from "supertest";
import { createApp } from "@/app";
import { ProductController } from "@/controllers/ProductController";
import { StockController } from "@/controllers/StockController";
import { ProductModel } from "@/models/ProductModel";
import { StockModel } from "@/models/StockModel";

describe("Stock routes (functional)", () => {
  const productModel: Partial<ProductModel> = {
    findAll: async () => [{ id: 1, name: "Mouse", price: 2500 }],
    findById: async (id: number) =>
      id === 1 ? { id: 1, name: "Mouse", price: 2500 } : null
  };

  const stockModel: Partial<StockModel> = {
    getByProductId: async (id: number) =>
      id === 1
        ? {
            product: { id: 1, name: "Mouse", price: 2500 },
            stock: {
              onHand: 10,
              reserved: 2,
              available: 8,
              reorderPoint: 3,
              status: "OK" as const
            }
          }
        : null,
    projectByProductId: async (id: number) =>
      id === 1
        ? {
            product: { id: 1, name: "Mouse", price: 2500 },
            stock: {
              onHand: 9,
              reserved: 2,
              available: 7,
              reorderPoint: 3,
              status: "OK" as const
            }
          }
        : null
  };

  const app = createApp(
    new ProductController(productModel as ProductModel),
    new StockController(stockModel as StockModel)
  );

  it("GET /products/:id/stock returns snapshot", async () => {
    const response = await request(app).get("/products/1/stock");

    expect(response.status).toBe(200);
    expect(response.body.data.stock.available).toBe(8);
  });

  it("POST /products/:id/stock/projection returns projected snapshot", async () => {
    const response = await request(app)
      .post("/products/1/stock/projection")
      .send({ outgoing: 1 });

    expect(response.status).toBe(200);
    expect(response.body.data.stock.available).toBe(7);
  });
});
