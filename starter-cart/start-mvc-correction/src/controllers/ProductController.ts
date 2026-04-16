import { Request, Response } from "express";
import { ProductModel } from "../models/ProductModel";

export class ProductController {
  constructor(private readonly productModel: ProductModel) {}

  list = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productModel.findAll();
      res.json({ data: products });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  };
}
