import express from "express";
import { CartController } from "./controllers/cartController";
import { buildCartRouter } from "./routers/cartRouter";
import { CartService } from "./services/CartService";
import { NoDiscountPolicy } from "./services/NoDiscountPolicy";

const app = express();
const port = 3011;

const cartService = new CartService(new NoDiscountPolicy());
const cartController = new CartController(cartService);

app.use(express.json());
app.use(buildCartRouter(cartController));

app.listen(port, () => {
  console.log(`Exo 2 running on http://localhost:${port}`);
});
