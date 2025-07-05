import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  deleteMultipleComments,
  getAllComments,
  getComments,
} from "./commentThunk";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    comments: [],
    error: null,
    fieldErrors: {},
    allComments: [],
    currentPage: 1,
    totalPages: 1,
    totalComments: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload.comments || [];
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.totalComments = action.payload.totalComments || 0;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = state.allComments.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMultipleComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleComments.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = state.allComments.filter(
          (comment) => !action.payload.includes(comment._id)
        );
      })
      .addCase(deleteMultipleComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
