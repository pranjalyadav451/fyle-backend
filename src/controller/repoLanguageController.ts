import { Request, Response, Router } from "express";
import axios from "axios";
import {
  API_URL,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
} from "../utils/globals";
import HttpError from "../models/httpError";
import { NextFunction } from "express-serve-static-core";

export const getRepositoryLanguages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, repo } = req.params;
  console.log(username, repo);

  if (!username || !repo) return new HttpError(BAD_REQUEST, "Invalid request");

  try {
    const { data } = await axios.get(
      `${API_URL}/repos/${username}/${repo}/languages`
    );
    const languages = Object.keys(data);

    return res.status(OK).json({ langs: languages });
  } catch (err: any) {
    return next(new HttpError(INTERNAL_SERVER_ERROR, err.response.statusText));
  }
};
