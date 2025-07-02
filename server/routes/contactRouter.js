import express from "express";
import {
  createContact,
  deleteContact,
  deleteMultipleContacts,
  getContacts,
} from "../controller/contactController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import { validateContact } from "../validations/validateContact.js";

const router = express.Router();

router.post("/", validateContact, createContact);
router.get("/", isAuthenticated, isAdmin, getContacts);
router.delete("/bulkdelete", isAuthenticated, isAdmin, deleteMultipleContacts);
router.delete("/:contactId", isAuthenticated, isAdmin, deleteContact);

export default router;
