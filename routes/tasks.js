import express from "express";

import { getProjectTasks, createProjectTasks, updateTask, deleteTask } from "../controllers/tasks.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', getProjectTasks);
router.post('/', createProjectTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;