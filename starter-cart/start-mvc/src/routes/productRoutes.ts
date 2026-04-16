import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export const buildProductRoutes = (
  productController: ProductController
): Router => {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  router.get("/products", productController.list);

  return router;
};
