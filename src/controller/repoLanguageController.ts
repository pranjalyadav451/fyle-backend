import { Request, Response, Router } from "express";
import {
  API_URL,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "../utils/globals";
import HttpError from "../models/httpError";
import { NextFunction } from "express-serve-static-core";
import { axiosInstance } from "../utils/axios.setup";

export const getRepositoryLanguages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, repo } = req.params;

  if (!username || !repo) return new HttpError(BAD_REQUEST, "Invalid request");

  try {
    const { data } = await axiosInstance.get(
      `${API_URL}/repos/${username}/${repo}/languages`
    );
    const languages = Object.keys(data);

    return res.status(OK).json({ langs: languages });
  } catch (err: any) {
    return next(new HttpError(NOT_FOUND, err.response.statusText));
  }
};
