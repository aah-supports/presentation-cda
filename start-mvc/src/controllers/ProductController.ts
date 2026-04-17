import { Request, Response } from "express";

export class ProductController {

  async list (_req: Request, res: Response): Promise<void> {

    res.json({ data: "products" });
  };
}
