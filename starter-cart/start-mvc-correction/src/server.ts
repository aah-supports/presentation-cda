import "dotenv/config";
import express from "express";
import { ProductModel } from "./models/ProductModel";
import { ProductController } from "./controllers/ProductController";
import { buildProductRoutes } from "./routes/productRoutes";

const app = express();

const productModel = new ProductModel();
const productController = new ProductController(productModel);

app.use(express.json());
app.use(buildProductRoutes(productController));

app.listen(3000, () => {
  console.log("start-mvc-correction running on port 3000");
});
