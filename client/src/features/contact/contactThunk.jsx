import axiosApi from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const sendContactMessage = createAsyncThunk(
  "contact/sendContactMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/contacts", formData);
      toast.success(response.data.message || "Message sent successfully! 🚀");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error sending message"
      );
    }
  }
);
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/contacts");
      return response.data.contacts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching contacts"
      );
    }
  }
);

export const deleteContactMessage = createAsyncThunk(
  "contact/deleteContactMessage",
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/contacts/${contactId}`);
      toast.success(
        response.data.message || "Message deleted successfully! 🚀"
      );
      return contactId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting message"
      );
    }
  }
);
