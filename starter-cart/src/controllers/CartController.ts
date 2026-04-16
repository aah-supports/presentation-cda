import { Request, Response} from "express";
import { Product } from "../models/Product.js";
import { CartService } from "../services/CartService.js";

export class CartController{

    constructor(private readonly service: CartService){}

    async addItem(req: Request, res: Response): Promise<Response> {
        const { name, price, stock, quantity } = req.body as {
          name?: string;
          price?: number;
          stock?: number;
          quantity?: number;
        };
    
        if (typeof name !== "string" || !name.trim()) {
          return res.status(400).json({ error: "NAME_REQUIRED" });
        }

        if (typeof price !== "number" || price <= 0) {
          return res.status(400).json({ error: "PRICE_INVALID" });
        }

        if (typeof stock !== "number" || stock < 0) {
          return res.status(400).json({ error: "STOCK_INVALID" });
        }

        if (quantity !== undefined && (typeof quantity !== "number" || quantity < 0)) {
          return res.status(400).json({ error: "QUANTITY_INVALID" });
        }

        const product: Product = {
          name: name.trim(),
          price,
          stock,
          quantity: 0
        };

        const initialQuantity = quantity ?? 0;
        await this.service.addIem(product, initialQuantity);

        return res.status(201).json({
          name: product.name,
          price: product.price,
          stock: product.stock,
          quantity: initialQuantity
        });
    }

    async listIems(_req: Request, res: Response):Promise<Response>{
        const products = await this.service.listIems();
        return res.status(200).json({ storage: products });
    }
}
