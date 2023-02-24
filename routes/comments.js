import express from "express";
import { getComments, comment, getSocketComments, createSocketComment } from "../controllers/comments.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', auth, getComments);
router.post('/:id', auth, comment);
router.get(auth, getSocketComments);
router.post(auth, createSocketComment);

export default router;