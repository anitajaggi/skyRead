import { createSlice } from "@reduxjs/toolkit";
import {
  sendContactMessage,
  fetchContacts,
  deleteContactMessage,
  deleteMultipleContacts,
} from "./contactThunk";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    contacts: [],
    error: null,
    fieldErrors: {},
    currentPage: 1,
    totalPages: 1,
    totalContacts: 0,
  },
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle sending contact messages
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
        state.fieldErrors = {};
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })

      // Handle fetching contacts (with pagination support)
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts || [];
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.totalContacts = action.payload.totalContacts || 0;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleting a contact
      .addCase(deleteContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload
        );
      })
      .addCase(deleteContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleting multiple contacts
      .addCase(deleteMultipleContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => !action.payload.includes(contact._id)
        );
      })
      .addCase(deleteMultipleContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
export const { clearFieldError } = contactSlice.actions;
