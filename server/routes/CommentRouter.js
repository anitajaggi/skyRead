import express from "express";
import { addComment, getComments } from "../controller/commentController.js";

import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/:postId", isAuthenticated, addComment);
router.get("/:postId", getComments);

export default router;
