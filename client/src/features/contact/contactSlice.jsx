import { createSlice } from "@reduxjs/toolkit";
import {
  sendContactMessage,
  fetchContacts,
  deleteContactMessage,
} from "./contactThunk";
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    contacts: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      });
  },
});

export default contactSlice.reducer;
