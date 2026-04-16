import express from "express";
import { Pool } from "pg";
import { createRouter } from "./router";

import { CartController } from "./controllers/CartController";
import { CartService } from "./services/CartService";
import { InMemory } from "./storage/InMemory";
import type { Istorage } from "./storage/Istorage";
import { PostgresStorage } from "./storage/PostgresStorage";

const storageDriver = (process.env.STORAGE_DRIVER ?? process.env.DRIVER ?? "memory")
  .trim()
  .toLowerCase();

const createStorage = (): Istorage => {
  if (storageDriver === "memory" || storageDriver === "inmemory") {
    return new InMemory();
  }

  if (storageDriver === "postgres") {
    const connectionString =
      process.env.DATABASE_URL ?? "postgres://cart:cart@localhost:5438/cartdb";
    const pool = new Pool({ connectionString });
    return new PostgresStorage(pool);
  }

  throw new Error(
    `STORAGE_DRIVER invalid: "${storageDriver}". Use "memory" or "postgres".`
  );
};

const storage = createStorage();

const service = new CartService(storage);
const controller = new CartController(service);
const router = createRouter(controller);

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`starter-cart running on http://localhost:${port}`);
});
