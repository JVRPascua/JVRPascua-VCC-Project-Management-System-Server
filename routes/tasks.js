import express from "express";

import { getProjectTasks, createProjectTasks } from "../controllers/tasks.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getProjectTasks);
router.post('/', createProjectTasks);

export default router;