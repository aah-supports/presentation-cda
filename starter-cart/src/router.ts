import { Router } from "express";
import { CartController } from "./controllers/CartController";

export function createRouter(controller: CartController) {
  const router = Router();

  // Liste le contenu actuel du panier.
  router.get("/products", controller.listIems);
  // Deux routes POST pour rester compatible avec les appels historiques du TP.
  router.post("/product", controller.addItem);
  router.post("/products", controller.addItem);

  return router;
}
