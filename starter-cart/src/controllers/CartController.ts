import { Request, Response} from "express";
import { CartService } from "../services/CartService";

export class CartController{

    constructor(private readonly service: CartService){
        this.addItem = this.addItem.bind(this);
        this.listIems = this.listIems.bind(this);
    }

    async addItem(req: Request, res: Response): Promise<Response> {
        const { productId, quantity } = req.body as {
          productId?: string;
          quantity?: number;
        };

        // Validation HTTP en entree avant d'appeler la couche metier.
        if (typeof productId !== "string" ) {
          return res.status(400).json({ error: "PRODUCT_ID_REQUIRED" });
        }

        if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
          return res.status(400).json({ error: "QUANTITY_INVALID" });
        }

        try {
          // 1) Recuperer le produit
          // 2) Ajouter la quantite au panier
          // 3) Renvoyer le stock restant
          const product = await this.service.getProduct(productId);
          const addedItem = await this.service.addIem(product, quantity);
          const remainingStock = await this.service.checkStock(productId);

          return res.status(201).json({
            id: product.id,
            name: addedItem.product.name,
            price: addedItem.product.price,
            stock: remainingStock,
            quantity: addedItem.quantity
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "INTERNAL_ERROR";
          // Les erreurs metier connues sont exposees en 400.
          if (
            message === "PRODUCT_NOT_FOUND" ||
            message === "INVENTORY_NOT_FOUND" ||
            message === "STOCK_NOT_ENOUGH" ||
            message === "QUANTITY_INVALID"
          ) {
            return res.status(400).json({ error: message });
          }
          return res.status(500).json({ error: "INTERNAL_ERROR" });
        }
    }

    async listIems(_req: Request, res: Response):Promise<Response>{
        // Snapshot du panier courant.
        const products = await this.service.listIems();
        return res.status(200).json({ storage: products });
    }
}
