import express, { Response, Request, NextFunction } from "express";
import HttpError from "./models/httpError";
import { repoLanguagesRouter, userDetailsRouter } from "./routes/routes";
import { NOT_FOUND } from "./utils/globals";

const app = express();
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/users", userDetailsRouter);
app.use("/repos", repoLanguagesRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(NOT_FOUND, "Could not find this route.");
  throw error;
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
