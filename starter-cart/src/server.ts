import express from "express";
import { Pool } from "pg";
import { createRouter } from "./router";

import { CartController } from "./controllers/CartController";
import { CartService } from "./services/CartService";
import { seedPostgresDatabase } from "./seeders/postgresSeeder";
import { InMemory } from "./storage/InMemory";
import type { Istorage } from "./storage/Istorage";
import { PostgresStorage } from "./storage/PostgresStorage";

// Choix de la persistance via variable d'environnement :
// - memory
// - postgres
const storageDriver = (process.env.STORAGE_DRIVER ?? process.env.DRIVER ?? "memory")
  .trim()
  .toLowerCase();

const createStorage = async (): Promise<Istorage> => {
  if (storageDriver === "memory" || storageDriver === "inmemory") {
    // Mode simple pour TP/tests rapides.
    return new InMemory();
  }

  if (storageDriver === "postgres") {
    const connectionString =
      process.env.DATABASE_URL ?? "postgres://cart:cart@localhost:5438/cartdb";
    const pool = new Pool({ connectionString });
    // Initialisation technique (schema + donnees de base) externalisee dans un seeder.
    await seedPostgresDatabase(pool); // hydration des tables 
    return new PostgresStorage(pool);
  }

  throw new Error(
    `STORAGE_DRIVER invalid: "${storageDriver}". Use "memory" or "postgres".`
  );
};

async function bootstrap(): Promise<void> {
  // Point de composition : on connecte les couches une seule fois au demarrage.
  const storage = await createStorage();
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
}

bootstrap().catch((error: unknown) => {
  console.error("Failed to start starter-cart:", error);
  process.exit(1);
});
