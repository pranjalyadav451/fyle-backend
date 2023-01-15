import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { API_URL, NOT_FOUND, OK } from "../utils/globals";
import { User } from "../utils/types/response-types";
import HttpError from "../models/httpError";

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const user = await axios.get(`${API_URL}/users/${username}`);
    const result = user.data;
    if (!result) {
      return next(new HttpError(NOT_FOUND, "User not found"));
    }
    res.status(OK).json({
      data: {
        name: result.name,
        github_url: result.html_url,
        avatar_url: result.avatar_url,
        bio: result.bio,
        twitter_username: result.twitter_username,
        location: result.location,
        website_url: result.blog,
        email: result.email,
        public_repos: result.public_repos,
        public_gists: result.public_gists,
      } as User,
    });
  } catch (err) {
    return next(new HttpError(NOT_FOUND, "User not found"));
  }
};
