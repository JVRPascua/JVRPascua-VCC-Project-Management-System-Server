import express from "express";

import { getComments, comment } from "../controllers/comments.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', getComments);
router.post('/:id', comment);

export default router;