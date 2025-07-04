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

router.post("/", validateCategory, createCategory);
router.get("/", getCategories);
router.put("/:categoryId", validateCategory, updateCategory);
router.delete("/bulkdelete", deleteMultipleCategories);
router.delete("/:categoryId", deleteCategory);
router.get("/allCategories", getAllCategories); // This route is used to fetch all categories for the admin dashboard

export default router;
