import express from "express";
import {
  createCategory,
  deleteCategory,
  deleteMultipleCategories,
  getAllCategories,
  getCategories,
  updateCategory,
} from "../controller/categoryController.js";

import { validateCategory } from "../validations/validateCategory.js";

const router = express.Router();

router.get("/allCategories", getAllCategories);

router.post("/bulk-delete", deleteMultipleCategories);

router.post("/", validateCategory, createCategory);

router.get("/", getCategories);

router.put("/:categoryId", validateCategory, updateCategory);

router.delete("/:categoryId", deleteCategory);

export default router;
