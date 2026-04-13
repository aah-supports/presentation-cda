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
