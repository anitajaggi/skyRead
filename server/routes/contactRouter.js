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

router.post("/bulk-delete", isAuthenticated, isAdmin, deleteMultipleContacts);

router.get("/", isAuthenticated, isAdmin, getContacts);

router.delete("/:contactId", isAuthenticated, isAdmin, deleteContact);

router.post("/", validateContact, createContact);

export default router;
