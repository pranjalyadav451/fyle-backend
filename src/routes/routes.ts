import { Router } from "express";
import { getRepositoryList } from "../controller/repoListController";
import { getUserDetails } from "../controller/userController";

const router = Router();
router.get("/:username", getUserDetails);
router.get("/:username/repos", getRepositoryList);

export default router;
