import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/api";
import { toast } from "react-toastify";

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosApi.get(`/categories?page=${page}&limit=${limit}`);
      return res.data;
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
      toast.error(err.response.data.message || "Error creating category");
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

export const deleteMultipleCategories = createAsyncThunk(
  "category/deleteMultipleCategories",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axiosApi.delete("/categories/bulkdelete", {
        data: { ids },
      });
      toast.success(res.data.message || "Categories deleted successfully 😎");
      return ids;
    } catch (err) {
      return rejectWithValue(
        error.response?.data?.message || "Bulk delete failed"
      );
    }
  }
);
