import { Product } from "../models/Product";
import { StorageItem } from "../models/StorageItem";
import { Istorage } from "../storage/Istorage";

export class CartService {
    // Couche metier: applique les regles sans connaitre le detail de la persistance.
    constructor(private storage: Istorage) { }

    async addIem(product: Product, quantity: number): Promise<StorageItem> {
        // Regle 1: la quantite doit etre un entier strictement positif.
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("QUANTITY_INVALID");
        }

        // Regle 2: ajout autorise uniquement si le stock est suffisant.
        const checkStock = await this.storage.checkStock(product.id);
        if (checkStock < quantity) {
            throw new Error("STOCK_NOT_ENOUGH");
        }

        // Persistance delegatee apres validation metier.
        return this.storage.addItem(product, quantity);
    }

    async listIems(): Promise<StorageItem[]> {
        return this.storage.listItems();
    }

    async checkStock(productId: string): Promise<number> {

        return this.storage.checkStock(productId);
    }

    async getProduct(productId: string): Promise<Product> {
        return this.storage.getItem(productId);
    }
}
