import { Router } from "express";
import { getRepositoryLanguages } from "../controller/repoLanguageController";
import { getRepositoryList } from "../controller/repoListController";
import { getUserDetails } from "../controller/userController";

const userDetailsRouter = Router();
const repoLanguagesRouter = Router();
userDetailsRouter.get("/:username", getUserDetails);
userDetailsRouter.get("/:username/repos", getRepositoryList);
repoLanguagesRouter.get("/:username/:repo/languages", getRepositoryLanguages);

export { userDetailsRouter, repoLanguagesRouter };
