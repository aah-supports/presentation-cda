import { Product } from "../models/Product.js";
import { Istorage } from "./Istorage.js";

export class InMemory implements Istorage {
    private storage: Product[];

    constructor(storage?: Product[]) {
        this.storage = storage ?? [
            { name: "apple", price: 10.5, stock: 20, quantity: 0 },
            { name: "raspberry", price: 13, stock: 16, quantity: 0 },
            { name: "strawberry", price: 7.8, stock: 25, quantity: 0 }
        ];
    }

    async addProduct(product: Product, quantity: number): Promise<void> {
        const p = this.storage.find(product => product.name == product.name);

        if (!p) {
            throw new Error("PRODUCT_NOT_FOUND");
        }

        if (p.stock < quantity) {
            throw new Error("STOCK_NOT_ENOUGH");
        }

        p.stock -= quantity;
        p.quantity += quantity;
    }

    async listProducts(): Promise<Product[]> {
        return this.storage;
    }
}   
