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
