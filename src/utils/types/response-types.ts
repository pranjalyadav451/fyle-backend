export interface User {
  name: string;
  github_url: string;
  avatar_url: string;
  bio: string;
  twitter_username: string;
  location: string;
  website_url: string;
  email: string;
  public_repos: number;
  public_gists: number;
}

export type Repository = {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language: string;
};
