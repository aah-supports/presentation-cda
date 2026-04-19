import { Request, Response } from "express";
import { getRequestId, logger } from "@/lib/logger";
import { isUuid } from "@/lib/uuid";
import { ProductModel } from "@/models/ProductModel";

export class ProductController {
  constructor(private readonly model: ProductModel) {}

  all = async (req: Request, res: Response): Promise<void> => {
    try {
      // Le controller délègue la logique métier au model et garde la responsabilité HTTP.
      const products = await this.model.findAll();
      res.json({ data: products });
    } catch (error) {
      logger.error(
        { err: error, request_id: getRequestId(req) },
        "ProductController.all error"
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;

      // Validation d'entrée minimale: utile pour retourner un 400 explicite.
      if (!isUuid(id)) {
        res.status(400).json({ error: "PRODUCT_ID_INVALID" });
        return;
      }

      const product = await this.model.findById(id);

      if (!product) {
        res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
        return;
      }

      res.json({ data: product });
    } catch (error) {
      logger.error(
        { err: error, request_id: getRequestId(req) },
        "ProductController.getById error"
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
