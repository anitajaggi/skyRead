import express from "express";
import {
  createContact,
  deleteContact,
  getContacts,
} from "../controller/contactController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", isAuthenticated, isAdmin, getContacts);
router.delete("/:contactId", isAuthenticated, isAdmin, deleteContact);

export default router;
