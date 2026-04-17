import { Router, Request, Response } from "express";
import { ProductController } from "@/controllers/ProductController";
import { StockController } from "@/controllers/StockController";

export function createRouter(
  productController: ProductController,
  stockController: StockController
): Router {
  const router = Router();

  router.get("/", (_req: Request, res: Response) =>
    res.json({ home: "home" })
  );

  router.get("/products", productController.all);
  router.get("/products/:id", productController.getById);
  // Endpoints de démonstration métier pour la partie stock.
  router.get("/products/:id/stock", stockController.getByProductId);
  router.post("/products/:id/stock/projection", stockController.projectByProductId);

  return router;
}
