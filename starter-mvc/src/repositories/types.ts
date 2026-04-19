export type ProductRow = {
  id: string;
  name: string;
  price: number;
};

export type InventoryRow = {
  product_id: string;
  on_hand: number;
  reserved: number;
  reorder_point: number;
};
