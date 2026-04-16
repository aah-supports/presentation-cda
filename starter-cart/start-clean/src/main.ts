import "dotenv/config";
import express from "express";
import { buildRoutes } from "./interfaces/http/routes";
import { ProductController } from "./interfaces/http/ProductController";
import { PostgresProductRepository } from "./infrastructure/repositories/PostgresProductRepository";
import { GetProductsUseCase } from "./application/usecases/GetProductsUseCase";

const app = express();

const productRepository = new PostgresProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);
const productController = new ProductController(getProductsUseCase);

app.use(express.json());
app.use(buildRoutes(productController));

app.listen(3000, () => {
  console.log("start-clean running on port 3000");
});
