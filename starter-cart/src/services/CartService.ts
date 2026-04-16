import { Product } from "../models/Product.js";
import { Istorage } from "../storage/Istorage.js";

export class CartService{
    constructor(private storage : Istorage){}

    async addIem(product : Product, quantity: number): Promise<void> {
        await this.storage.addProduct(product, quantity);
    }

    async listIems(): Promise<Product[]>{
        return this.storage.listProducts();
    }
}
