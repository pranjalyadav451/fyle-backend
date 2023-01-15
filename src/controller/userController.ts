import { Request, Response, NextFunction } from "express";
import { API_URL, BAD_REQUEST, NOT_FOUND, OK } from "../utils/globals";
import { User } from "../utils/types/response-types";
import HttpError from "../models/httpError";
import { axiosInstance } from "../utils/axios.setup";

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  if (!username) {
    return next(new HttpError(BAD_REQUEST, "Username not found"));
  }
  try {
    const user = await axiosInstance.get(`${API_URL}/users/${username}`);
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
  } catch (err: any) {
    return next(new HttpError(NOT_FOUND, err.response.statusText));
  }
};
