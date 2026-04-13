import { Router } from "express";
import { CartController } from "../controllers/cartController";

export function buildCartRouter(cartController: CartController): Router {
  const router = Router();

  router.get("/cart", cartController.list);
  router.post("/cart/items", cartController.add);
  router.delete("/cart/items/:productId", cartController.remove);
  router.get("/cart/total", cartController.total);

  return router;
}
