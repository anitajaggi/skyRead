import express from "express";
import {
  createCategory,
  deleteCategory,
  deleteMultipleCategories,
  getCategories,
  updateCategory,
} from "../controller/categoryController.js";
import { validateCategory } from "../validations/validateCategory.js";

const router = express.Router();

router.post("/", validateCategory, createCategory);
router.get("/", getCategories);
router.put("/:categoryId", validateCategory, updateCategory);
router.delete("/bulkdelete", deleteMultipleCategories);
router.delete("/:categoryId", deleteCategory);

export default router;
