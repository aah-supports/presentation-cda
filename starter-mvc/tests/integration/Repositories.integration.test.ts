import { pool } from "@/db/pool";
import { InventoryRepository } from "@/repositories/InventoryRepository";
import { ProductRepository } from "@/repositories/ProductRepository";

const describeIntegration =
  process.env.RUN_INTEGRATION === "1" ? describe : describe.skip;

describeIntegration("Repositories (integration)", () => {
  const productRepository = new ProductRepository();
  const inventoryRepository = new InventoryRepository();

  afterAll(async () => {
    await pool.end();
  });

  it("finds seeded products from Postgres", async () => {
    const products = await productRepository.findAll();

    expect(products.length).toBeGreaterThanOrEqual(3);
    expect(products[0]).toHaveProperty("price");
  });

  it("finds inventory by product id", async () => {
    const inventory = await inventoryRepository.findByProductId(1);

    expect(inventory).not.toBeNull();
    expect(inventory?.onHand).toBeGreaterThanOrEqual(0);
  });
});
