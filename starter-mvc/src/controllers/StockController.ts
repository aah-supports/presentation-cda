import { Request, Response } from "express";
import { getRequestId, logger } from "@/lib/logger";
import { StockModel } from "@/models/StockModel";
import { StockProjectionInput } from "@/models/types";

export class StockController {
  constructor(private readonly model: StockModel) {}

  getByProductId = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.id);

      // On valide l'identifiant avant tout accès modèle/repository.
      if (!Number.isInteger(productId) || productId <= 0) {
        res.status(400).json({ error: "PRODUCT_ID_REQUIRED" });
        return;
      }

      const data = await this.model.getByProductId(productId);

      if (!data) {
        res.status(404).json({ error: "PRODUCT_OR_STOCK_NOT_FOUND" });
        return;
      }

      res.json({ data });
    } catch (error) {
      logger.error(
        { err: error, request_id: getRequestId(req) },
        "StockController.getByProductId error"
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  projectByProductId = async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      if (!Number.isInteger(productId) || productId <= 0) {
        res.status(400).json({ error: "PRODUCT_ID_REQUIRED" });
        return;
      }

      // Payload libre: la validation métier est portée par StockService.
      const input = req.body as StockProjectionInput;
      const data = await this.model.projectByProductId(productId, input);

      if (!data) {
        res.status(404).json({ error: "PRODUCT_OR_STOCK_NOT_FOUND" });
        return;
      }

      res.json({ data });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "INVALID_STOCK_PROJECTION"
      ) {
        // Erreur métier attendue => 400, pas 500.
        res.status(400).json({ error: "INVALID_STOCK_PROJECTION" });
        return;
      }

      logger.error(
        { err: error, request_id: getRequestId(req) },
        "StockController.projectByProductId error"
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
