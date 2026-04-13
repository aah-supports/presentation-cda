import { Router } from "express";
import { MovieController } from "./movies/movie.controller";
import { MovieRepository } from "./movies/movie.repository";
import { MovieService } from "./movies/movie.service";
import { PageController } from "./pages/page.controller";

const repository = new MovieRepository([
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Science-fiction"
  },
  {
    id: 2,
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019,
    genre: "Thriller"
  }
]);

const service = new MovieService(repository);
const movieController = new MovieController(service);
const pageController = new PageController(service);

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

apiRouter.get("/movies", movieController.list);
apiRouter.post("/movies", movieController.create);
apiRouter.delete("/movies/:id", movieController.remove);

apiRouter.get("/pages/home", pageController.home);
apiRouter.get("/pages/catalog", pageController.catalog);
