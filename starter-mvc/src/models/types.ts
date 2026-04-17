
export type Product = {
  id: number;
  name: string;
  price: number;
};

export type Inventory = {
  productId: number;
  onHand: number;
  reserved: number;
  reorderPoint: number;
};

export type StockStatus = "OUT_OF_STOCK" | "LOW_STOCK" | "OK";

export type StockSnapshot = {
  onHand: number;
  reserved: number;
  available: number;
  reorderPoint: number;
  status: StockStatus;
};

export type StockProjectionInput = {
  incoming?: number;
  outgoing?: number;
  reserve?: number;
  release?: number;
  adjust?: number;
};

export type ProductStock = {
  product: Product;
  stock: StockSnapshot;
};
