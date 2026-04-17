import "dotenv/config";
import { createApp } from "@/app";
import { ProductController } from "@/controllers/ProductController";
import { StockController } from "@/controllers/StockController";
import { ProductModel } from "@/models/ProductModel";
import { StockModel } from "@/models/StockModel";
import { InventoryRepository } from "@/repositories/InventoryRepository";
import { ProductRepository } from "@/repositories/ProductRepository";
import { StockService } from "@/services/StockService";
import { logger } from "@/lib/logger";

// Composition root: on construit toutes les dépendances une seule fois au démarrage.
const productRepository = new ProductRepository();
const inventoryRepository = new InventoryRepository();

const productModel = new ProductModel(productRepository);
const stockService = new StockService();
const stockModel = new StockModel(
  productRepository,
  inventoryRepository,
  stockService
);

const productController = new ProductController(productModel);
const stockController = new StockController(stockModel);
const app = createApp(productController, stockController);
const port = Number(process.env.PORT ?? process.env.APP_PORT ?? 3000);

// Le serveur écoute uniquement après assemblage complet (repositories -> models -> controllers).
app.listen(port, () => {
  logger.info({ request_id: "bootstrap" }, `start-mvc running on port ${port}`);
});
