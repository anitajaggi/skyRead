import express from "express";
import {
  addComment,
  deleteComment,
  deleteMultipleComments,
  getAllComments,
  getComments,
} from "../controller/commentController.js";

import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleComments);

router.get("/", isAuthenticated, isAdmin, getAllComments);

router.post("/:postId", isAuthenticated, addComment);

router.get("/:postId", getComments);

router.delete("/:commentId", isAuthenticated, isAdmin, deleteComment);

export default router;
