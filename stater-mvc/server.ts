import express from "express";
import { router } from "./router";

const app = express();

app.use(express.json());
app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`Starter MVC running on http://localhost:${port}`);
});
