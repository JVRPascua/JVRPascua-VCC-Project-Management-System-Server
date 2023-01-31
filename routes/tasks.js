import express from "express";

import { getProjectTasks, getTask, createProjectTasks, updateTask, deleteTask } from "../controllers/tasks.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', getProjectTasks);
router.get('/task/:id', getTask);
router.post('/', createProjectTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;