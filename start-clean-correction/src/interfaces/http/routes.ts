import { Router } from "express";
import { ProductController } from "./ProductController";

export const buildRoutes = (productController: ProductController): Router => {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  router.get("/products", productController.getProducts);

  return router;
};
