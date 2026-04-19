import { Router, Request, Response } from "express";
import { ProductController } from "@/controllers/ProductController";
import { StockController } from "@/controllers/StockController";
import { validateBody, validateParams } from "@/middlewares/validation";
import {
  productIdParamsSchema,
  stockProjectionBodySchema
} from "@/schemas/apiSchemas";

export function createRouter(
  productController: ProductController,
  stockController: StockController
): Router {
  const router = Router();

  router.get("/", (_req: Request, res: Response) =>
    res.json({ home: "home" })
  );

  router.get("/products", productController.all);
  router.get(
    "/products/:id",
    validateParams(productIdParamsSchema, "PRODUCT_ID_INVALID"),
    productController.getById
  );
  // Endpoints de démonstration métier pour la partie stock.
  router.get(
    "/products/:id/stock",
    validateParams(productIdParamsSchema, "PRODUCT_ID_INVALID"),
    stockController.getByProductId
  );
  router.post(
    "/products/:id/stock/projection",
    validateParams(productIdParamsSchema, "PRODUCT_ID_INVALID"),
    validateBody(stockProjectionBodySchema, "INVALID_STOCK_PROJECTION"),
    stockController.projectByProductId
  );

  return router;
}
