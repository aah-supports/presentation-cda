import "dotenv/config";
import express from "express";
import { createRouter } from "./routes/productRoutes";

const app = express();
const router = createRouter();

app.use(express.json());
app.use('/', router);

app.listen(3000, () => {
  console.log("start-mvc running on port 3000");
});
