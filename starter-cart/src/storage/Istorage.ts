import { Product } from "../models/Product.js";

export interface Istorage{
     addProduct(product: Product, quantity: number):Promise<void>;
     listProducts(): Promise<Product[]>;
}
