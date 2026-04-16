import { Request, Response } from "express";
import { GetProductsUseCase } from "../../application/usecases/GetProductsUseCase";

export class ProductController {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.getProductsUseCase.execute();
      res.json({ data: products });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: message });
    }
  };
}
