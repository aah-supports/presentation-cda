import { Router } from "express";
import { MovieController } from "../controllers/movieController";

export function buildMovieRouter(movieController: MovieController): Router {
  const router = Router();

  router.get("/movies", movieController.list);

  return router;
}
