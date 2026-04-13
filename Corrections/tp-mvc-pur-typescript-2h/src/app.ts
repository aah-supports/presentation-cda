import express from "express";
import { apiRouter } from "./routes";
import { errorHandler } from "./shared/error-handler";

export const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);
