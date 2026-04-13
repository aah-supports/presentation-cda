import { HttpError } from "../shared/http-error";
import { CreateMovieInput, Movie } from "./movie.model";
import { MovieRepository } from "./movie.repository";

export class MovieService {
  constructor(private readonly repository: MovieRepository) {}

  list(): Movie[] {
    const movies = this.repository.findAll();
    return movies.sort((a, b) => a.title.localeCompare(b.title, "fr"));
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
    if (!Number.isInteger(id) || id <= 0) {
      throw new HttpError(400, "Identifiant invalide.");
    }

    const existing = this.repository.findById(id);
    if (!existing) {
      throw new HttpError(404, "Film introuvable.");
    }

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
