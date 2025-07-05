import express from "express";
import {
  login,
  logout,
  register,
  getAllUsers,
  getCurrentUser,
  updateProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteMultipleUsers,
} from "../controller/userController.js";

import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import { validateUser } from "../validations/validateUser.js";

const router = express.Router();

router.post("/login", validateUser(false), login);
router.get("/logout", logout);
router.post("/", validateUser(true), register);

router
  .route("/profile")
  .get(isAuthenticated, getCurrentUser)
  .put(isAuthenticated, updateProfile);

router.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleUsers);

router.get("/", isAuthenticated, isAdmin, getAllUsers);

router
  .route("/:id")
  .get(isAuthenticated, isAdmin, getUserById)
  .put(isAuthenticated, isAdmin, updateUserById)
  .delete(isAuthenticated, isAdmin, deleteUserById);

export default router;
