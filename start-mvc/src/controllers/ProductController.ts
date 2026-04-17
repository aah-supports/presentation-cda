import { Request, Response } from "express";

export class ProductController {

  constructor(service){}

  async all(_req: Request, res: Response): Promise<void> {
   
  }

  async getById(req: Request, res: Response): Promise<void> {
      const { id } = req.body as { id?: string };

      if(!id){
        return res.status(400).json({ error: "PRODUCT_ID_REQUIRED" });
      }

      const product = await this.service.getProduct(productId);

      res.json({ data: "products" });
  }

  private async handler(res: Response, action: () => Promise<void>): Promise<void> {
    try {
      await action();
    } catch (error) {
      console.error("ProductController error:", error);

      if (!res.headersSent) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

}
