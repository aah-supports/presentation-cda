import { NextFunction, Request, Response } from "express";
import { MovieService } from "../movies/movie.service";

export class PageController {
  constructor(private readonly service: MovieService) {}

  home = (_req: Request, res: Response): void => {
    res.status(200).json({
      page: "home",
      title: "Mini application gestion de films",
      goal: "MVP 3h en Node.js TypeScript",
      features: ["Ajouter", "Lister", "Rechercher", "Supprimer"]
    });
  };

  catalog = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q : undefined;
      const movies = this.service.list(q);

      res.status(200).json({
        page: "catalog",
        q: q ?? null,
        columns: ["id", "title", "director", "year", "genre"],
        rows: movies
      });
    } catch (error) {
      next(error);
    }
  };
}
