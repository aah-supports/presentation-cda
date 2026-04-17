import express, { Express } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { ProductController } from "@/controllers/ProductController";
import { StockController } from "@/controllers/StockController";
import { httpLogger } from "@/lib/logger";
import { createRouter } from "@/routes/productRoutes";

export function createApp(
  productController: ProductController,
  stockController: StockController
): Express {
  const app = express();
  // Swagger est chargé au boot pour exposer une documentation contractuelle des endpoints.
  const swaggerDocument = YAML.load(
    path.resolve(__dirname, "../docs/openapi.yaml")
  );

  app.use(express.json());
  // Logger HTTP centralisé: ajoute request_id et uniformise les logs applicatifs.
  app.use(httpLogger);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // Toutes les routes métier sont regroupées dans un router unique.
  app.use("/", createRouter(productController, stockController));

  return app;
}
