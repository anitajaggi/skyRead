import express from "express";
import {
  createArticle,
  getArticles,
  deleteArticle,
  updateArticle,
  getArticleBySlug,
} from "../controller/articleController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { uploadImg } from "../middleware/upload.js";

const router = express.Router();

router.post("/", isAuthenticated, isAdmin, uploadImg, createArticle);
router.get("/", getArticles);
router.delete("/:id", isAuthenticated, isAdmin, deleteArticle);
router.put("/:id", isAuthenticated, isAdmin, uploadImg, updateArticle);
router.get("/:slug", getArticleBySlug);

export default router;
