import { Movie } from "../models/Movie";

export class MovieService {
  private readonly movies: Movie[] = [
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
    { id: 2, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
    { id: 3, title: "Interstellar", director: "Christopher Nolan", year: 2014 }
  ];

  listMovies(): Movie[] {
    return [...this.movies];
  }
}
