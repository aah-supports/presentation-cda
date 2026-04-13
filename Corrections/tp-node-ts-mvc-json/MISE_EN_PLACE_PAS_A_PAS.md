# Mise en place pas a pas (autonome)

Ce guide explique **pas a pas** comment construire le projet Node.js + TypeScript en MVC intermediaire, sans dependre d'autres fichiers de documentation.

## 1. Preparer le projet

1. Creer un dossier projet.
2. Initialiser Node.js.
3. Installer les dependances.
4. Ajouter TypeScript.

```bash
mkdir tp-node-ts-mvc-json
cd tp-node-ts-mvc-json
npm init -y
npm install express
npm install -D typescript ts-node-dev @types/node @types/express
```

## 2. Configurer TypeScript

Creer `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## 3. Ajouter les scripts npm

Mettre a jour `package.json`:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "check": "tsc --noEmit"
  }
}
```

## 4. Creer l'arborescence

```bash
mkdir -p src/movies src/pages src/shared
```

Arborescence cible:

```text
src/
  app.ts
  server.ts
  routes.ts
  movies/
    movie.model.ts
    movie.repository.ts
    movie.service.ts
    movie.controller.ts
  pages/
    page.controller.ts
  shared/
    http-error.ts
    error-handler.ts
```

## 5. Creer le modele metier

Fichier `src/movies/movie.model.ts`:

```ts
export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
}

export interface CreateMovieInput {
  title: string;
  director: string;
  year: number;
  genre: string;
}
```

## 6. Creer la gestion d'erreurs

Fichier `src/shared/http-error.ts`:

```ts
export class HttpError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}
```

Fichier `src/shared/error-handler.ts`:

```ts
import { NextFunction, Request, Response } from "express";
import { HttpError } from "./http-error";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Erreur interne serveur." });
}
```

## 7. Creer le repository (stockage memoire)

Fichier `src/movies/movie.repository.ts`:

```ts
import { Movie } from "./movie.model";

export class MovieRepository {
  private movies: Movie[];
  private currentId: number;

  constructor(seed: Movie[] = []) {
    this.movies = [...seed];
    this.currentId = seed.reduce((max, movie) => Math.max(max, movie.id), 0);
  }

  findAll(): Movie[] {
    return [...this.movies];
  }

  findById(id: number): Movie | undefined {
    return this.movies.find((movie) => movie.id === id);
  }

  create(data: Omit<Movie, "id">): Movie {
    this.currentId += 1;
    const movie: Movie = { id: this.currentId, ...data };
    this.movies.push(movie);
    return movie;
  }

  deleteById(id: number): boolean {
    const initialLength = this.movies.length;
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return this.movies.length < initialLength;
  }
}
```

## 8. Creer le service (logique metier)

Fichier `src/movies/movie.service.ts`:

```ts
import { HttpError } from "../shared/http-error";
import { CreateMovieInput, Movie } from "./movie.model";
import { MovieRepository } from "./movie.repository";

export class MovieService {
  constructor(private readonly repository: MovieRepository) {}

  list(query?: string): Movie[] {
    const q = query?.trim().toLowerCase();
    const allMovies = this.repository.findAll();
    const filtered = q
      ? allMovies.filter((movie) => movie.title.toLowerCase().includes(q))
      : allMovies;

    return filtered.sort((a, b) => a.title.localeCompare(b.title, "fr"));
  }

  create(rawPayload: unknown): Movie {
    const payload = this.validateCreatePayload(rawPayload);
    return this.repository.create({
      title: payload.title.trim(),
      director: payload.director.trim(),
      year: payload.year,
      genre: payload.genre.trim()
    });
  }

  remove(id: number): void {
    if (!Number.isInteger(id) || id <= 0) throw new HttpError(400, "Identifiant invalide.");
    if (!this.repository.findById(id)) throw new HttpError(404, "Film introuvable.");
    this.repository.deleteById(id);
  }

  private validateCreatePayload(rawPayload: unknown): CreateMovieInput {
    if (!rawPayload || typeof rawPayload !== "object") {
      throw new HttpError(400, "Payload JSON invalide.");
    }

    const payload = rawPayload as Record<string, unknown>;
    const title = this.requiredString(payload.title, "title");
    const director = this.requiredString(payload.director, "director");
    const genre = this.requiredString(payload.genre, "genre");

    if (typeof payload.year !== "number" || !Number.isInteger(payload.year)) {
      throw new HttpError(400, "Le champ 'year' doit etre un entier.");
    }

    const currentYear = new Date().getFullYear() + 1;
    if (payload.year < 1888 || payload.year > currentYear) {
      throw new HttpError(400, `Le champ 'year' doit etre entre 1888 et ${currentYear}.`);
    }

    return { title, director, year: payload.year, genre };
  }

  private requiredString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new HttpError(400, `Le champ '${field}' est obligatoire.`);
    }
    return value;
  }
}
```

## 9. Creer les controllers

Fichier `src/movies/movie.controller.ts`:

```ts
import { NextFunction, Request, Response } from "express";
import { MovieService } from "./movie.service";

export class MovieController {
  constructor(private readonly service: MovieService) {}

  list = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q : undefined;
      const movies = this.service.list(q);
      res.status(200).json({ data: movies, total: movies.length });
    } catch (error) {
      next(error);
    }
  };

  create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const movie = this.service.create(req.body);
      res.status(201).json({ message: "Film cree avec succes.", data: movie });
    } catch (error) {
      next(error);
    }
  };

  remove = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      this.service.remove(id);
      res.status(200).json({ message: "Film supprime avec succes." });
    } catch (error) {
      next(error);
    }
  };
}
```

Fichier `src/pages/page.controller.ts`:

```ts
import { Request, Response } from "express";

export class PageController {
  home = (_req: Request, res: Response): void => {
    res.status(200).json({
      page: "home",
      title: "Mini application gestion de films",
      features: ["Ajouter", "Lister", "Rechercher", "Supprimer"]
    });
  };
}
```

## 10. Declarer les routes

Fichier `src/routes.ts`:

```ts
import { Router } from "express";
import { MovieController } from "./movies/movie.controller";
import { MovieRepository } from "./movies/movie.repository";
import { MovieService } from "./movies/movie.service";
import { PageController } from "./pages/page.controller";

const repository = new MovieRepository([
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Science-fiction" },
  { id: 2, title: "Parasite", director: "Bong Joon-ho", year: 2019, genre: "Thriller" }
]);

const service = new MovieService(repository);
const movieController = new MovieController(service);
const pageController = new PageController();

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
apiRouter.get("/movies", movieController.list);
apiRouter.post("/movies", movieController.create);
apiRouter.delete("/movies/:id", movieController.remove);
apiRouter.get("/pages/home", pageController.home);
```

## 11. Creer l'app Express et le serveur

Fichier `src/app.ts`:

```ts
import express from "express";
import { apiRouter } from "./routes";
import { errorHandler } from "./shared/error-handler";

export const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);
```

Fichier `src/server.ts`:

```ts
import { app } from "./app";

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`API JSON disponible sur http://localhost:${port}/api`);
});
```

## 12. Lancer et verifier

```bash
npm run dev
```

Tester:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/movies
```

## 13. Tester avec Docker Compose (optionnel)

```bash
docker compose up --build -d
curl http://localhost:3000/api/health
docker compose down
```

## 14. Resultat attendu

- Projet TypeScript compilable.
- API JSON operationnelle.
- Architecture MVC intermediaire claire.
- Scope TP 3h respecté.
