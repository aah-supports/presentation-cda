import { Router, Request, Response } from "express";

export function createRouter(): Router {
  const router = Router();

  router.get("/", (_req: Request, res: Response) =>
    res.json({ home: "home" })
  );

  router.get("/products", (_req: Request, res: Response) =>
    res.json({ products: "products" })
  );

  return router;
}