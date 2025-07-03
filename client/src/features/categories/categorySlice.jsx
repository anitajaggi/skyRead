import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  deleteMultipleCategories,
  getAllCategories,
  updateCategory,
} from "./categoryThunks";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    categories: [],
    error: null,
    fieldErrors: {},
    currentPage: 1,
    totalPages: 1,
    totalCategories: 0,
  },
  reducers: {
    clearFieldError: (state, action) => {
      delete state.fieldErrors?.[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        const { data, total, currentPage, totalPages } = action.payload;
        state.loading = false;
        state.categories = data;
        state.totalCategories = total;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })

      // DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload._id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.fieldErrors = {};
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fieldErrors = action.payload?.fieldErrors || {};
      })
      // bulk delete
      .addCase(deleteMultipleCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => !action.payload.includes(category._id)
        );
      })
      .addCase(deleteMultipleCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFieldError } = categorySlice.actions;
export default categorySlice.reducer;
