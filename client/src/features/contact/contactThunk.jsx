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
      if (error.response && error.response.data.errors) {
        return rejectWithValue({ fieldErrors: error.response.data.errors });
      }
      return rejectWithValue(
        error.response?.data?.message || "Error sending message"
      );
    }
  }
);

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/contacts?page=${page}&limit=${limit}`
      );
      return response.data;
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

export const deleteMultipleContacts = createAsyncThunk(
  "contact/deleteMultipleContacts",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/contacts/bulk-delete", {
        ids,
      });
      toast.success(res.data.message || "Messages deleted successfully! 🚀");
      return ids;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Bulk delete failed"
      );
    }
  }
);
