import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/api";
import { toast } from "react-toastify";

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get("/categories");
      return res.data.categories;
    } catch (err) {
      return rejectWithValue(err.message || "Error fetching categories");
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await axiosApi.post("/categories", category);
      toast.success(res.data.message || "Category created successfully 😎");
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.errors) {
        return rejectWithValue({ fieldErrors: err.response.data.errors });
      }
      return rejectWithValue(err.message || "Error creating category");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete(`/categories/${categoryId}`);
      toast.success(res.data.message || "Category deleted successfully 😎");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error deleting category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, category }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.put(`/categories/${categoryId}`, category);
      toast.success(res.data.message || "Category updated successfully 😎");
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.errors) {
        return rejectWithValue({ fieldErrors: err.response.data.errors });
      }
      return rejectWithValue(err.message || "Error updating category");
    }
  }
);
