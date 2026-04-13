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
