import { Product } from "../models/Product";
import { StorageItem } from "../models/StorageItem";

// Contrat commun de persistance.
// Le service metier depend de cette interface, pas d'une classe concrete.
export interface Istorage{
     addItem(product: Product, quantity: number):Promise<StorageItem>;
     listItems(): Promise<StorageItem[]>;
     checkStock(productId: string):Promise<number>;
     getItem(productId : string): Promise<Product>;
}
