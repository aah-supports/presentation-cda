import { Product } from "../models/Product";
import { Inventory } from "../models/Inventory";
import { Istorage } from "./Istorage";
import { StorageItem } from "../models/StorageItem";

export class InMemory implements Istorage {
    // Implementation "faux stockage" pour demarrer sans base de donnees.
    private products: Product[];
    private inventories: Inventory[];
    private storage: StorageItem[];

    constructor() {
        this.products = [
            { id: "aa1", name: "apple", price: 10.5 },
            { id: "bb1", name: "raspberry", price: 13 },
            { id: "cc2", name: "strawberry", price: 7.8 }
        ];

        this.inventories = [
            { stock: 20, productId: "aa1" },
            { stock: 5, productId: "bb1" },
            { stock: 10, productId: "cc2" },
        ];

        this.storage = []
    }

    async addItem(product: Product, quantity: number): Promise<StorageItem> {
        // Meme contrat que PostgresStorage pour rester substituable.
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("QUANTITY_INVALID");
        }

        const p = this.products.find((item) => item.id === product.id);

        if (!p) {
            throw new Error("PRODUCT_NOT_FOUND");
        }

        const s = this.inventories.find(inventory => inventory.productId == p.id);

        if (!s) {
            throw new Error("STOCK_NOT_FOUND");
        }

        if (s.stock < quantity) {
            throw new Error("STOCK_NOT_ENOUGH");
        }

        // Etape 1: decrementer le stock.
        // Etape 2: creer/metre a jour la ligne panier.
        s.stock -= quantity;
        const existing = this.storage.find((item) => item.product.id === p.id);
        if (existing) {
            existing.quantity += quantity;
            existing.total = existing.quantity * existing.product.price;
            return existing;
        }

        const createdItem: StorageItem = {
            product: p,
            quantity,
            total: p.price * quantity
        };
        this.storage.push(createdItem);
        return createdItem;
    }

    async listItems(): Promise<StorageItem[]> {
        return this.storage;
    }

    async checkStock(productId: string): Promise<number> {

        const inventory = this.inventories.find(i => i.productId === productId);

        if (!inventory) {
            throw new Error("INVENTORY_NOT_FOUND");
        }

        return inventory.stock

    }

    async getItem(productId: string): Promise<Product> {
        const product = this.products.find((item) => item.id === productId);
        if (!product) {
            throw new Error("PRODUCT_NOT_FOUND");
        }
        return product;
    }
}   
