import express, { Response, Request, NextFunction } from "express";
import { GITHUB_TOKEN } from "../secrets";
import HttpError from "./models/httpError";
import { repoLanguagesRouter, userDetailsRouter } from "./routes/routes";
import { NOT_FOUND } from "./utils/globals";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

server.use("/users", userDetailsRouter);
server.use("/repos", repoLanguagesRouter);

server.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(NOT_FOUND, "Could not find this route.");
  throw error;
});

server.use(
  (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  }
);

export default server;
