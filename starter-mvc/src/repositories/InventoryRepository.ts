import { pool } from "@/db/pool";
import { Inventory } from "@/models/types";
import { InventoryRow } from "@/repositories/types";

export class InventoryRepository {
  async findByProductId(productId: string): Promise<Inventory | null> {
    const result = await pool.query<InventoryRow>(
      "SELECT product_id, on_hand, reserved, reorder_point FROM inventories WHERE product_id = $1",
      [productId]
    );

    const row = result.rows[0];
    if (!row) {
      return null;
    }

    // Adaptation snake_case (SQL) -> camelCase (TypeScript).
    return {
      productId: row.product_id,
      onHand: row.on_hand,
      reserved: row.reserved,
      reorderPoint: row.reorder_point
    };
  }
}
