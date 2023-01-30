import express from "express";

import { getProjects, getProject, getProjectsBySearch, createProjects, updateProject, deleteProject } from "../controllers/projects.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getProjects);
router.get('/search', getProjectsBySearch);
router.get('/:id', getProject);
router.post('/', auth, createProjects);
router.patch('/:id', auth, updateProject);
router.delete('/:id', deleteProject);

export default router;
