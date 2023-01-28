import express from "express";

import { getProjects, getProject, getProjectsBySearch, createProjects, updateProject, deleteProject } from "../controllers/projects.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.get('/search', auth, getProjectsBySearch);
router.post('/', auth, createProjects);
router.patch('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

export default router;
