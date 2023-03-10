import { Request, Response, Router } from "express";
import axios from "axios";
import {
  API_URL,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  INTERNAL_SERVER_ERROR,
  OK,
} from "../utils/globals";
import { Repository } from "../utils/types/response-types";
import HttpError from "../models/httpError";
import { NextFunction } from "express";
import { axiosInstance } from "../utils/axios.setup";
export const getRepositoryList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  let { page, per_page } = req.query;

  page = (page ? page : DEFAULT_PAGE).toString();
  per_page = (per_page ? per_page : DEFAULT_PER_PAGE).toString();

  try {
    const { data } = await axiosInstance.get(
      `${API_URL}/users/${username}/repos?page=${page}&per_page=${per_page}`
    );
    return res.status(OK).json({
      result: data.map(
        (repo: any) =>
          ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            topics: repo.topics,
            language: repo.language,
          } as Repository)
      ),
    });
  } catch (err: any) {
    return next(new HttpError(INTERNAL_SERVER_ERROR, err.response.statusText));
  }
};
