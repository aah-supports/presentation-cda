import { Router } from "express";

export const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Starter cart TypeScript",
    nextStep: "Implementer les routes /api/products et /api/cart"
  });
});

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
