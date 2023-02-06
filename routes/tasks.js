import express from "express";

import { getTasks, getProjectTasks, getTask, createProjectTasks, updateTask, deleteTask, doneTask } from "../controllers/tasks.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', auth, getProjectTasks);
router.get('/task/:id', auth, getTask);
router.get('/alltasks/:id', auth, getTasks);
router.post('/', auth, createProjectTasks);
router.patch('/:id', auth, updateTask);
router.patch('/task/:id', auth, doneTask);
router.delete('/:id', auth, deleteTask);

export default router;