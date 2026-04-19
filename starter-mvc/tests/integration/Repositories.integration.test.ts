import { pool } from "@/db/pool";
import { InventoryRepository } from "@/repositories/InventoryRepository";
import { ProductRepository } from "@/repositories/ProductRepository";

const describeIntegration =
  process.env.RUN_INTEGRATION === "1" ? describe : describe.skip;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
    expect(typeof products[0]?.id).toBe("string");
    expect(products[0]?.id).toMatch(uuidPattern);
  });

  it("finds inventory by product id", async () => {
    const products = await productRepository.findAll();
    const productId = products[0]?.id;
    expect(productId).toBeDefined();
    const inventory = await inventoryRepository.findByProductId(productId as string);

    expect(inventory).not.toBeNull();
    expect(inventory?.onHand).toBeGreaterThanOrEqual(0);
    expect(inventory?.productId).toMatch(uuidPattern);
  });
});
