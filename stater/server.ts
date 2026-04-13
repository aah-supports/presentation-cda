import express from "express";
import { router } from "./router";

const app = express();

app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
