import { Product } from "./Product";

// Ligne panier exposee par l'API.
export interface StorageItem  {
    product: Product;
    quantity: number;
    total: number;
  };
