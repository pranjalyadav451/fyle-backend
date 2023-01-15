import axios from "axios";
import { GITHUB_TOKEN } from "../../secrets";
import { API_URL } from "./globals";
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});
