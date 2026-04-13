import { Request, Response } from "express";
import { MovieService } from "../services/movieService";

export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  list = (_req: Request, res: Response): void => {
    const movies = this.movieService.listMovies();
    res.status(200).json({ data: movies, total: movies.length });
  };
}
