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
} from "../controller/userController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(register).get(isAuthenticated, isAdmin, getAllUsers);
router.post("/login", login);
router.get("/logout", logout);
router
  .route("/profile")
  .get(isAuthenticated, getCurrentUser)
  .put(isAuthenticated, updateProfile);

router
  .route("/:id")
  .delete(isAuthenticated, isAdmin, deleteUserById)
  .get(isAuthenticated, isAdmin, getUserById)
  .put(isAuthenticated, isAdmin, updateUserById);

export default router;
