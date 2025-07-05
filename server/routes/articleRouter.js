import express from "express";
import {
  createArticle,
  getArticles,
  deleteArticle,
  updateArticle,
  getArticleBySlug,
  updateArticlePublishStatus,
  deleteMultipleArticles,
} from "../controller/articleController.js";

import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { uploadImg } from "../middleware/upload.js";
import { validateArticle } from "../validations/validateArticle.js";

const router = express.Router();

router.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleArticles);

router.post(
  "/",
  isAuthenticated,
  isAdmin,
  uploadImg,
  validateArticle,
  createArticle
);

router.get("/", getArticles);

router.put(
  "/:id/publish",
  isAuthenticated,
  isAdmin,
  updateArticlePublishStatus
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  uploadImg,
  validateArticle,
  updateArticle
);

router.delete("/:id", isAuthenticated, isAdmin, deleteArticle);

router.get("/:slug", getArticleBySlug);

export default router;
