import {
  Inventory,
  StockProjectionInput,
  StockSnapshot,
  StockStatus
} from "@/models/types";

export class StockService {
  buildSnapshot(inventory: Inventory): StockSnapshot {
    // Stock disponible = physique - réservé (règle métier centrale).
    const available = inventory.onHand - inventory.reserved;
    const status = this.resolveStatus(available, inventory.reorderPoint);

    return {
      onHand: inventory.onHand,
      reserved: inventory.reserved,
      available,
      reorderPoint: inventory.reorderPoint,
      status
    };
  }

  project(inventory: Inventory, input: StockProjectionInput): StockSnapshot {
    // Normalisation stricte des entrées pour éviter les états incohérents.
    const incoming = this.normalize(input.incoming);
    const outgoing = this.normalize(input.outgoing);
    const reserve = this.normalize(input.reserve);
    const release = this.normalize(input.release);
    const adjust = this.normalizeSigned(input.adjust);

    const onHand = inventory.onHand + incoming - outgoing + adjust;
    const reserved = inventory.reserved + reserve - release;

    // Invariants métier: stock/réservé jamais négatifs et réservé <= stock.
    if (onHand < 0 || reserved < 0 || reserved > onHand) {
      throw new Error("INVALID_STOCK_PROJECTION");
    }

    return this.buildSnapshot({
      ...inventory,
      onHand,
      reserved
    });
  }

  private resolveStatus(available: number, reorderPoint: number): StockStatus {
    if (available <= 0) {
      return "OUT_OF_STOCK";
    }

    if (available <= reorderPoint) {
      return "LOW_STOCK";
    }

    return "OK";
  }

  private normalize(value: number | undefined): number {
    if (value === undefined) {
      return 0;
    }

    if (!Number.isFinite(value) || value < 0) {
      throw new Error("INVALID_STOCK_PROJECTION");
    }

    return Math.floor(value);
  }

  private normalizeSigned(value: number | undefined): number {
    if (value === undefined) {
      return 0;
    }

    if (!Number.isFinite(value)) {
      throw new Error("INVALID_STOCK_PROJECTION");
    }

    return Math.trunc(value);
  }
}
