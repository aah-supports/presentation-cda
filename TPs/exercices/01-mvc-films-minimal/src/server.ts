import express from "express";
import { MovieController } from "./controllers/movieController";
import { buildMovieRouter } from "./routers/movieRouter";
import { MovieService } from "./services/movieService";

const app = express();
const port = 3010;

const movieService = new MovieService();
const movieController = new MovieController(movieService);

app.use(express.json());
app.use(buildMovieRouter(movieController));

app.listen(port, () => {
  console.log(`Exo 1 running on http://localhost:${port}`);
});
