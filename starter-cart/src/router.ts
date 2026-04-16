import { Router, Request, Response } from "express";
import { CartController } from "./controllers/CartController.js";
import { CartService } from "./services/CartService.js";
import { InMemory } from "./storage/InMemory.js";

export const router = Router();
const storage = new InMemory();
const service = new CartService(storage);
const controller = new CartController(service);

router.get("/", (_req : Request, res: Response) => {
  res.json({
    message: "Starter cart TypeScript",
    nextStep: "Implementer les routes /api/products et /api/cart"
  });
});


router.get("/products", async (req: Request, res: Response) => controller.listIems(req, res));
router.post("/product", async (req: Request, res: Response) => controller.addItem(req, res));
