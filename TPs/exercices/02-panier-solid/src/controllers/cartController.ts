import { Request, Response } from "express";
import { CartService } from "../services/CartService";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  list = (_req: Request, res: Response): void => {
    const items = this.cartService.getItems();
    res.status(200).json({ data: items, totalItems: items.length });
  };

  add = (req: Request, res: Response): void => {
    try {
      this.cartService.addItem(req.body);
      res.status(201).json({ message: "Item added" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  remove = (req: Request, res: Response): void => {
    const productId = Number(req.params.productId);
    const removed = this.cartService.removeItem(productId);

    if (!removed) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    res.status(200).json({ message: "Item removed" });
  };

  total = (_req: Request, res: Response): void => {
    res.status(200).json({
      subtotal: this.cartService.getSubtotal(),
      total: this.cartService.getTotal()
    });
  };
}
